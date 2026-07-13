import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
    {
        title: "Amalzen-Disease-Diagnosis",
        description: "Amalzen Disease Diagnosis is a program for identifying a user's disease based on symptoms using the Prolog Programming Language.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
        tags: ["Prolog", "AI", "Medical Diagnosis"],
        github: "https://github.com/DomingoLenar/Amalzen-Disease-Diagnosis",
        demo: "https://github.com/DomingoLenar/Amalzen-Disease-Diagnosis"
    },
    {
        title: "Cache-Game",
        description: "A real-time memory game designed to help users learn and recognize various programming languages through interactive gameplay.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
        tags: ["Game Development", "Educational", "Real-time"],
        github: "https://github.com/DomingoLenar/Cache-Game",
        demo: "https://github.com/DomingoLenar/Cache-Game"
    },
    {
        title: "RT-DETRV2-MOBILE",
        description: "A Mobile Application for Philippine Road Damage Detection Using Cloud-Deployed RT-DETRv2 and GIS Mapping.",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop",
        tags: ["Mobile", "Computer Vision", "GIS", "RT-DETRv2"],
        github: "https://github.com/DomingoLenar/RT-DETRV2-MOBILE",
        demo: "https://github.com/DomingoLenar/RT-DETRV2-MOBILE"
    }
];

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Featured <span className="text-gradient-xaise pb-1">Projects</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-card rounded-xl overflow-hidden shadow-lg card-hover flex flex-col gradient-border">
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 mt-auto">
                                    <a href={project.github} className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                                        <Github size={18} /> Code
                                    </a>
                                    <a href={project.demo} className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};