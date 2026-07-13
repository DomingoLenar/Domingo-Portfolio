import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";

export const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "c7420457-b1e4-432f-8efd-c1e72ac5e671",
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });
            
            const result = await response.json();
            if (result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                // Reset the button after 3 seconds
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Get In <span className="text-gradient-xaise pb-1">Touch</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="flex flex-col justify-center items-center text-center space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Let's Talk!</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>
                        </div>

                        <div className="space-y-6 flex flex-col items-center md:items-start w-full max-w-sm mx-auto">
                            <div className="flex items-center gap-4 w-full">
                                <div className="p-3 bg-primary/10 rounded-full text-primary shadow-inner shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                                    <p className="text-foreground font-medium">lenardomingo14@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 w-full">
                                <div className="p-3 bg-primary/10 rounded-full text-primary shadow-inner shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                                    <p className="text-foreground font-medium">+63 915 764 4966</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 w-full">
                                <div className="p-3 bg-primary/10 rounded-full text-primary shadow-inner shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                                    <p className="text-foreground font-medium">Manila, Philippines</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card p-8 rounded-2xl shadow-lg gradient-border">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="John Doe"
                                    required
                                    disabled={status === "loading"}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="john@example.com"
                                    required
                                    disabled={status === "loading"}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                                <textarea 
                                    id="message" 
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                    placeholder="How can I help you?"
                                    required
                                    disabled={status === "loading"}
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={status !== "idle"}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 ${
                                    status === "success" ? "bg-green-600 hover:bg-green-700 hover:scale-100" :
                                    status === "error" ? "bg-red-600 hover:bg-red-700 hover:scale-100" :
                                    "cosmic-button"
                                }`}
                            >
                                {status === "idle" && <><Send size={18} /> Send Message</>}
                                {status === "loading" && "Sending..."}
                                {status === "success" && <><CheckCircle2 size={18} /> Sent Successfully!</>}
                                {status === "error" && <><AlertCircle size={18} /> Failed to send</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
