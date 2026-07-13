import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12"
        >
            <div className="container max-w-6xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap justify-center lg:justify-start gap-2">
                                <span className="opacity-0 animate-fade-in">
                                    Hi, I'm
                                </span>
                                <span className="opacity-0 animate-fade-in-delay-1">
                                    <span className="text-gradient-xaise inline-block pb-2">
                                        Lenar Domingo
                                    </span>
                                </span>
                            </h1>

                            <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-delay-3 min-h-[3.5rem] md:min-h-[2rem]">
                                <TypeAnimation
                                    sequence={[
                                        'Frontend Developer specializing in React and TypeScript.',
                                        2500,
                                        'Bridging the gap between design and engineering.',
                                        2500,
                                        'Building responsive, user-centric web and mobile apps.',
                                        2500,
                                        'B.S. Computer Science student at Saint Louis University.',
                                        2500
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </div>
                        </div>

                        <div className="opacity-0 animate-fade-in-delay-4 flex flex-col items-center lg:items-start gap-6">
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <a href="#projects" className="cosmic-button">
                                    View My Work
                                </a>
                                <a href={`${import.meta.env.BASE_URL}Domingo_Lenar_CV.pdf`} download className="cosmic-button flex items-center gap-2" style={{background: 'transparent', border: '1px solid hsl(var(--border))'}}>
                                    <Download size={18} /> Download CV
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-6 pt-2">
                                <a href="https://github.com/DomingoLenar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300">
                                    <Github size={26} />
                                    <span className="sr-only">GitHub</span>
                                </a>
                                <a href="https://linkedin.com/in/domingolenar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#0077b5] hover:scale-110 transition-all duration-300">
                                    <Linkedin size={26} />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                                <a href="mailto:lenardomingo14@gmail.com" className="text-muted-foreground hover:text-[#ff0033] hover:scale-110 transition-all duration-300">
                                    <Mail size={26} />
                                    <span className="sr-only">Email</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Profile Picture */}
                    <div className="order-1 lg:order-2 flex justify-center opacity-0 animate-fade-in-delay-2 relative">
                        {/* Floating Icons */}
                        <div className="absolute top-0 right-4 md:top-4 md:right-12 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="bg-background/80 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(97,218,251,0.3)] text-[#61DAFB]">
                                <FaReact size={32} />
                            </div>
                        </div>
                        
                        <div className="absolute bottom-10 -left-2 md:bottom-16 md:left-4 z-20 animate-bounce" style={{ animationDuration: '4.5s' }}>
                            <div className="bg-background/80 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(49,120,198,0.3)] text-[#3178C6]">
                                <SiTypescript size={28} />
                            </div>
                        </div>

                        <div className="absolute -bottom-4 right-10 md:-bottom-2 md:right-20 z-20 animate-bounce" style={{ animationDuration: '3.5s' }}>
                            <div className="bg-background/80 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(51,153,51,0.3)] text-[#339933]">
                                <FaNodeJs size={30} />
                            </div>
                        </div>

                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-tr from-[#0000ff] via-[#8a2be2] to-[#ff0033] shadow-[0_0_40px_rgba(138,43,226,0.4)]">
                            <img 
                                src={`${import.meta.env.BASE_URL}Profile.jpg`} 
                                alt="Lenar Domingo" 
                                className="w-full h-full object-cover rounded-full border-[6px] border-background"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground mb-2">
                    Scroll
                </span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </div>
        </section>
    );
};