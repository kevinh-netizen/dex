
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ExperienceCardProps {
  handle: string;
  dotColor: string;
  title: string;
  description: string;
  prompt: string;
  avatar: string;
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ExperienceCard: React.FC<ExperienceCardProps & { image?: string; loading: boolean }> = ({ 
  handle, dotColor, title, description, image, loading, avatar
}) => (
  <div className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-full select-none">
    <div className="bg-white rounded-[1.5rem] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 group border border-stone-100">
      
      {/* Image Section - Top */}
      <div className="relative h-80 w-full bg-stone-100 overflow-hidden">
        {loading && !image ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
          </div>
        ) : image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 bg-stone-200"></div>
        )}
      </div>

      {/* Content Section - Bottom */}
      <div className="p-8 flex flex-col flex-grow space-y-4">
        
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full overflow-hidden shadow-sm shrink-0 border border-stone-100`}>
            <img src={avatar} alt={handle} className="w-full h-full object-cover" />
          </div>
          <span className="text-stone-500 text-xs font-medium tracking-wide truncate">{handle}</span>
        </div>
        
        {/* Stars */}
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <StarIcon key={i} className="w-4 h-4 text-[#F85356]" />
          ))}
        </div>

        {/* Text */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xl leading-tight text-stone-900 font-medium">
            {title}
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed font-light line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const Experience: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: ExperienceCardProps[] = [
    {
      handle: "@Claire",
      dotColor: "bg-[#F85356]",
      title: "",
      description: "Our girls really love their DEX! Every morning they wake up excited that a new story has been unlocked! Not only has their vocabulary enhanced but it has also been really helpful with their pronunciation!",
      prompt: "/1.jpg",
      avatar: "/1.jpg"
    },
    {
      handle: "@Miriam",
      dotColor: "bg-[#369CF4]",
      title: "",
      description: "My kids love Dex. They take it everywhere they go. It has helped us so much on teaching them Spanish.We have been asked by family about it and we can not stop raving about how good it is. People see my son in the street with it and they think that it is the coolest gift ever and access about it.",
      prompt: "/2.jpg",
      avatar: "/2.jpg"
    },
    {
      handle: "@MamaInRetrograde",
      dotColor: "bg-[#FFC229]",
      title: "",
      description: "Leveling up our language learning in 2026! My boys are obsessed and I love the daily interaction that keeps them engaged but would love more when they’re eager to keep learning. Very happy with purchase and will very much recommend to everyone!",
      prompt: "/3.jpg",
      avatar: "/3.jpg"
    },
    {
      handle: "@AlexisBhm",
      dotColor: "bg-stone-900",
      title: "",
      description: "OBSESSED! I hope one day a grown up version comes out. My kids play with it and learn language for hours in a way that is natural, progressive, helps them remember, and provides real time feedback. This is the best language learning tool we’ve purchased to date!",
      prompt: "/4.jpg",
      avatar: "/4.jpg"
    }
  ];

  useEffect(() => {
    // Directly use local images instead of generating
    setImages(cards.map(card => card.prompt));
    setLoading(false);
  }, []);

  // Automatic scrolling
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const visibleItems = getVisibleItems();
        const maxIndex = Math.max(0, cards.length - visibleItems);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [cards.length, isDragging]);

  const getVisibleItems = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 640) return 2;
    return 1;
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const itemWidth = containerWidth / getVisibleItems();
    
    // Calculate how many items we dragged across
    const itemsMoved = dragOffset / itemWidth;
    const threshold = 0.2; // Move 20% to trigger snap to next
    
    let newIndex = currentIndex;
    if (itemsMoved < -threshold) newIndex += 1;
    if (itemsMoved > threshold) newIndex -= 1;
    
    const maxIndex = Math.max(0, cards.length - getVisibleItems());
    newIndex = Math.max(0, Math.min(newIndex, maxIndex));
    
    setCurrentIndex(newIndex);
    setIsDragging(false);
    setDragOffset(0);
  };

  const calculateTranslateX = () => {
    const visibleItems = getVisibleItems();
    const itemWidthPercent = 100 / visibleItems;
    const baseTranslate = -(currentIndex * itemWidthPercent);
    
    // While dragging, add the relative movement in percentage
    if (isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const dragPercent = (dragOffset / containerWidth) * 100;
      return baseTranslate + dragPercent;
    }
    
    return baseTranslate;
  };

  return (
    <section className="py-32 px-6 overflow-hidden bg-stone-50">
      <div className="max-w-[1400px] mx-auto space-y-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-stone-900 tracking-tight">How Families Experience Dex</h2>
          <p className="text-stone-500 font-light text-xl leading-relaxed">
            Real moments from families documenting unscripted growth.
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
            className={`flex gap-6 ${isDragging ? 'transition-none' : 'transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]'}`}
            style={{ 
              transform: `translateX(${calculateTranslateX()}%)`,
              width: '100%' 
            }}
          >
            {cards.map((card, idx) => (
              <ExperienceCard 
                key={idx} 
                {...card} 
                image={images[idx]} 
                loading={loading} 
              />
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-3">
            {cards.map((_, idx) => {
              const visibleItems = getVisibleItems();
              const maxIndex = Math.max(0, cards.length - visibleItems);
              if (idx > maxIndex) return null;
              
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-700 rounded-full ${
                    idx === currentIndex ? 'w-16 bg-stone-900' : 'w-4 bg-stone-200 hover:bg-stone-400'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            <a 
              href="https://www.dex.camera/products/dex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors shadow-sm hover:shadow-md"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
