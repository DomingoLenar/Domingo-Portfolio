import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
    // Frontend
    { name: "HTML", level: 95, category: "Frontend" },
    { name: "CSS", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 90, category: "Frontend" },
    { name: "React", level: 85, category: "Frontend" },
    { name: "TypeScript", level: 80, category: "Frontend" },

    // Backend / Programming
    { name: "Python", level: 85, category: "Backend" },
    { name: "Java", level: 80, category: "Backend" },
    { name: "Lua", level: 70, category: "Backend" },

    // Databases
    { name: "MySQL", level: 85, category: "Database" },
    { name: "MariaDB", level: 80, category: "Database" },
    { name: "Supabase", level: 80, category: "Database" },

    // Tools
    { name: "GitHub", level: 90, category: "Tools" },
    { name: "VS Code", level: 95, category: "Tools" },
    { name: "IntelliJ IDEA", level: 80, category: "Tools" },
    { name: "Android Studio", level: 75, category: "Tools" },

    // Design
    { name: "Figma", level: 85, category: "Design" },
    { name: "Canva", level: 90, category: "Design" },
    { name: "Adobe Photoshop", level: 75, category: "Design" }
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools", "Design"];

export const SkillsSection = () => {
        const [activeCategory, setActiveCategory] = useState("All");

        const filteredSkills = skills.filter((skill) => activeCategory === "All" || skill.category === activeCategory);

    return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                My <span className="text-primary"> Skills</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category, key) => (
                    <button
                        key={key}
                        className={cn(`px-5 py-2 rounded-full transition-colors duration-300 capitalize ${
                            activeCategory === category
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary/70 text-foreground hover:bg-secondary"
                        }`)}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredSkills.map((skill, index) => (
                    <div key={index} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                        <div className="text-left mb-4">
                            <h3 className="text-lg font-semibold">{skill.name}</h3>
                            <p className="text-muted-foreground">{skill.category}</p>
                            <div className="w-full bg-secondary/50 rounded-full overflow-hidden">
                                <div
                                    className="bg-primary h-2 origin-left rounded-full"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>

                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">
                                    {skill.level}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
)};