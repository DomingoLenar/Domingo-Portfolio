import { Award, Medal, BookOpen, Star, Shield, Users } from "lucide-react";
import { Carousel } from "../reusable/Carousel";

const items = [
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
        title: "Continuous Improvement",
        issuer: "AskLex",
        year: "March 2025",
        icon: <Star size={32} className="text-yellow-500" />
    },
    {
        title: "Data Science Fundamentals",
        issuer: "AskLex",
        year: "March 2025",
        icon: <BookOpen size={32} className="text-[#0000ff]" />
    },
    {
        title: "IgoroTalk 7: IWM",
        issuer: "Google Developer’s Group",
        year: "March 2025",
        icon: <Users size={32} className="text-[#3ECF8E]" />
    },
    {
        title: "Intro to Data Science",
        issuer: "CISCO Network Academy",
        year: "January 2026",
        icon: <BookOpen size={32} className="text-[#31A8FF]" />
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
        title: "2nd Place MPTC Innovation Olympics",
        issuer: "Award",
        year: "2024",
        icon: <Medal size={32} className="text-yellow-500" />
    },
    {
        title: "Cyber Defense Society",
        issuer: "Trend Micro",
        year: "2024 & 2025",
        icon: <Shield size={32} className="text-[#ff0033]" />
    },
    {
        title: "I/O Extended & DevFest",
        issuer: "Google Developer’s Group",
        year: "2024",
        icon: <Users size={32} className="text-[#3ECF8E]" />
    },
    {
        title: "IWD & IgoroTalk",
        issuer: "Google Developer’s Group",
        year: "2025",
        icon: <Users size={32} className="text-[#3ECF8E]" />
    },
    {
        title: "Youth For Information Technology",
        issuer: "Seminar",
        year: "2018",
        icon: <Star size={32} className="text-[#0000ff]" />
    }
];

export const CertificationsSection = () => {
    const renderCard = (cert) => (
        <div className="w-[280px] md:w-[320px] bg-card border border-border p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#8a2be2]/50 cursor-pointer h-full">
            <div className="mb-4 p-4 bg-secondary/50 rounded-full border border-white/5 shadow-inner">
                {cert.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground/90">{cert.title}</h3>
            <p className="text-muted-foreground font-medium text-sm md:text-base mb-4">{cert.issuer}</p>
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs md:text-sm rounded-full font-bold">
                {cert.year}
            </span>
        </div>
    );

    return (
        <section id="certifications" className="py-24 px-4 relative bg-background overflow-hidden">
            <div className="container mx-auto max-w-6xl mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Certifications & <span className="text-gradient-xaise pb-1">Seminars</span>
                </h2>
            </div>

            <Carousel items={items} renderItem={renderCard} />
        </section>
    );
};
