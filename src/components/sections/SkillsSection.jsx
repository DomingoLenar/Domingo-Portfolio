import { cn } from "@/lib/utils";
import { 
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaNodeJs, FaDocker, FaGithub, FaFigma, FaCode, FaPaintBrush, FaPalette, FaAndroid, FaBrain, FaRobot, FaFire, FaComments, FaStar, FaVideo, FaFilm
} from "react-icons/fa";
import { 
    SiTypescript, SiLua, SiMysql, SiMariadb, SiSupabase
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skills = [
    // Frontend
    { name: "HTML", category: "Frontend", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS", category: "Frontend", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "JavaScript", category: "Frontend", icon: <FaJs className="text-[#F7DF1E]" /> },
    { name: "React", category: "Frontend", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "TypeScript", category: "Frontend", icon: <SiTypescript className="text-[#3178C6]" /> },

    // Backend / Programming
    { name: "Python", category: "Backend", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "Java", category: "Backend", icon: <FaJava className="text-[#ED8B00]" /> },
    { name: "Node.js", category: "Backend", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Lua", category: "Backend", icon: <SiLua className="text-[#2C2D72]" /> },

    // Databases
    { name: "MySQL", category: "Database", icon: <SiMysql className="text-[#4479A1]" /> },
    { name: "MariaDB", category: "Database", icon: <SiMariadb className="text-white" /> },
    { name: "Supabase", category: "Database", icon: <SiSupabase className="text-[#3ECF8E]" /> },

    // Tools
    { name: "GitHub", category: "Tools", icon: <FaGithub className="text-white" /> },
    { name: "VS Code", category: "Tools", icon: <VscVscode className="text-[#007ACC]" /> },
    { name: "Android Studio", category: "Tools", icon: <FaAndroid className="text-[#3DDC84]" /> },
    { name: "Docker", category: "Tools", icon: <FaDocker className="text-[#2496ED]" /> },

    // AI & ML
    { name: "TensorFlow", category: "AI & ML", icon: <FaBrain className="text-[#FF6F00]" /> },
    { name: "PyTorch", category: "AI & ML", icon: <FaFire className="text-[#EE4C2C]" /> },
    { name: "OpenAI", category: "AI & ML", icon: <FaRobot className="text-[#10A37F]" /> },
    { name: "Claude", category: "AI & ML", icon: <FaComments className="text-[#D97757]" /> },
    { name: "Gemini", category: "AI & ML", icon: <FaStar className="text-[#8a2be2]" /> },

    // Design
    { name: "Figma", category: "Design", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "Canva", category: "Design", icon: <FaPalette className="text-[#00C4CC]" /> },
    { name: "Photoshop", category: "Design", icon: <FaPaintBrush className="text-[#31A8FF]" /> },
    { name: "Premiere Pro", category: "Design", icon: <FaVideo className="text-[#9999FF]" /> },
    { name: "After Effects", category: "Design", icon: <FaFilm className="text-[#9999FF]" /> }
];

const categories = ["Frontend", "Backend", "Database", "AI & ML", "Tools", "Design"];

export const SkillsSection = () => {
    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    My <span className="text-gradient-xaise pb-1">Skills</span>
                </h2>

                <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden gradient-border">
                    <div className="divide-y divide-border">
                        {categories.map((category, catIndex) => {
                            const categorySkills = skills.filter(skill => skill.category === category);
                            if (categorySkills.length === 0) return null;

                            return (
                                <div key={catIndex} className="flex flex-col md:flex-row hover:bg-secondary/20 transition-colors p-6 md:p-8">
                                    <div className="w-full md:w-1/4 mb-4 md:mb-0 flex items-center">
                                        <h3 className="text-xl font-bold text-foreground/90">{category}</h3>
                                    </div>
                                    <div className="w-full md:w-3/4 flex flex-wrap gap-3">
                                        {categorySkills.map((skill, index) => (
                                            <div 
                                                key={index} 
                                                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-white/5 hover:border-[#8a2be2]/50 hover:bg-secondary transition-all duration-300"
                                            >
                                                <span className="text-xl">{skill.icon}</span>
                                                <span className="text-sm font-medium">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};