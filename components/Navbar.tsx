
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onJoin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoin }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled (for background style)
      setIsScrolled(currentScrollY > 50);

      // Determine visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        <div 
          className="flex cursor-pointer group items-center" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <img 
            src="/Dex_Wordmark.png" 
            alt="Dex" 
            className="h-4 w-auto object-contain"
          />
        </div>
        
        <button 
          onClick={onJoin}
          className="px-8 py-3 bg-[#8B2FFC] text-white rounded-full text-xs font-bold uppercase tracking-[0.25em] shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Join Now
        </button>
      </div>
    </nav>
  );
};
