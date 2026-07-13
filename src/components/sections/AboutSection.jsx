import { Code, User, Briefcase } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-gradient-xaise pb-1">Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT SIDE */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">
                        Passionate Web Developer & Designer
                    </h3>

                    <p className="text-muted-foreground">
                        I have experience building responsive web applications using modern technologies like React, Tailwind CSS, and Node.js. I focus on creating efficient, scalable, and user-friendly solutions.
                    </p>

                    <p className="text-muted-foreground">
                        My core skills include front-end development, UI/UX design, and problem-solving, with a strong foundation in JavaScript and component-based architecture.
                    </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center">
                            <a href="#contact" className="cosmic-button">
                                {/* TODO: Add Contact Link */}
                                Contact Me
                            </a>

                            <a
                                href={`${import.meta.env.BASE_URL}Domingo_Lenar_CV.pdf`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-2 rounded-full border border-[#8a2be2] text-foreground hover:bg-[#8a2be2]/20 transition-colors duration-300"
                            >
                                View Resume
                            </a>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* CARD 1 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        Web Development
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Building responsive and dynamic websites using modern technologies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        UI/UX Design
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Designing intuitive and user-friendly interfaces with a focus on experience.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        Project Management
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Managing projects efficiently from planning to deployment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};