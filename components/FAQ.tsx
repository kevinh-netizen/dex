
import React from 'react';

const FAQItem: React.FC<{ question: string }> = ({ question }) => (
  <div className="bg-[#F6F5F2] hover:bg-stone-100 transition-colors cursor-pointer p-10 rounded-[2.5rem] flex items-center justify-between group">
    <h3 className="text-2xl md:text-3xl font-serif text-stone-700 leading-tight">
      {question}
    </h3>
    <div className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-white transition-all">
      <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12M6 12h12" />
      </svg>
    </div>
  </div>
);

export const FAQ: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto space-y-4">
        <FAQItem question="Does Dex need an internet connection to work?" />
        <FAQItem question="Where can I use Dex's LTE network?" />
      </div>
    </section>
  );
};
