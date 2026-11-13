import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
    Search, Home, User, Briefcase, FolderGit2, Award, Sparkles, Activity, Mail,
    Copy, Check, Download, Github, Linkedin, PenTool, CornerDownLeft,
} from "lucide-react";
import { OPEN_PALETTE_EVENT, triggerMeteorShower } from "@/lib/events";

const EMAIL = "lenardomingo14@gmail.com";
const RESUME_URL = `${import.meta.env.BASE_URL}Domingo_Lenar_Resume.pdf`;

const SECTIONS = [
    ["Home", "hero", Home],
    ["About", "about", User],
    ["Experience", "experience", Briefcase],
    ["Projects", "projects", FolderGit2],
    ["Certifications", "certifications", Award],
    ["Skills", "skills", Sparkles],
    ["GitHub Activity", "github", Activity],
    ["Contact", "contact", Mail],
];

const GROUP_ORDER = ["Navigate", "Actions", "Links", "Secret"];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const openMail = () => {
    window.location.href = `mailto:${EMAIL}`;
};

const buildCommands = ({ designMode, onToggleDesignMode }) => [
    ...SECTIONS.map(([label, id, icon]) => ({
        id: `go-${id}`,
        group: "Navigate",
        label: `Go to ${label}`,
        keywords: `section scroll ${id}`,
        icon,
        run: () => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" }),
    })),
    {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: EMAIL,
        keywords: "email contact clipboard",
        icon: Copy,
        copy: EMAIL,
    },
    {
        id: "resume",
        group: "Actions",
        label: "Download resume",
        keywords: "cv pdf resume",
        icon: Download,
        run: () => {
            const a = document.createElement("a");
            a.href = RESUME_URL;
            a.download = "";
            a.click();
        },
    },
    {
        id: "design-mode",
        group: "Actions",
        label: designMode ? "Turn off Design mode" : "Turn on Design mode",
        keywords: "design mode grid inspect figma tokens",
        icon: PenTool,
        desktopOnly: true,
        run: onToggleDesignMode,
    },
    {
        id: "github",
        group: "Links",
        label: "Open GitHub",
        keywords: "code repos",
        icon: Github,
        run: () => window.open("https://github.com/DomingoLenar", "_blank", "noopener"),
    },
    {
        id: "linkedin",
        group: "Links",
        label: "Open LinkedIn",
        keywords: "profile work",
        icon: Linkedin,
        run: () => window.open("https://linkedin.com/in/domingolenar", "_blank", "noopener"),
    },
    {
        id: "send-email",
        group: "Links",
        label: "Send an email",
        keywords: "mail contact",
        icon: Mail,
        run: openMail,
    },
    {
        // Only shows up when someone searches for it
        id: "meteor-shower",
        group: "Secret",
        label: "☄️ Meteor shower",
        keywords: "meteor shower konami easter egg stars",
        icon: Sparkles,
        secret: true,
        run: triggerMeteorShower,
    },
];

const filterCommands = (commands, query) => {
    const q = query.trim().toLowerCase();
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    return commands
        .filter((c) => (c.desktopOnly ? isDesktop : true))
        .filter((c) => (c.secret ? !reducedMotion() : true))
        .filter((c) => {
            if (!q) return !c.secret;
            const haystack = `${c.label} ${c.keywords}`.toLowerCase();
            const matches = q.split(/\s+/).every((word) => haystack.includes(word));
            return c.secret ? matches && q.length >= 3 : matches;
        })
        .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group));
};

export const CommandPalette = ({ designMode, onToggleDesignMode }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [copied, setCopied] = useState(false);

    const openRef = useRef(false);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const restoreFocusRef = useRef(null);
    const listId = useId();

    const openPalette = useCallback(() => {
        restoreFocusRef.current = document.activeElement;
        setQuery("");
        setActive(0);
        setCopied(false);
        setOpen(true);
    }, []);

    const close = useCallback(() => {
        setOpen(false);
        restoreFocusRef.current?.focus?.();
    }, []);

    useEffect(() => {
        openRef.current = open;
    }, [open]);

    // ⌘K / Ctrl+K toggles; other components can open it with a window event
    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
                e.preventDefault();
                if (openRef.current) close();
                else openPalette();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener(OPEN_PALETTE_EVENT, openPalette);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener(OPEN_PALETTE_EVENT, openPalette);
        };
    }, [openPalette, close]);

    // Focus the input and lock page scroll while open
    useEffect(() => {
        if (!open) return;
        inputRef.current?.focus();
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [open]);

    const results = open ? filterCommands(buildCommands({ designMode, onToggleDesignMode }), query) : [];
    const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

    // Keep the highlighted option in view
    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, open]);

    const runCommand = async (command) => {
        if (!command) return;

        if (command.copy) {
            try {
                await navigator.clipboard.writeText(command.copy);
                setCopied(true);
                setTimeout(close, 700);
            } catch {
                close();
                openMail(); // clipboard blocked: fall back to opening mail
            }
            return;
        }

        close();
        // Run after the palette closes and page scrolling is unlocked
        setTimeout(command.run, 30);
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!results.length) return;
            const step = e.key === "ArrowDown" ? 1 : -1;
            setActive((activeIndex + step + results.length) % results.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            runCommand(results[activeIndex]);
        } else if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation(); // don't also exit Design mode
            close();
        } else if (e.key === "Tab") {
            e.preventDefault(); // keep focus in the palette
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[15vh] text-left">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                onKeyDown={onKeyDown}
                className="relative w-full max-w-lg rounded-2xl bg-card/95 backdrop-blur-xl border border-[#8a2be2]/30 shadow-[0_0_40px_rgba(138,43,226,0.25)] overflow-hidden"
            >
                {/* Search */}
                <div className="flex items-center gap-3 px-4 border-b border-border">
                    <Search size={18} className="text-muted-foreground shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActive(0);
                        }}
                        placeholder="Type a command or search…"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls={listId}
                        aria-activedescendant={results.length ? `${listId}-${activeIndex}` : undefined}
                        aria-autocomplete="list"
                        className="flex-1 bg-transparent py-4 text-base outline-none placeholder:text-muted-foreground"
                    />
                    <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">Esc</kbd>
                </div>

                {/* Results */}
                <ul ref={listRef} id={listId} role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
                    {results.length === 0 && (
                        <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”</li>
                    )}

                    {results.map((command, index) => {
                        const showGroup = index === 0 || results[index - 1].group !== command.group;
                        const isActive = index === activeIndex;
                        const isCopied = copied && command.copy;
                        const Icon = isCopied ? Check : command.icon;

                        return (
                            <li key={command.id} role="presentation">
                                {showGroup && (
                                    <div className="px-3 pt-3 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground" role="presentation">
                                        {command.group}
                                    </div>
                                )}
                                <div
                                    id={`${listId}-${index}`}
                                    role="option"
                                    aria-selected={isActive}
                                    data-index={index}
                                    onMouseMove={() => setActive(index)}
                                    onClick={() => runCommand(command)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${
                                        isActive ? "bg-primary/15 text-foreground" : "text-foreground/80"
                                    }`}
                                >
                                    <Icon size={16} className={isCopied ? "text-[#3ECF8E]" : isActive ? "text-primary" : "text-muted-foreground"} />
                                    <span className="flex-1">{isCopied ? "Copied to clipboard" : command.label}</span>
                                    {command.hint && !isCopied && (
                                        <span className="text-xs text-muted-foreground truncate max-w-[45%]">{command.hint}</span>
                                    )}
                                    {isActive && !isCopied && <CornerDownLeft size={14} className="text-muted-foreground" />}
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* Footer hints */}
                <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[11px] text-muted-foreground">
                    <span>↑↓ navigate</span>
                    <span>↵ select</span>
                    <span>esc close</span>
                </div>
            </div>
        </div>
    );
};
