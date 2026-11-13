import { StarBackground } from "../components/reusable/StarBackground";
import { NavBar } from "../components/reusable/NavBar";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { TimelineSection } from "../components/sections/TimelineSection";
import { CertificationsSection } from "../components/sections/CertificationsSection";
import { GithubSection } from "../components/sections/GithubSection";
import { Footer } from "../components/reusable/Footer";
import { DesignOverlay } from "../components/reusable/DesignOverlay";
import { FigmaCursor } from "../components/reusable/FigmaCursor";
import { CommandPalette } from "../components/reusable/CommandPalette";
import { useEffect, useState } from "react";

export const Home = () => {
    const [designMode, setDesignMode] = useState(false);

    // Esc exits design mode
    useEffect(() => {
      if (!designMode) return;
      const onKeyDown = (e) => {
        if (e.key === "Escape") setDesignMode(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [designMode]);

    // `relative` makes this the positioning box for the Figma cursor layer (document coordinates)
    return <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <StarBackground />
      {/* Navbar */}
      <NavBar designMode={designMode} onToggleDesignMode={() => setDesignMode((prev) => !prev)} />
      {/* Design mode overlay */}
      <DesignOverlay enabled={designMode} />
      {/* "Lenar" multiplayer cursor (hidden while design mode is on) */}
      <FigmaCursor hidden={designMode} />
      {/* ⌘K / Ctrl+K command palette */}
      <CommandPalette designMode={designMode} onToggleDesignMode={() => setDesignMode((prev) => !prev)} />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
        <GithubSection />
        <ContactSection />
      </main>
      {/* Footer */}
      <Footer />
    </div>;
};