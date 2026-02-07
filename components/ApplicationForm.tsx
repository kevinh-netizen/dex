
import React, { useState } from 'react';

interface ApplicationFormProps {
  onClose: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    social: '',
    childAge: '',
    motivation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // You can replace this with your own Formspree ID or backend URL
  // Example: "https://formspree.io/f/your_form_id"
  const FORM_ENDPOINT = "https://formspree.io/f/mdalogpd"; 

  const handleSubmit = async () => {
    if (!formData.email || !formData.social || !formData.childAge || !formData.motivation) return;
    
    setIsSubmitting(true);

    try {
      // 1. Submit to Formspree (or your own backend)
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error if needed
        console.error("Formspree submission failed");
        // For now, we can still show success or handle error UI
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Handle network error
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F9F8F6] z-[100] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center bg-transparent z-20">
        <div className="flex cursor-pointer" onClick={onClose}>
          <img 
            src="/Dex_Wordmark.png" 
            alt="Dex" 
            className="h-6 w-auto object-contain"
          />
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-3xl w-full relative h-full flex flex-col justify-center">
        {!isSubmitted ? (
          <div className="space-y-8 animate-[fadeIn_0.6s_ease-out] overflow-y-auto max-h-[85vh] py-10 px-2 scrollbar-hide">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl text-stone-900 font-serif leading-tight">
                Creator <br /><span className="italic">Application</span>
              </h2>
              <p className="text-stone-500 font-light text-lg max-w-lg">
                We're excited to learn about your journey. Please share a few details so we can see if we're a match.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="hello@example.com"
                    className="w-full bg-white border-none p-5 rounded-2xl text-base shadow-[0px_4px_20px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-[#F85356] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Social Media Handle</label>
                  <input 
                    type="text" 
                    value={formData.social}
                    onChange={(e) => setFormData({...formData, social: e.target.value})}
                    placeholder="@yourhandle"
                    className="w-full bg-white border-none p-5 rounded-2xl text-base shadow-[0px_4px_20px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-[#369CF4] outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Child's Age</label>
                <input 
                  type="text" 
                  value={formData.childAge}
                  onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                  placeholder="e.g. 4 years old"
                  className="w-full bg-white border-none p-5 rounded-2xl text-base shadow-[0px_4px_20px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-[#FFC229] outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Why do you want to collaborate with Dex?</label>
                <textarea 
                  value={formData.motivation}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  placeholder="e.g. We are a bilingual family and want to preserve our heritage language..."
                  className="w-full bg-white border-none p-5 rounded-[2rem] text-base min-h-[120px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-[#8B2FFC] outline-none transition-all resize-none"
                />
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!formData.email || !formData.social || !formData.childAge || !formData.motivation || isSubmitting}
              className="group w-full py-5 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-4"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
              {!isSubmitting && (
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-[fadeIn_1s_ease-out]">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-serif italic text-stone-900 tracking-tight">Application Received.</h2>
              <p className="text-stone-500 font-light text-xl max-w-md mx-auto">
                Thank you for your intentionality. Our team will review your perspective and reach out if it's a natural fit.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="px-12 py-5 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl"
            >
              Return to Site
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
