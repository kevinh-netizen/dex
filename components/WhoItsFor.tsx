
import React from 'react';

export const WhoItsFor: React.FC = () => {
  return (
    <section id="who" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-8 max-w-xl">
            <h2 className="text-5xl md:text-7xl text-stone-900 font-serif leading-tight tracking-tight">
              Perspective over <br />
              <span className="italic text-stone-400">performance.</span>
            </h2>
            <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed">
              We value creators who prioritize the tactile experience of discovery over the dopamine loop of digital performance. Discover what we are doing to achieve our mission responsibly.
            </p>
            <button className="px-8 py-4 rounded-full border border-stone-200 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white transition-all duration-300">
              Read More
            </button>
          </div>

          {/* Right Side: Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px]">
            
            {/* Tall Card (Left) */}
            <div className="md:row-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-[400px] md:h-auto">
              <img 
                src="/Maeva.jpg" 
                alt="Connection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8 space-y-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-2xl font-medium">Connection</h3>
                <p className="text-white/80 text-sm font-light leading-relaxed max-w-xs">
                  It should feel like a natural part of your day, not a performance.
                </p>
              </div>
            </div>

            {/* Top Small Card (Right) */}
            <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[300px] md:h-auto">
              <img 
                src="/Tom.thedad.jpg" 
                alt="Substance" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-medium">Passion</h3>
                <p className="text-white/80 text-xs font-light leading-relaxed">
                  We are looking for creators who genuinely love Dex.
                </p>
              </div>
            </div>

            {/* Bottom Small Card (Right) */}
            <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[300px] md:h-auto">
              <img 
                src="/Bella.jpg" 
                alt="Real Life" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-medium">Real Life</h3>
                <p className="text-white/80 text-xs font-light leading-relaxed">
                  Messy, unscripted moments of figuring the world out.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
