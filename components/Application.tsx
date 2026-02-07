
import React from 'react';

export const Application: React.FC = () => {
  return (
    <section id="apply" className="py-40 px-6 max-w-4xl mx-auto scroll-mt">
      <div className="space-y-16 text-center">
        <div className="space-y-6">
          <h2 className="text-6xl text-stone-900 tracking-tight">Creator Application</h2>
          <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto leading-relaxed">
            This form helps us understand your values and how you approach documenting children's growth. It is the first step toward working together.
          </p>
        </div>
        
        <div className="p-20 border-2 border-dashed border-[#369CF4]/30 bg-[#369CF4]/5 rounded-3xl transition-colors hover:border-[#369CF4]/50">
          <div className="space-y-6">
            <div className="w-16 h-1 bg-[#FFC229] mx-auto rounded-full"></div>
            <p className="text-[#369CF4] font-bold uppercase tracking-[0.2em] text-xs">Application Form</p>
            <p className="text-stone-400 text-sm font-light italic italic">The secure portal will load here shortly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
