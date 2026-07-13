import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel = ({ items, renderItem }) => {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let interval;
        if (!isHovered) {
            interval = setInterval(() => {
                // If we've scrolled past the first set of items (which is 1/3 of the total scroll width since we duplicated 3 times)
                // We seamlessly jump back to 0.
                if (container.scrollLeft >= container.scrollWidth / 3) {
                    container.scrollLeft -= container.scrollWidth / 3;
                } else {
                    container.scrollLeft += 1;
                }
            }, 20); // 20ms = approx 50fps
        }

        return () => clearInterval(interval);
    }, [isHovered]);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (container) {
            const amount = direction === 'left' ? -350 : 350;
            container.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    // Duplicate items 3 times to ensure enough scroll width for seamless looping
    const displayItems = [...items, ...items, ...items];

    return (
        <div 
            className="relative group w-full border-y border-[#8a2be2]/30 bg-secondary/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <style>{`
                .hide-scroll::-webkit-scrollbar { display: none; }
                .hide-scroll { scrollbar-width: none; ms-overflow-style: none; }
            `}</style>

            {/* Arrows */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-background border border-[#8a2be2]/50 p-2 md:p-3 rounded-full shadow-[0_0_15px_rgba(138,43,226,0.3)] opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary text-white hover:scale-110 cursor-pointer"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={() => scroll('right')}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-background border border-[#8a2be2]/50 p-2 md:p-3 rounded-full shadow-[0_0_15px_rgba(138,43,226,0.3)] opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary text-white hover:scale-110 cursor-pointer"
            >
                <ChevronRight size={24} />
            </button>

            {/* Gradient Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div 
                ref={scrollRef}
                className="flex overflow-x-auto hide-scroll py-8 w-full scroll-smooth"
            >
                {displayItems.map((item, index) => (
                    <div key={index} className="flex-none px-3 md:px-4">
                        {renderItem(item, index)}
                    </div>
                ))}
            </div>
        </div>
    );
};
