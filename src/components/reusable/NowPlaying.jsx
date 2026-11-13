import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import { findAlbumArt } from "@/lib/albumArt";
import { useLanyard } from "@/lib/lanyard";

// "Now playing on Spotify", read from Last.fm (Spotify scrobbles to Last.fm).
// Configure with VITE_LASTFM_USER and VITE_LASTFM_API_KEY (.env.local locally, repo variables in CI).
// The Last.fm key is read-only and only exposes public listening history, so it's safe in the bundle.
// Renders nothing until configured, or if Last.fm can't be reached.

const USER = import.meta.env.VITE_LASTFM_USER;
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const POLL_MS = 30_000;

// Last.fm's grey "no artwork" star image
const PLACEHOLDER_ART = "2a96cbd8b46e442fc41c2b86b821562f";

const timeAgo = (unixSeconds) => {
    const minutes = Math.floor((Date.now() / 1000 - unixSeconds) / 60);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};

const parseTrack = (data) => {
    const raw = data?.recenttracks?.track;
    const track = Array.isArray(raw) ? raw[0] : raw;
    if (!track) return null;

    const art = (track.image || []).find((img) => img.size === "large")?.["#text"] || "";
    const artist = track.artist?.["#text"] || "";
    return {
        name: track.name,
        artist,
        art: art && !art.includes(PLACEHOLDER_ART) ? art : null,
        nowPlaying: track["@attr"]?.nowplaying === "true",
        playedAt: track.date?.uts ? Number(track.date.uts) : null,
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${track.name} ${artist}`)}`,
    };
};

const EqualizerBars = () => (
    <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
        {[0, 0.2, 0.4].map((delay) => (
            <span
                key={delay}
                className="w-[3px] h-full bg-[#1DB954] rounded-sm origin-bottom animate-eq"
                style={{ animationDelay: `${delay}s` }}
            />
        ))}
    </span>
);

export const NowPlaying = () => {
    const [lastfmTrack, setTrack] = useState(null);
    const presence = useLanyard();

    useEffect(() => {
        if (!USER || !API_KEY) return;

        let controller;
        let timer;

        const load = async () => {
            controller?.abort();
            controller = new AbortController();
            try {
                const url =
                    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
                    `&user=${encodeURIComponent(USER)}&api_key=${encodeURIComponent(API_KEY)}&format=json&limit=1`;
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) return;
                const parsed = parseTrack(await res.json());
                // Last.fm often has no cover for newer releases: try iTunes (strict artist + title match, cached)
                if (parsed && !parsed.art) {
                    parsed.art = await findAlbumArt(parsed.artist, parsed.name, { signal: controller.signal });
                }
                setTrack(parsed);
            } catch {
                // Network error or aborted: keep showing the last known track
            }
        };

        // Poll only while the tab is visible
        const start = () => {
            clearInterval(timer);
            load();
            timer = setInterval(load, POLL_MS);
        };
        const onVisibility = () => {
            if (document.hidden) clearInterval(timer);
            else start();
        };

        start();
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            clearInterval(timer);
            controller?.abort();
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    // Prefer live Spotify data from Discord (exact track + Spotify's own album art) while Discord is open;
    // otherwise fall back to Last.fm (+ iTunes art)
    const spotify = presence?.listening_to_spotify ? presence.spotify : null;
    const track = spotify
        ? {
              name: spotify.song,
              artist: (spotify.artist || "").replace(/; /g, ", "),
              art: spotify.album_art_url || null,
              nowPlaying: true,
              playedAt: null,
              spotifyUrl: spotify.track_id
                  ? `https://open.spotify.com/track/${spotify.track_id}`
                  : `https://open.spotify.com/search/${encodeURIComponent(`${spotify.song} ${spotify.artist}`)}`,
          }
        : lastfmTrack;

    if (!track) return null;

    const status = track.nowPlaying ? "Now playing on Spotify" : `Last played${track.playedAt ? ` · ${timeAgo(track.playedAt)}` : ""}`;

    return (
        <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${status}: ${track.name} by ${track.artist} (opens Spotify)`}
            className="group flex items-center gap-3 w-[280px] px-3 py-2 rounded-xl border border-border bg-card/60 hover:border-[#1DB954]/50 transition-colors text-left"
        >
            {track.art ? (
                <img src={track.art} alt="" width="40" height="40" className="h-10 w-10 rounded-md object-cover shrink-0" />
            ) : (
                // No cover anywhere: brand-gradient tile so it still looks intentional
                <span className="h-10 w-10 rounded-md bg-gradient-to-br from-[#0000ff] via-[#8a2be2] to-[#ff0033] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(138,43,226,0.35)]">
                    <Music size={18} className="text-white" />
                </span>
            )}

            <span className="min-w-0 flex flex-col">
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    {track.nowPlaying && <EqualizerBars />}
                    {status}
                </span>
                <span className="text-sm font-medium text-foreground truncate group-hover:text-[#1DB954] transition-colors">
                    {track.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">{track.artist}</span>
            </span>
        </a>
    );
};
