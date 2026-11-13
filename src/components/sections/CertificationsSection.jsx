import { Award, Medal, BookOpen, Shield, Users } from "lucide-react";

const items = [
    {
        title: "2nd Place MPTC Innovation Olympics",
        issuer: "Award",
        year: "2024",
        icon: <Medal size={32} className="text-yellow-500" />
    },
    {
        title: "Lean Six Sigma Yellow Belt",
        issuer: "AskLex",
        year: "March 2025",
        icon: <Award size={32} className="text-[#8a2be2]" />
    },
    {
        title: "Project Management Fundamentals",
        issuer: "AskLex",
        year: "March 2025",
        icon: <BookOpen size={32} className="text-[#ff0033]" />
    },
    {
        title: "Intro to Modern AI",
        issuer: "CISCO Network Academy",
        year: "January 2026",
        icon: <Award size={32} className="text-[#8a2be2]" />
    },
    {
        title: "Intro to Cybersecurity",
        issuer: "CISCO Network Academy",
        year: "January 2026",
        icon: <Shield size={32} className="text-[#ff0033]" />
    },
    {
        title: "Intro to Data Science",
        issuer: "CISCO Network Academy",
        year: "January 2026",
        icon: <BookOpen size={32} className="text-[#31A8FF]" />
    }
];

const events = [
    "GDG I/O Extended & DevFest (2024)",
    "GDG IWD & IgoroTalk (2025)",
    "Trend Micro Cyber Defense Society (2024 & 2025)"
];

export const CertificationsSection = () => {
    return (
        <section id="certifications" className="py-24 px-4 relative bg-background">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Certifications & <span className="text-gradient-xaise pb-1">Awards</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((cert) => (
                        <div
                            key={cert.title}
                            className="bg-card border border-border p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#8a2be2]/50"
                        >
                            <div className="mb-4 p-4 bg-secondary/50 rounded-full border border-white/5 shadow-inner">
                                {cert.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground/90">{cert.title}</h3>
                            <p className="text-muted-foreground font-medium text-sm md:text-base mb-4">{cert.issuer}</p>
                            <span className="mt-auto px-3 py-1 bg-primary/20 text-primary text-xs md:text-sm rounded-full font-bold">
                                {cert.year}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2 font-medium text-foreground/80">
                        <Users size={16} className="text-primary" /> Events & seminars:
                    </span>
                    <span>{events.join(" · ")}</span>
                </div>
            </div>
        </section>
    );
};
