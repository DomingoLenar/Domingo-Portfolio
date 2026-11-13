// Fallback album art from Apple's iTunes Search API (free, no key, allows browser requests).
// Only accepts a result when BOTH artist and title match, so it never shows the wrong cover.

const cache = new Map(); // "artist|title" -> url or null (misses are cached too, so polling doesn't refetch)

// "Swabero, Pt. 2 - 6 Foot 7 Foot Remix (feat. X) [Remastered]" -> "swabero pt 2"
const baseTitle = (s) =>
    s
        .toLowerCase()
        .replace(/\(.*?\)|\[.*?\]/g, " ")
        .replace(/\s-\s.*$/, " ")
        .replace(/\bfeat\..*$/, " ")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

const words = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;

// Whole-word match either way, so "Daft Punk" matches "Daft Punk & Pharrell" but "Bigs" doesn't match "Biggsy"
const sameArtist = (a, b) => {
    const wa = words(a);
    const wb = words(b);
    return wa.trim() !== "" && (wa.includes(wb) || wb.includes(wa));
};

const isRemix = (s) => /\bremix\b/i.test(s);

export const findAlbumArt = async (artist, title, { signal } = {}) => {
    const key = `${artist}|${title}`.toLowerCase();
    if (cache.has(key)) return cache.get(key);

    let art = null;
    try {
        const term = encodeURIComponent(`${artist} ${baseTitle(title)}`);
        const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=10`, { signal });
        if (res.ok) {
            const { results = [] } = await res.json();
            const match = results.find(
                (r) =>
                    sameArtist(artist, r.artistName || "") &&
                    baseTitle(r.trackName || "") === baseTitle(title) &&
                    isRemix(r.trackName || "") === isRemix(title) // don't swap a remix's cover for the original's
            );
            // 100x100 -> 300x300 for sharp display on retina screens
            art = match?.artworkUrl100?.replace("100x100bb", "300x300bb") || null;
        }
    } catch (error) {
        if (error?.name === "AbortError") throw error; // don't cache a lookup that was cancelled
    }

    cache.set(key, art);
    return art;
};
