
import React from 'react';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F8F7E8] rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden group">
          <div className="space-y-10 relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold text-[#7A8B22] leading-[1.1] max-w-4xl mx-auto">
              Gift your child a new language in 2026
            </h2>
            <div className="flex justify-center">
              <button className="bg-[#8B2FFC] hover:bg-[#7222cf] text-white px-14 py-5 rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Order Now
              </button>
            </div>
          </div>
          
          {/* Close button at bottom right as seen in screenshot */}
          <button className="absolute bottom-10 right-10 w-8 h-8 rounded-full border border-[#7A8B22]/20 flex items-center justify-center text-stone-400 hover:bg-white/50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Subtle benefit tag */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 hidden md:block">
             <span className="text-[10px] uppercase tracking-widest text-[#7A8B22] font-bold opacity-60">Exclusive Benefit</span>
          </div>
        </div>
      </div>
    </section>
  );
};
