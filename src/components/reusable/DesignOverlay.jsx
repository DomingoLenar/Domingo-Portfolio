import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// "Design mode": reveals the page's design layer, Figma-style. Desktop only.

const FIGMA_BLUE = "#0d99ff";
const NAV_HEIGHT = 80;

const SECTION_NAMES = {
    hero: "Hero",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    certifications: "Certifications",
    skills: "Skills",
    github: "GitHub Activity",
    contact: "Contact",
};

const LAYER_TYPES = {
    H1: "Heading", H2: "Heading", H3: "Heading", H4: "Heading",
    P: "Text", SPAN: "Text", LABEL: "Label",
    A: "Link", BUTTON: "Button",
    IMG: "Image", svg: "Icon",
    INPUT: "Input", TEXTAREA: "Input", FORM: "Form",
    SECTION: "Frame", FOOTER: "Frame", NAV: "Nav",
};
const TEXT_LAYERS = new Set(["Heading", "Text", "Label", "Link", "Button"]);

// Calls the latest `callback` once per animation frame on scroll/resize (and once on mount)
const useOnScrollFrame = (callback) => {
    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        let raf = 0;
        const run = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => callbackRef.current());
        };
        run();
        window.addEventListener("scroll", run, { passive: true });
        window.addEventListener("resize", run);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", run);
            window.removeEventListener("resize", run);
        };
    }, []);
};

/* ---------- 1. Layout grid ---------- */

const LayoutGrid = () => (
    // Same container classes as the Hero/Projects content, so columns line up with real content
    <div className="absolute inset-0 px-4">
        <div className="container mx-auto max-w-6xl h-full grid grid-cols-12 gap-6">
            {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="h-full bg-[#ff0033]/[0.06] border-x border-[#ff0033]/20" />
            ))}
        </div>
    </div>
);

/* ---------- 2. Section frames ---------- */

const SectionFrames = () => {
    const [frames, setFrames] = useState([]);

    useOnScrollFrame(() => {
        const els = document.querySelectorAll("main > section, footer");
        setFrames(
            Array.from(els, (el) => {
                const r = el.getBoundingClientRect();
                const name = el.tagName === "FOOTER" ? "Footer" : SECTION_NAMES[el.id] || "Section";
                return { name, top: r.top, left: r.left, width: r.width, height: r.height };
            }).filter((f) => f.top < window.innerHeight && f.top + f.height > 0)
        );
    });

    return frames.map((f) => {
        // Keep the label visible below the navbar while scrolling through the section
        const labelTop = Math.min(Math.max(f.top + 8, NAV_HEIGHT), f.top + f.height - 28);
        return (
            <div key={f.name}>
                <div
                    className="absolute border border-dashed"
                    style={{ top: f.top, left: f.left, width: f.width, height: f.height, borderColor: `${FIGMA_BLUE}80` }}
                />
                <div
                    className="absolute flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[11px] font-medium text-white shadow"
                    style={{ top: labelTop, left: f.left + 8, background: FIGMA_BLUE }}
                >
                    <span className="opacity-80">#</span>
                    {f.name}
                    <span className="opacity-70 font-normal">
                        {Math.round(f.width)} × {Math.round(f.height)}
                    </span>
                </div>
            </div>
        );
    });
};

/* ---------- 3. Hover inspect ---------- */

const measureElement = (el) => {
    if (!el || !el.isConnected) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const type = LAYER_TYPES[el.tagName] || "Group";
    return {
        type,
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
        padding: {
            top: parseFloat(cs.paddingTop) || 0,
            right: parseFloat(cs.paddingRight) || 0,
            bottom: parseFloat(cs.paddingBottom) || 0,
            left: parseFloat(cs.paddingLeft) || 0,
        },
        font: TEXT_LAYERS.has(type) ? `${parseFloat(cs.fontSize)}px / ${cs.fontWeight}` : null,
    };
};

const HoverInspector = ({ ignoreRef }) => {
    const targetRef = useRef(null);
    const [box, setBox] = useState(null);

    // Re-measure the hovered element when the page scrolls under the cursor
    useOnScrollFrame(() => setBox(measureElement(targetRef.current)));

    useEffect(() => {
        const clear = () => {
            targetRef.current = null;
            setBox(null);
        };

        const onMove = (e) => {
            let el = e.target;
            if (!(el instanceof Element) || ignoreRef.current?.contains(el)) return clear();

            el = el.closest("svg") || el; // treat icons as one layer, not their inner paths
            const isPageRoot = el === document.body || el === document.documentElement || el.id === "root" || el.parentElement?.id === "root";
            if (isPageRoot) return clear();

            if (el !== targetRef.current) {
                targetRef.current = el;
                setBox(measureElement(el));
            }
        };

        window.addEventListener("mousemove", onMove);
        document.documentElement.addEventListener("mouseleave", clear);
        return () => {
            window.removeEventListener("mousemove", onMove);
            document.documentElement.removeEventListener("mouseleave", clear);
        };
    }, [ignoreRef]);

    if (!box) return null;

    const { padding: p } = box;
    const labelBelow = box.top + box.height + 34 < window.innerHeight;

    return (
        <>
            {/* Padding (shaded) */}
            <div className="absolute" style={{ top: box.top, left: box.left, width: box.width, height: box.height }}>
                <div className="absolute inset-x-0 top-0 bg-[#3ECF8E]/25" style={{ height: p.top }} />
                <div className="absolute inset-x-0 bottom-0 bg-[#3ECF8E]/25" style={{ height: p.bottom }} />
                <div className="absolute left-0 bg-[#3ECF8E]/25" style={{ top: p.top, bottom: p.bottom, width: p.left }} />
                <div className="absolute right-0 bg-[#3ECF8E]/25" style={{ top: p.top, bottom: p.bottom, width: p.right }} />
            </div>

            {/* Selection box */}
            <div
                className="absolute border"
                style={{ top: box.top, left: box.left, width: box.width, height: box.height, borderColor: FIGMA_BLUE }}
            />

            {/* Label */}
            <div
                className="absolute flex items-center gap-2 px-2 py-1 rounded text-[11px] text-white whitespace-nowrap shadow-lg"
                style={{
                    top: labelBelow ? box.top + box.height + 6 : Math.max(box.top - 28, NAV_HEIGHT),
                    left: Math.max(box.left, 8),
                    background: FIGMA_BLUE,
                }}
            >
                <span className="font-semibold">{box.type}</span>
                <span className="opacity-80">
                    {Math.round(box.width)} × {Math.round(box.height)}
                </span>
                {box.font && <span className="opacity-80">· {box.font}</span>}
            </div>
        </>
    );
};

/* ---------- 4. Tokens panel ---------- */

const COLOR_TOKENS = [
    ["Background", "--background"],
    ["Card", "--card"],
    ["Secondary", "--secondary"],
    ["Foreground", "--foreground"],
    ["Muted text", "--muted-foreground"],
    ["Primary", "--primary"],
    ["Border", "--border"],
];
const BRAND_GRADIENT = ["#0000ff", "#8a2be2", "#ff0033"];
const TYPE_SAMPLES = [
    ["Display", "#hero h1"],
    ["H2", "#about h2"],
    ["H3", "#about h3"],
    ["Body", "#about p"],
];

// "275 90% 60%" -> "#A83DF5"
const hslToHex = (value) => {
    const [h, s, l] = value.trim().split(/\s+/).map(parseFloat);
    const sat = s / 100;
    const light = l / 100;
    const a = sat * Math.min(light, 1 - light);
    const channel = (n) => {
        const k = (n + h / 30) % 12;
        const c = light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(c * 255).toString(16).padStart(2, "0");
    };
    return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};

// Read tokens from the live page so the panel never drifts from the real CSS
const readTokens = () => {
    const root = getComputedStyle(document.documentElement);
    const colors = COLOR_TOKENS.map(([name, variable]) => ({
        name,
        hex: hslToHex(root.getPropertyValue(variable)),
    }));

    const type = TYPE_SAMPLES.flatMap(([name, selector]) => {
        const el = document.querySelector(selector);
        if (!el) return [];
        const cs = getComputedStyle(el);
        return [{ name, spec: `${parseFloat(cs.fontSize)}px / ${cs.fontWeight}` }];
    });

    const family = getComputedStyle(document.body).fontFamily.split(",")[0].replace(/["']/g, "").trim();
    const fontName = ["ui-sans-serif", "system-ui", "-apple-system"].includes(family) ? "System UI" : family;

    return { colors, type, fontName };
};

const PanelHeading = ({ children }) => (
    <h4 className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-2">{children}</h4>
);

const TokensPanel = ({ panelRef }) => {
    const [tokens] = useState(readTokens);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            ref={panelRef}
            className="pointer-events-auto absolute top-24 right-4 w-60 rounded-lg bg-[#2c2c2c]/95 backdrop-blur-md border border-white/10 shadow-2xl text-[11px] text-white/80 text-left"
        >
            <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                aria-expanded={!collapsed}
                className="w-full flex items-center justify-between px-3 py-2 font-semibold text-white cursor-pointer"
            >
                Design tokens
                {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            {!collapsed && (
                <div className="px-3 pb-3 space-y-4 border-t border-white/10 pt-3">
                    <div>
                        <PanelHeading>Colors</PanelHeading>
                        <ul className="space-y-1.5">
                            {tokens.colors.map((c) => (
                                <li key={c.name} className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-sm border border-white/20" style={{ background: c.hex }} />
                                    <span className="flex-1">{c.name}</span>
                                    <span className="font-mono text-white/50">{c.hex}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <PanelHeading>Brand gradient</PanelHeading>
                        <div
                            className="h-4 rounded-sm border border-white/20"
                            style={{ background: `linear-gradient(to right, ${BRAND_GRADIENT.join(", ")})` }}
                        />
                        <div className="flex justify-between mt-1 font-mono text-white/50">
                            {BRAND_GRADIENT.map((hex) => (
                                <span key={hex}>{hex.toUpperCase()}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <PanelHeading>Typography · {tokens.fontName}</PanelHeading>
                        <ul className="space-y-1.5">
                            {tokens.type.map((t) => (
                                <li key={t.name} className="flex justify-between">
                                    <span>{t.name}</span>
                                    <span className="font-mono text-white/50">{t.spec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ---------- Overlay ---------- */

export const DesignOverlay = ({ enabled }) => {
    const panelRef = useRef(null);

    if (!enabled) return null;

    return (
        <div className="hidden md:block fixed inset-0 z-50 pointer-events-none">
            {/* Purely visual layers */}
            <div aria-hidden="true">
                <LayoutGrid />
                <SectionFrames />
                <HoverInspector ignoreRef={panelRef} />
            </div>

            <TokensPanel panelRef={panelRef} />

            {/* Status badge */}
            <div aria-hidden="true" className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2c2c2c]/95 border border-white/10 text-[11px] text-white/80 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#ff0033]" />
                <span className="font-semibold text-white">Design mode</span>
                <span>12-col grid · 24px gutter · hover anything to inspect</span>
                <span className="text-white/40">· Esc to exit</span>
            </div>
        </div>
    );
};
