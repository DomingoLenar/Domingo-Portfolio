import { useEffect, useRef, useState } from "react";
import { METEOR_SHOWER_EVENT } from "@/lib/events";

// Constellation effect: stars near the cursor link up with faint lines
const LINK_RADIUS = 160;   // px: stars this close to the cursor join in
const LINK_DISTANCE = 110; // px: longest line drawn between two stars
const LINE_RGB = "200, 170, 255";

// id, size, x, y, opacity, animationDuration

const createStars = () => {
    const numberOfStars = Math.floor(
        (window.innerWidth * window.innerHeight) / 10000
    );

    return Array.from({ length: numberOfStars }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
    }));
};

// One meteor at a time, at a random spot, every few seconds
let nextMeteorId = 0;
const createMeteor = (overrides = {}) => ({
    id: nextMeteorId++,
    x: Math.random() * 70 + 30,          // % from left (biased right, since they travel down-left)
    y: Math.random() * 40,               // % from top
    length: Math.random() * 80 + 80,     // px of tail
    distance: Math.random() * 300 + 400, // px travelled
    duration: Math.random() * 0.7 + 0.8, // seconds
    ...overrides,
});

// Easter egg: the Konami code triggers a meteor shower
const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
const SHOWER_COUNT = 40;
const SHOWER_MS = 3000;

export const StarBackground = () => {
    const [stars, setStars] = useState(createStars);
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
        const handleResize = () => setStars(createStars());

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let timeout;
        const schedule = (delay) => {
            timeout = setTimeout(() => {
                // Skip while the tab is hidden so meteors don't pile up and fire all at once on return
                if (!document.hidden) setMeteors((prev) => [...prev, createMeteor()]);
                schedule(Math.random() * 3000 + 2000);
            }, delay);
        };
        schedule(1500);

        return () => clearTimeout(timeout);
    }, []);

    const removeMeteor = (id) => setMeteors((prev) => prev.filter((m) => m.id !== id));

    // Konami code -> meteor shower
    const [showerToast, setShowerToast] = useState(false);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        console.log(
            "%c☄️ psst… try the Konami code on this page: ↑ ↑ ↓ ↓ ← → ← → B A",
            "color:#a83df5;font-size:13px;font-weight:bold;"
        );

        let progress = 0;
        const timers = [];

        const startShower = () => {
            setShowerToast(true);
            timers.push(setTimeout(() => setShowerToast(false), 2800));

            for (let i = 0; i < SHOWER_COUNT; i++) {
                const delay = (i / SHOWER_COUNT) * SHOWER_MS + Math.random() * 150;
                timers.push(
                    setTimeout(() => {
                        setMeteors((prev) => [
                            ...prev,
                            createMeteor({
                                x: Math.random() * 90 + 10,
                                y: Math.random() * 55 - 5,
                                duration: Math.random() * 0.5 + 0.6,
                            }),
                        ]);
                    }, delay)
                );
            }
        };

        const onKeyDown = (e) => {
            // Don't listen while someone is typing in the contact form
            const t = e.target;
            if (t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;

            const key = e.key?.toLowerCase();
            if (key === KONAMI[progress]) {
                progress++;
                if (progress === KONAMI.length) {
                    progress = 0;
                    startShower();
                }
            } else if (key === "arrowup") {
                // Extra ↑ presses still count as the start: "↑ ↑ ↑ ↓ ↓ ..." works
                progress = progress === 2 ? 2 : 1;
            } else {
                progress = 0;
            }
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener(METEOR_SHOWER_EVENT, startShower); // from the command palette
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener(METEOR_SHOWER_EVENT, startShower);
            timers.forEach(clearTimeout);
        };
    }, []);

    // Keep the latest stars available to the canvas without re-binding listeners
    const canvasRef = useRef(null);
    const starsRef = useRef(stars);
    useEffect(() => {
        starsRef.current = stars;
    }, [stars]);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return; // mouse only
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let mouse = null;
        let raf = 0;

        const draw = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);
            if (!mouse) return;

            // Stars near the cursor, with a 0..1 strength that fades with distance
            const near = [];
            for (const s of starsRef.current) {
                const x = (s.x / 100) * w + s.size / 2;
                const y = (s.y / 100) * h + s.size / 2;
                const d = Math.hypot(x - mouse.x, y - mouse.y);
                if (d < LINK_RADIUS) near.push({ x, y, strength: 1 - d / LINK_RADIUS });
            }

            // Lines between nearby stars
            ctx.lineWidth = 0.8;
            for (let i = 0; i < near.length; i++) {
                for (let j = i + 1; j < near.length; j++) {
                    const a = near[i];
                    const b = near[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d > LINK_DISTANCE) continue;
                    const alpha = (1 - d / LINK_DISTANCE) * Math.min(a.strength, b.strength) * 0.7;
                    ctx.strokeStyle = `rgba(${LINE_RGB}, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }

            // Soft glow on the linked stars
            for (const s of near) {
                const r = 4 + s.strength * 6;
                const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
                glow.addColorStop(0, `rgba(${LINE_RGB}, ${s.strength * 0.5})`);
                glow.addColorStop(1, `rgba(${LINE_RGB}, 0)`);
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const schedule = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(draw);
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            schedule();
        };

        const onMove = (e) => {
            mouse = { x: e.clientX, y: e.clientY };
            schedule();
        };
        const onLeave = () => {
            mouse = null;
            schedule();
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);
        document.documentElement.addEventListener("mouseleave", onLeave);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            document.documentElement.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
    <>
    {/* Meteor shower toast (outside the z-0 layer so it shows above content) */}
    <div
        role="status"
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-[#8a2be2]/50 shadow-[0_0_20px_rgba(138,43,226,0.4)] text-sm font-medium transition-all duration-500 ${
            showerToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
    >
        {showerToast && "☄️ Meteor shower!"}
    </div>

    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Constellation lines (drawn behind the stars) */}
        <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
        {stars.map((star) => (
            <div key={star.id} className="star animate-pulse-subtle" style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animationDuration: star.animationDuration + "s",
        }}/>
        ))}

        {meteors.map((meteor) => (
            <div key={meteor.id} className="meteor animate-meteor" onAnimationEnd={() => removeMeteor(meteor.id)} style={{
                width: meteor.length + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDuration: meteor.duration + "s",
                "--meteor-distance": meteor.distance + "px",
        }}/>
        ))}
    </div>
    </>
    );
};