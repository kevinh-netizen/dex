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
  <div className="snap-center flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-full select-none">
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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
    const interval = setInterval(() => {
      if (isDragging.current || !containerRef.current) return;
      
      const container = containerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 24; // 1.5rem gap
      const scrollAmount = cardWidth + gap;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // If we are near the end, scroll back to start
      if (Math.abs(container.scrollLeft - maxScroll) < 10 || container.scrollLeft > maxScroll) {
         container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
         container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 1;
      const index = Math.round(container.scrollLeft / cardWidth);
      const safeIndex = Math.min(Math.max(0, index), cards.length - 1);
      setCurrentIndex(safeIndex);
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

        {/* Carousel Container */}
        <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-1"
            onScroll={handleScroll}
            onTouchStart={() => { isDragging.current = true; }}
            onTouchEnd={() => { setTimeout(() => isDragging.current = false, 2000); }}
            onMouseEnter={() => { isDragging.current = true; }}
            onMouseLeave={() => { isDragging.current = false; }}
        >
          {cards.map((card, index) => (
            <ExperienceCard
              key={index}
              {...card}
              image={images[index]}
              loading={loading}
            />
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                  if (containerRef.current) {
                      const cardWidth = containerRef.current.children[0]?.clientWidth || 0;
                      const gap = 24;
                      containerRef.current.scrollTo({
                          left: index * (cardWidth + gap),
                          behavior: 'smooth'
                      });
                  }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-stone-800' : 'w-1.5 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
