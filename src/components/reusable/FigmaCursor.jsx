import { useEffect, useRef, useState } from "react";

// A Figma-style multiplayer cursor that "walks" visitors through the page a few times, once per visit.
// Desktop with a mouse only; skipped entirely for prefers-reduced-motion.

const NAME = "Lenar";
const COLOR = "#8a2be2";
const SEEN_KEY = "lenar-cursor-seen";
const MOVE_MS = 1100;
const NOTE_MS = 3200;
const INTRO_DELAY_MS = 2500;

// Edit these to change where the cursor goes and what it says.
// `trigger: null` plays shortly after load; otherwise it plays when that section scrolls into view.
const BEATS = [
    {
        trigger: null,
        steps: [
            { target: "#hero h1 .text-gradient-xaise", note: "👋 Hi! Welcome to my canvas." },
            { target: "[data-design-toggle]", note: "Psst, try Design mode to see how this page is built." },
        ],
    },
    {
        trigger: "#projects",
        steps: [{ target: "#projects h3", note: "Here's some of what I've built." }],
    },
    {
        trigger: "#contact",
        steps: [{ target: "#contact button[type='submit']", note: "Say hi! I'd love to hear from you." }],
    },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

const canPlay = () => {
    if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (new URLSearchParams(window.location.search).has("cursor")) return true; // ?cursor replays it (for testing)
    try {
        return !sessionStorage.getItem(SEEN_KEY);
    } catch {
        return true;
    }
};

export const FigmaCursor = ({ hidden }) => {
    const layerRef = useRef(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, instant: true, note: null, flip: false });

    useEffect(() => {
        if (!canPlay()) return;

        let cancelled = false;
        let playing = false;
        const played = new Set();

        // Point on the target, in the layer's (document) coordinates
        const pointFor = (el) => {
            const layer = layerRef.current.getBoundingClientRect();
            const r = el.getBoundingClientRect();
            const x = r.left - layer.left + Math.min(r.width * 0.7, r.width - 6);
            const y = r.top - layer.top + r.height * 0.7;
            return { x, y, flip: x > layer.width - 300 }; // put the bubble on the left near the right edge
        };

        const play = async (index) => {
            if (cancelled || playing || played.has(index) || !layerRef.current) return;
            playing = true;
            played.add(index);

            // Mark as seen only once it actually plays (an effect that mounts and unmounts shouldn't count)
            try {
                sessionStorage.setItem(SEEN_KEY, "1");
            } catch {
                // Storage blocked (private mode etc.): it just plays again next visit
            }

            for (const step of BEATS[index].steps) {
                const el = document.querySelector(step.target);
                if (!el || el.getClientRects().length === 0) continue; // target missing or hidden
                const { x, y, flip } = pointFor(el);
                const layerWidth = layerRef.current.clientWidth;

                // If hidden, start just inside the right edge so it glides in; if visible, close the bubble first
                setCursor((c) =>
                    c.visible
                        ? { ...c, note: null }
                        : { x: layerWidth - 60, y: y - 40, visible: false, instant: true, note: null, flip }
                );
                await nextFrame();
                if (cancelled) return;

                setCursor({ x, y, visible: true, instant: false, note: null, flip });
                await sleep(MOVE_MS);
                if (cancelled) return;

                setCursor((c) => ({ ...c, note: step.note }));
                await sleep(NOTE_MS);
                if (cancelled) return;
            }

            // Drift off and fade out
            setCursor((c) => ({
                ...c,
                x: Math.min(c.x + 80, (layerRef.current?.clientWidth ?? c.x) - 30),
                y: c.y + 40,
                visible: false,
                instant: false,
                note: null,
            }));
            await sleep(MOVE_MS);
            playing = false;
        };

        const introTimer = setTimeout(() => play(0), INTRO_DELAY_MS);

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const index = BEATS.findIndex((b) => b.trigger && entry.target.matches(b.trigger));
                    if (index !== -1) play(index);
                }
            },
            // Fires when the section crosses the middle band of the screen (works for sections taller than the viewport)
            { rootMargin: "-40% 0px -40% 0px" }
        );
        BEATS.forEach((b) => {
            const el = b.trigger && document.querySelector(b.trigger);
            if (el) observer.observe(el);
        });

        return () => {
            cancelled = true;
            clearTimeout(introTimer);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={layerRef}
            className="hidden md:block absolute inset-0 z-[45] pointer-events-none"
            style={{ visibility: hidden ? "hidden" : "visible" }}
            aria-hidden="true"
        >
            <div
                className="absolute top-0 left-0"
                style={{
                    transform: `translate(${cursor.x}px, ${cursor.y}px)`,
                    opacity: cursor.visible ? 1 : 0,
                    transition: cursor.instant
                        ? "none"
                        : `transform ${MOVE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease`,
                }}
            >
                {/* Arrow (tip at the top-left, on the target point) */}
                <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow-md">
                    <path d="M1 1L17 8.5L9.5 10.5L6 18.5L1 1Z" fill={COLOR} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>

                {/* Name tag / cursor chat bubble */}
                <div
                    className={`absolute top-5 ${cursor.flip ? "right-3 rounded-tr-sm" : "left-3 rounded-tl-sm"} w-max max-w-[240px] rounded-2xl px-3 py-1.5 text-white text-left shadow-lg`}
                    style={{ background: COLOR }}
                >
                    {cursor.note ? (
                        <>
                            <span className="block text-[10px] font-semibold opacity-75">{NAME}</span>
                            <span className="block text-sm leading-snug">{cursor.note}</span>
                        </>
                    ) : (
                        <span className="text-xs font-semibold">{NAME}</span>
                    )}
                </div>
            </div>
        </div>
    );
};
