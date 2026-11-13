import { useEffect, useState } from "react";
import { Gamepad2, Headphones } from "lucide-react";
import { DISCORD_USER_ID, useLanyard } from "@/lib/lanyard";

// Live Discord status card: online/idle/dnd/offline, current game, custom status.
// Spotify listening is shown by the NowPlaying card instead.

const STATUS = {
    online: { label: "Online", color: "#23a55a" },
    idle: { label: "Idle", color: "#f0b232" },
    dnd: { label: "Do not disturb", color: "#f23f43" },
    offline: { label: "Offline", color: "#80848e" },
};

// Discord activity types (2 = Listening/Spotify and 4 = Custom status are handled separately)
const VERBS = { 0: "Playing", 1: "Streaming", 3: "Watching", 5: "Competing in" };

const avatarUrl = (user) =>
    user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=80`
        : `https://cdn.discordapp.com/embed/avatars/${Number((BigInt(user.id) >> 22n) % 6n)}.png`;

const activityImage = (activity) => {
    const image = activity.assets?.large_image;
    if (!image) return null;
    if (image.startsWith("mp:")) return `https://media.discordapp.net/${image.slice(3)}`;
    if (activity.application_id) return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
    return null;
};

const elapsed = (start, now) => {
    const minutes = Math.max(0, Math.floor((now - start) / 60000));
    if (minutes < 1) return "just started";
    if (minutes < 60) return `for ${minutes}m`;
    return `for ${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const CustomEmoji = ({ emoji }) => {
    if (!emoji) return null;
    if (emoji.id) {
        return (
            <img
                src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}?size=32`}
                alt={emoji.name || ""}
                className="h-4 w-4 inline-block"
            />
        );
    }
    return <span>{emoji.name}</span>;
};

export const DiscordStatus = () => {
    const presence = useLanyard();

    // Re-render once a minute so "for 1h 20m" stays current
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 60_000);
        return () => clearInterval(timer);
    }, []);

    if (!presence?.discord_user) return null;

    const user = presence.discord_user;
    const status = STATUS[presence.discord_status] ?? STATUS.offline;
    const isOffline = presence.discord_status === "offline";
    const activities = presence.activities || [];
    const activity = activities.find((a) => a.type in VERBS);
    const custom = activities.find((a) => a.type === 4);
    const displayName = user.global_name || user.display_name || user.username;
    const gameIcon = activity ? activityImage(activity) : null;

    // While listening (and not gaming), link visually to the music card instead of repeating the song
    const handleLine = presence.listening_to_spotify ? (
        <span className="flex items-center gap-1 text-[#1DB954]">
            <Headphones size={12} aria-hidden="true" />
            Listening to Spotify
        </span>
    ) : (
        `@${user.username}`
    );

    let main;
    let sub;
    if (activity) {
        main = (
            <>
                {gameIcon ? (
                    <img src={gameIcon} alt="" className="h-4 w-4 rounded-sm shrink-0" />
                ) : (
                    <Gamepad2 size={14} className="text-[#5865F2] shrink-0" />
                )}
                <span className="truncate">
                    {VERBS[activity.type]} {activity.name}
                </span>
            </>
        );
        sub = [activity.details, activity.timestamps?.start ? elapsed(activity.timestamps.start, now) : null]
            .filter(Boolean)
            .join(" · ");
    } else if (custom && (custom.state || custom.emoji)) {
        main = (
            <>
                <CustomEmoji emoji={custom.emoji} />
                <span className="truncate">{custom.state}</span>
            </>
        );
        sub = handleLine;
    } else {
        main = <span className="truncate">{displayName}</span>;
        sub = handleLine;
    }

    return (
        <a
            href={`https://discord.com/users/${DISCORD_USER_ID}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${status.label} on Discord${activity ? `, ${VERBS[activity.type]} ${activity.name}` : ""} (opens Discord profile)`}
            className={`group flex items-center gap-3 w-[280px] px-3 py-2 rounded-xl border border-border bg-card/60 hover:border-[#5865F2]/50 transition-colors text-left ${
                isOffline ? "opacity-60" : ""
            }`}
        >
            {/* Avatar + status dot */}
            <span className="relative h-10 w-10 shrink-0">
                <img src={avatarUrl(user)} alt="" width="40" height="40" className="h-10 w-10 rounded-full object-cover" />
                <span
                    className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-card"
                    style={{ background: status.color }}
                    aria-hidden="true"
                />
            </span>

            <span className="min-w-0 flex flex-col">
                <span className="text-[11px] text-muted-foreground">{status.label} on Discord</span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground min-w-0 group-hover:text-[#5865F2] transition-colors">
                    {main}
                </span>
                {sub && <span className="text-xs text-muted-foreground truncate">{sub}</span>}
            </span>
        </a>
    );
};
