
import React from 'react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  cta: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, color, cta }) => (
  <div className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 shadow-sm`}>
      {icon}
    </div>
    <div className="flex-grow space-y-4">
      <h3 className="text-3xl font-serif text-stone-900 leading-tight italic">
        {title}
      </h3>
      <p className="text-stone-500 font-light leading-relaxed text-base">
        {description}
      </p>
    </div>
    <div className="mt-10">
      <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900 border-b-2 border-transparent hover:border-stone-900 transition-all pb-1">
        {cta}
      </button>
    </div>
  </div>
);

export const InfluencerBenefits: React.FC = () => {
  const benefits = [
    {
      title: "Scale Your Influence",
      description: "Grow your community with content that resonates. Share authentic, screen-free moments that parents everywhere are craving.",
      color: "bg-[#369CF4]/10",
      cta: "Grow with us",
      icon: (
        <svg className="w-8 h-8 text-[#369CF4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Sustainable Partnership",
      description: "Earn meaningful commissions on every referral. We believe in rewarding the creators who help us bring tactile learning to more homes.",
      color: "bg-[#F85356]/10",
      cta: "Start earning",
      icon: (
        <svg className="w-8 h-8 text-[#F85356]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-12c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3m0 0V6m0 12v2m-4-2h8m-12-3h12" />
        </svg>
      )
    },
    {
      title: "Foster Their Journey",
      description: "See the difference firsthand. Dex isn't just a product you promote—it's a tool that fosters your child's curiosity and independent discovery.",
      color: "bg-[#FFC229]/10",
      cta: "Nurture growth",
      icon: (
        <svg className="w-8 h-8 text-[#FFC229]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="benefits" className="py-32 px-6 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F85356] font-bold block">Creator Rewards</span>
          <h2 className="text-5xl md:text-6xl text-stone-900 tracking-tight leading-[1.1]">
            What you gain as a <span className="italic">Dex Partner.</span>
          </h2>
          <p className="text-stone-500 font-light text-lg">
            We're building a community of intentional parents and creators who value real-world connection over digital distractions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              color={benefit.color}
              cta={benefit.cta}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
