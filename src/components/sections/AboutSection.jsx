import { Code, Palette, MousePointerClick } from "lucide-react";

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
                        Designing Interfaces, Then Building Them
                    </h3>

                    <p className="text-muted-foreground">
                        I'm a UI/UX designer and frontend developer from Baguio City. I design in Figma, from user flows and wireframes to high-fidelity prototypes, and then build those designs myself in React and TypeScript.
                    </p>

                    <p className="text-muted-foreground">
                        Working on both sides means I know what's realistic to ship and which details make an interface feel right. I'm a Computer Science graduate of Saint Louis University.
                    </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center">
                            <a href="#contact" className="cosmic-button">
                                Contact Me
                            </a>

                            <a
                                href={`${import.meta.env.BASE_URL}Domingo_Lenar_Resume.pdf`}
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
                                    <Palette className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        UI/UX Design
                                    </h4>
                                    <p className="text-muted-foreground">
                                        User flows, wireframes, and interfaces that are clear and easy to use.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MousePointerClick className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        Prototyping
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Interactive Figma prototypes to test ideas before any code is written.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        Frontend Development
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Turning designs into responsive, accessible React and TypeScript apps.
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