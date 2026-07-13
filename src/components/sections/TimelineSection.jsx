import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const timelineData = [
    {
        type: "experience",
        title: "Software Developer",
        organization: "Ecosystem for Sustainable Commerce in Agriculture (ESCA)",
        date: "January 2026 – Present",
        location: "Remote",
        description: "Architected dynamic frontend features utilizing React and TypeScript. Engineered a secure Co-op Admin Settings Page with Supabase and bridged design gaps using high-fidelity Figma prototypes.",
        icon: <Briefcase size={20} />
    },
    {
        type: "experience",
        title: "Development Intern",
        organization: "NOAH Business Applications",
        date: "June 2025 – July 2025",
        location: "Remote",
        description: "Accelerated development lifecycle of enterprise business software. Implemented scalable new features, resolved critical logic bugs, and produced comprehensive technical documentation.",
        icon: <Briefcase size={20} />
    },
    {
        type: "education",
        title: "B.S. in Computer Science",
        organization: "Saint Louis University",
        date: "Expected July 2026",
        location: "Baguio City, PH",
        description: "Awards: Dean's Lister, 2nd Place MPTC Innovation Olympics (2024). Certifications: Lean Six Sigma Yellow Belt, Project Management Fundamentals.",
        icon: <GraduationCap size={20} />
    }
];

export const TimelineSection = () => {
    return (
        <section id="experience" className="py-24 px-4 relative bg-secondary/10">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    My <span className="text-gradient-xaise pb-1">Journey</span>
                </h2>

                <div className="relative border-l-2 border-primary/30 ml-4 md:ml-0 md:border-none space-y-12">
                    {/* Center line for desktop */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#0000ff] via-[#8a2be2] to-[#ff0033] opacity-30"></div>

                    {timelineData.map((item, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* Icon */}
                            <div className="absolute left-[-1.15rem] md:static md:left-auto flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-[#8a2be2] text-foreground z-10 md:mx-auto shadow-[0_0_15px_rgba(138,43,226,0.5)]">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div className={`w-full md:w-5/12 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:text-left md:pr-12' : 'md:text-right md:pl-12'}`}>
                                <div className="bg-card p-6 rounded-xl shadow-lg gradient-border card-hover">
                                    <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                                    <h4 className="text-primary font-medium mb-3">{item.organization}</h4>
                                    
                                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} /> {item.date}
                                        </div>
                                    </div>
                                    
                                    <p className="text-muted-foreground text-sm leading-relaxed text-left">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
