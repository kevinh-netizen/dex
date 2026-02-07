
import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl shadow-stone-200">
              <img 
                src="/Family1.jpg" 
                alt="Child exploring nature" 
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
            </div>
            
            {/* Floating Badge Removed */}
          </div>

          {/* Right Side: Content */}
          <div className="space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.3em] text-[#F85356] uppercase pl-1 border-l-2 border-[#F85356]">Our Philosophy</span>
              <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-[1.05]">
                A return to the <br/> 
                <span className="italic text-stone-500">tactile world.</span>
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-xl text-stone-600 font-light leading-relaxed">
                Dex exists because we believe learning shouldn't be trapped behind a piece of glass. Our device is designed to be a companion for discovery, encouraging children to interact with their environment, use their voices, and trust their curiosity.
              </p>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};
