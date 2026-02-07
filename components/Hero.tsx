
import React from 'react';

export const Hero: React.FC<{ onJoin?: () => void }> = ({ onJoin }) => {
  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-stone-900"
    >
      <div className="flex h-full w-full">
        <div className="flex-shrink-0 w-full h-full relative select-none">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-bg.png?v=local" 
              alt="Document the beauty of growth" 
              className="w-full h-full object-cover pointer-events-none"
              draggable="false"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-32 px-6 text-center space-y-12 max-w-5xl mx-auto">
            <div className="transition-all duration-1000 delay-300 opacity-100 translate-y-0">
              <h1 className="text-white text-5xl md:text-8xl font-light tracking-[0.05em] leading-[1.1] pointer-events-none">
                Document the <br />
                <span className="font-normal italic">beauty of growth.</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-500 opacity-100 translate-y-0">
              <button 
                onClick={(e) => { e.stopPropagation(); onJoin?.(); }}
                className="w-64 sm:w-auto px-16 py-5 bg-[#8B2FFC] text-white rounded-full text-xs font-bold uppercase tracking-[0.25em] shadow-2xl transition-all hover:scale-110 active:scale-95 z-20"
              >
                Join Now
              </button>
              <a 
                href="#about"
                onClick={(e) => e.stopPropagation()}
                className="w-64 sm:w-auto px-16 py-5 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-[0.25em] transition-all hover:bg-white/20 hover:scale-110 active:scale-95 text-center z-20"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }
      `}</style>
    </section>
  );
};
