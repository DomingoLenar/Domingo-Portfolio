import { Github, ExternalLink } from "lucide-react";
import { Carousel } from "../reusable/Carousel";

// The top 3 main projects for the grid
const featuredProjects = [
    {
        title: "Amalzen-Disease-Diagnosis",
        description: "An advanced machine learning system designed to accurately diagnose various diseases based on patient symptom data and medical histories.",
        tags: ["Python", "TensorFlow", "React", "Node.js"],
        github: "https://github.com/DomingoLenar/Amalzen-Disease-Diagnosis",
        demo: "#",
        featured: true
    },
    {
        title: "Cache-Game",
        description: "A fast-paced, memory-intensive web game built to test and improve cognitive recall and reaction times through interactive challenges.",
        tags: ["JavaScript", "HTML5", "CSS3"],
        github: "https://github.com/DomingoLenar/Cache-Game",
        demo: "#",
        featured: true
    },
    {
        title: "RT-DETRV2-MOBILE",
        description: "A mobile-optimized real-time object detection model utilizing the RT-DETRv2 architecture, providing high-accuracy vision on edge devices.",
        tags: ["PyTorch", "Python", "Android Studio", "Kotlin"],
        github: "https://github.com/DomingoLenar/RT-DETRV2-MOBILE",
        demo: "#",
        featured: true
    }
];

// Additional projects for the infinite marquee
const otherProjects = [
    { 
        title: "Cordillera-Language-Mapping", 
        description: "A web application to search, discover, and learn about the diverse languages and dialects spoken in Baguio and the Cordillera region.",
        tags: ["JavaScript", "HTML", "CSS"], 
        github: "https://github.com/DomingoLenar/Cordillera-Language-Mapping" 
    },
    { 
        title: "Exit-Interview-Question", 
        description: "Exit Interview web application developed to facilitate surveys for SLU alumni.",
        tags: ["PHP", "NodeJS", "JavaScript"], 
        github: "https://github.com/DomingoLenar/Exit-Interview-Question" 
    },
    { 
        title: "AthleteSystem", 
        description: "An athlete management and tracking system.",
        tags: ["Java", "OOP"], 
        github: "https://github.com/DomingoLenar/AthleteSystem" 
    },
    { 
        title: "Banorant", 
        description: "A desktop application project.",
        tags: ["Java"], 
        github: "https://github.com/DomingoLenar/Banorant" 
    },
    { 
        title: "BoguBogu", 
        description: "A custom Java-based application.",
        tags: ["Java"], 
        github: "https://github.com/DomingoLenar/BoguBogu" 
    }
];

export const ProjectsSection = () => {
    const renderOtherProject = (project) => (
        <div className="w-[280px] bg-secondary/30 border border-border p-5 rounded-xl flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 cursor-pointer h-full" onClick={() => window.open(project.github, '_blank')}>
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold truncate pr-2" title={project.title}>{project.title}</h4>
                <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Github size={18} />
                </a>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs text-muted-foreground">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <section id="projects" className="py-24 px-4 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Featured <span className="text-gradient-xaise pb-1">Projects</span>
                </h2>

                {/* Featured Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {featuredProjects.map((project, index) => (
                        <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border flex flex-col card-hover cursor-pointer" onClick={() => window.open(project.github, '_blank')}>
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                    <div className="flex gap-3">
                                        <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors hover:scale-110 duration-300" onClick={(e) => e.stopPropagation()}>
                                            <Github size={20} />
                                        </a>
                                        {project.demo !== "#" && (
                                            <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-300" onClick={(e) => e.stopPropagation()}>
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                
                                <p className="text-muted-foreground mb-6 flex-grow">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 bg-secondary text-xs rounded-full border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground/80">
                    More <span className="text-primary">Projects</span>
                </h3>
            </div>

            {/* Other Projects Carousel */}
            <Carousel items={otherProjects} renderItem={renderOtherProject} />
        </section>
    );
};