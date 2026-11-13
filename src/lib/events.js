// Small window events so unrelated components can talk without lifting state

export const OPEN_PALETTE_EVENT = "open-command-palette";
export const METEOR_SHOWER_EVENT = "meteor-shower";

export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
export const triggerMeteorShower = () => window.dispatchEvent(new Event(METEOR_SHOWER_EVENT));

export const paletteShortcutLabel = () =>
    /Mac|iPhone|iPad/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K";
