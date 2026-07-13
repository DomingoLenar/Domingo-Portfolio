import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-background py-12 relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#8a2be2] to-transparent shadow-[0_0_20px_rgba(138,43,226,0.6)]"></div>
            
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold">
                        <span className="text-gradient-xaise pb-1">Lenar Domingo</span>
                    </span>
                    <p className="text-muted-foreground text-sm mt-2">
                        Building digital experiences that matter.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="https://github.com/DomingoLenar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-300">
                        <Github size={24} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/domingolenar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-300">
                        <Linkedin size={24} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="mailto:lenardomingo14@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-300">
                        <Mail size={24} />
                        <span className="sr-only">Email</span>
                    </a>
                </div>

                <div className="text-sm text-muted-foreground text-center md:text-right">
                    &copy; {new Date().getFullYear()} Lenar Domingo. <br className="md:hidden" />All rights reserved.
                </div>
            </div>
        </footer>
    );
};
