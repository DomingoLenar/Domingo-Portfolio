import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StarBackground } from "@/components/reusable/StarBackground";

export const NotFound = () => {
    return (
        <main className="relative min-h-screen flex items-center justify-center px-4 bg-background text-foreground overflow-hidden">
            <StarBackground />
            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                <p className="text-7xl md:text-9xl font-bold text-gradient-xaise pb-2">404</p>
                <h1 className="text-2xl md:text-3xl font-semibold">Lost in space</h1>
                <p className="text-muted-foreground max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="cosmic-button flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to home
                </Link>
            </div>
        </main>
    );
};
