import { Github, ExternalLink } from "lucide-react";

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

// Additional projects for the smaller grid below
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
        description: "A client-server booking app where fans schedule and pay for sessions with celebrities, built on Java RMI with a MySQL backend.",
        tags: ["Java", "Java RMI", "MySQL"],
        github: "https://github.com/DomingoLenar/Banorant" 
    },
    { 
        title: "BoguBogu", 
        description: "Implementations and time-complexity analysis of bubble, selection, and insertion sort across best, average, and worst cases.",
        tags: ["Java", "Algorithms"],
        github: "https://github.com/DomingoLenar/BoguBogu" 
    }
];

export const ProjectsSection = () => {
    const renderOtherProject = (project) => (
        <div key={project.title} className="relative bg-secondary/30 border border-border p-5 rounded-xl flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 focus-within:border-primary/50 h-full">
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold truncate pr-2" title={project.title}>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="after:absolute after:inset-0 after:rounded-xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary"
                    >
                        {project.title}
                    </a>
                </h4>
                <Github size={18} className="text-muted-foreground shrink-0" aria-hidden="true" />
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
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Featured <span className="text-gradient-xaise pb-1">Projects</span>
                </h2>

                {/* Featured Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {featuredProjects.map((project, index) => (
                        <div key={index} className="relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border flex flex-col card-hover focus-within:border-primary/50">
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <div className="flex gap-3">
                                        <Github size={20} className="text-muted-foreground" aria-hidden="true" />
                                        {project.demo !== "#" && (
                                            <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`} className="relative z-10 text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-300">
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

                {/* Other Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map(renderOtherProject)}
                </div>
            </div>
        </section>
    );
};