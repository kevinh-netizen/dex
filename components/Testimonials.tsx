import React, { useState, useEffect, useRef } from 'react';

interface CreatorData {
  handle: string;
  image: string;
}

interface TestimonialsProps {
  onJoin?: () => void;
}

const creators: CreatorData[] = [
  { handle: "@heybellafoodie", image: "/Bella.jpg" },
  { handle: "@dannylimongelli", image: "/danny.jpg" },
  { handle: "@secretsto.love", image: "/Elli.jpg" },
  { handle: "@juliiachina", image: "/Julia.jpg" },
  { handle: "@maeva.aus", image: "/Maeva.jpg" },
  { handle: "@tom.thedad", image: "/Tom.thedad.jpg" }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ onJoin }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Create a long list to simulate infinite scrolling
  const displayCreators = [...creators, ...creators, ...creators, ...creators];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDragging.current || !containerRef.current) return;
      
      const container = containerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 20; // gap-5 = 1.25rem = 20px
      const scrollAmount = cardWidth + gap;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // If we are near the end, scroll back to start
      if (container.scrollLeft >= maxScroll - 10) {
         container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
         container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-white overflow-hidden select-none">
      <div className="space-y-20">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#369CF4] font-bold block">Community</span>
          <h2 className="text-5xl md:text-6xl text-stone-900 tracking-tight leading-[1.1]">
            Join the <span className="italic">#dexfamily</span>
          </h2>
          <p className="text-stone-500 font-light text-lg">
            See how creators around the world are using Dex to document real growth.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-8"
          onTouchStart={() => { isDragging.current = true; }}
          onTouchEnd={() => { setTimeout(() => isDragging.current = false, 2000); }}
          onMouseEnter={() => { isDragging.current = true; }}
          onMouseLeave={() => { isDragging.current = false; }}
        >
            {displayCreators.map((creator, index) => (
              <div 
                key={index}
                className="snap-center flex-shrink-0 w-full md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] aspect-[9/12] relative rounded-[2.5rem] overflow-hidden bg-stone-50 shadow-sm border border-stone-100 group select-none"
              >
                {/* Image */}
                <img 
                  src={creator.image}
                  alt={creator.handle}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                  draggable="false"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                
                {/* Creator Handle */}
                <div className="absolute bottom-8 left-8 flex items-center gap-2 pointer-events-none">
                  <span className="text-white text-base font-medium tracking-wide drop-shadow-md">
                    {creator.handle}
                  </span>
                  <div className="bg-[#369CF4] rounded-full p-0.5 shadow-lg">
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-row justify-center items-center gap-4 pt-10">
          <button 
            onClick={onJoin}
            className="px-8 py-3 bg-[#8B2FFC] text-white border border-[#8B2FFC] rounded-full font-medium hover:bg-[#7222cf] transition-colors shadow-sm hover:shadow-md"
          >
            Join Now
          </button>
          <a 
            href="https://www.instagram.com/dexcamera/reels/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white/10 backdrop-blur-md border border-stone-200 text-stone-900 rounded-full font-medium hover:bg-stone-50 transition-colors shadow-sm hover:shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};
