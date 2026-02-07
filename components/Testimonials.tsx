
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
  const [currentIndex, setCurrentIndex] = useState(creators.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const extendedCreators = [...creators, ...creators, ...creators];

  // Auto-scroll effect
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  const handleNext = () => {
    if (currentIndex >= extendedCreators.length - creators.length) {
      setIsTransitioning(false);
      setCurrentIndex(creators.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(creators.length + 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getCardWidthPercent = () => {
    if (typeof window === 'undefined') return 20;
    const width = window.innerWidth;
    if (width < 768) return 100;
    if (width < 1024) return 33.33;
    return 20;
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
    setIsTransitioning(false);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);
    
    // Calculate if we should snap to next/prev
    const cardWidth = containerRef.current ? containerRef.current.offsetWidth / getVisibleItems() : 0;
    const threshold = cardWidth * 0.3; // Drag 30% to snap

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        setCurrentIndex(prev => prev - 1);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }
    
    setDragOffset(0);
  };

  const getVisibleItems = () => {
    if (typeof window === 'undefined') return 5;
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 3;
    return 5;
  };

  const calculateTranslateX = () => {
    const cardWidthPercent = getCardWidthPercent();
    const baseTranslate = -(currentIndex * cardWidthPercent);
    
    // While dragging, add the relative movement in percentage
    if (isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const dragPercent = (dragOffset / containerWidth) * 100;
      return baseTranslate + dragPercent;
    }
    
    return baseTranslate;
  };

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
          className={`relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
        >
          <div 
            ref={containerRef}
            className={`flex gap-5 ${isTransitioning ? 'transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]' : ''}`}
            style={{ 
              transform: `translateX(calc(${calculateTranslateX()}%))` 
            }}
          >
            {extendedCreators.map((creator, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] aspect-[9/12] relative rounded-[2.5rem] overflow-hidden bg-stone-50 shadow-sm border border-stone-100 group select-none"
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
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-10">
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
