import React from 'react';

export const Values: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#FDFCF8]">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="w-16 h-1 bg-stone-200 mx-auto rounded-full"></div>
        
        <p className="text-2xl md:text-4xl text-stone-800 font-serif italic leading-relaxed">
          "We reject the dopamine-driven, attention-maximizing loops of modern children's content. Instead, we value agency over consumption. We want to see children who are daring enough to try, comfortable enough to fail, and eager to explore the world as it actually is."
        </p>

        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-stone-400 text-sm font-medium tracking-widest uppercase">
            <span>Dex Values</span>
          </div>
        </div>
      </div>
    </section>
  );
};
