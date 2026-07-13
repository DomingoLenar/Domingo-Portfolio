import { Mail, MapPin, Phone, Send } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Get In <span className="text-primary">Touch</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Let's Talk!</h3>
                            <p className="text-muted-foreground">
                                Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                                    <p className="text-foreground font-medium">lenardomingo14@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                                    <p className="text-foreground font-medium">+63 915 764 4966</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                                    <p className="text-foreground font-medium">Manila, Philippines</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card p-8 rounded-2xl shadow-lg gradient-border">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                                <textarea 
                                    id="message" 
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                    placeholder="How can I help you?"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full cosmic-button flex items-center justify-center gap-2">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
