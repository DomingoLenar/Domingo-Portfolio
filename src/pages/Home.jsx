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
export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <StarBackground />
      {/* Navbar */}
      <NavBar />
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