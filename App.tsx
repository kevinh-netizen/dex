
import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Values } from './components/Values';
import { WhoItsFor } from './components/WhoItsFor';
import { InfluencerBenefits } from './components/InfluencerBenefits';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Testimonials } from './components/Testimonials';
import { ApplicationForm } from './components/ApplicationForm';

const App: React.FC = () => {
  const [showApplication, setShowApplication] = useState(false);

  useEffect(() => {
    if (showApplication) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showApplication]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const blobs = document.querySelectorAll('.blob');
      blobs.forEach((blob, index) => {
        const speed = 0.05 * (index + 1);
        (blob as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showApplication]);

  const handleJoin = () => setShowApplication(true);
  const handleClose = () => setShowApplication(false);

  return (
    <div className="min-h-screen selection:bg-stone-200 relative">
      {showApplication ? (
        <ApplicationForm onClose={handleClose} />
      ) : (
        <>
          {/* Dynamic Background Blobs */}
          <div className="blob bg-[#F85356] w-[600px] h-[600px] -top-20 -left-20"></div>
          <div className="blob bg-[#369CF4] w-[500px] h-[500px] top-[120vh] -right-20"></div>
          <div className="blob bg-[#FFC229] w-[700px] h-[700px] top-[250vh] -left-40"></div>
          <div className="blob bg-[#8B2FFC] w-[400px] h-[400px] bottom-0 right-0 opacity-10"></div>

          <Navbar onJoin={handleJoin} />
          <main className="relative z-10">
            <div id="hero" className="reveal"><Hero onJoin={handleJoin} /></div>
            <div id="about" className="reveal"><About /></div>
            <div id="who" className="reveal"><WhoItsFor /></div>
            <div className="reveal"><InfluencerBenefits /></div>
            <div className="reveal"><Experience /></div>
            <div className="reveal"><Testimonials onJoin={handleJoin} /></div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
