
import React from 'react';

export const Process: React.FC = () => {
  const steps = [
    { title: "Apply", color: "text-[#F85356]", description: "Share your work and your perspective on real-world learning with us." },
    { title: "Review", color: "text-[#369CF4]", description: "Our team carefully looks at every application to assess value alignment." },
    { title: "Follow-up", color: "text-[#FFC229]", description: "If there's a natural fit, we'll reach out to start a conversation." }
  ];

  return (
    <section className="py-32 px-6 bg-[#FDFCFB]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-20">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-8">
              <div className={`${step.color} font-serif text-5xl opacity-40 italic`}>0{idx + 1}</div>
              <h3 className="text-4xl tracking-tight text-stone-900">{step.title}</h3>
              <p className="text-stone-500 font-light leading-relaxed text-lg">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-10 border-t border-stone-200">
          <p className="text-stone-400 text-sm font-light italic max-w-2xl">
            Please note: As a small team focused on intentionality, we are unable to contact every applicant. We appreciate your patience and shared belief in our mission.
          </p>
        </div>
      </div>
    </section>
  );
};
