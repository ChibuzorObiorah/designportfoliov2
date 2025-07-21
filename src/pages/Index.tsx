import Navbar from '@/components/Navbar';
import ParticleHero from '@/components/ParticleHero';
import WorkGrid from '@/components/WorkGrid';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

const Index = () => {
  const [showParticles, setShowParticles] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start particle fade-in immediately
    const particleTimer = setTimeout(() => {
      setShowParticles(true);
    }, 200);

    // Show navigation after particles are visible
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => {
      clearTimeout(particleTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-colors-bg-1 font-ibm-plex">
      {/* Hero Section with Particle Animation */}
      <section className="w-full h-[70vh] relative overflow-hidden">
        {/* Navigation - slides down from top */}
        <div className={`absolute top-0 left-0 right-0 z-20 transition-transform duration-1000 ease-out ${
          showContent ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <Navbar />
        </div>
        
        {/* Particle Animation with dissolve effect */}
        <div className={`absolute inset-0 z-10 transition-opacity duration-1200 ease-out ${
          showParticles ? 'opacity-100' : 'opacity-0'
        }`}>
          <ParticleHero />
        </div>
      </section>

      <WorkGrid />
      <Footer />
    </div>
  );
};

export default Index;
