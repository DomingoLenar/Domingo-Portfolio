import { useEffect, useState } from "react";

// id, size, x, y, opacity, animationDuration

const createStars = () => {
    const numberOfStars = Math.floor(
        (window.innerWidth * window.innerHeight) / 10000
    );

    return Array.from({ length: numberOfStars }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
    }));
};

// One meteor at a time, at a random spot, every few seconds
let nextMeteorId = 0;
const createMeteor = () => ({
    id: nextMeteorId++,
    x: Math.random() * 70 + 30,          // % from left (biased right, since they travel down-left)
    y: Math.random() * 40,               // % from top
    length: Math.random() * 80 + 80,     // px of tail
    distance: Math.random() * 300 + 400, // px travelled
    duration: Math.random() * 0.7 + 0.8, // seconds
});

export const StarBackground = () => {
    const [stars, setStars] = useState(createStars);
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
        const handleResize = () => setStars(createStars());

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let timeout;
        const schedule = (delay) => {
            timeout = setTimeout(() => {
                // Skip while the tab is hidden so meteors don't pile up and fire all at once on return
                if (!document.hidden) setMeteors((prev) => [...prev, createMeteor()]);
                schedule(Math.random() * 3000 + 2000);
            }, delay);
        };
        schedule(1500);

        return () => clearTimeout(timeout);
    }, []);

    const removeMeteor = (id) => setMeteors((prev) => prev.filter((m) => m.id !== id));

    return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
            <div key={star.id} className="star animate-pulse-subtle" style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animationDuration: star.animationDuration + "s",
        }}/>
        ))}

        {meteors.map((meteor) => (
            <div key={meteor.id} className="meteor animate-meteor" onAnimationEnd={() => removeMeteor(meteor.id)} style={{
                width: meteor.length + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDuration: meteor.duration + "s",
                "--meteor-distance": meteor.distance + "px",
        }}/>
        ))}
    </div>
    );
};