import { useState, useEffect, useCallback } from 'react';

export const useStickyNavigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    'problem',
    'solution', 
    'impact',
    'approach',
    'challenges',
    'experiment',
    'learnings'
  ];

  // Handle section click navigation
  const handleSectionClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Set up intersection observers
  useEffect(() => {
    // Observer for hero image to show/hide navigation
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        console.log('Hero intersection:', entry.isIntersecting, 'Nav visible:', !entry.isIntersecting);
        // Show navigation when hero image is no longer visible (scrolled past it)
        setIsNavVisible(!entry.isIntersecting);
      },
      { 
        threshold: 0,
        rootMargin: '0px 0px -80% 0px' // Trigger when hero is 80% out of view
      }
    );

    // Observer for section highlighting
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '-120px 0px -60% 0px'
      }
    );

    // Wait for DOM to be ready, then observe elements
    const setupObservers = () => {
      // Observe hero image
      const heroElement = document.getElementById('hero-section');
      if (heroElement) {
        heroObserver.observe(heroElement);
      }

      // Observe all sections
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          sectionObserver.observe(element);
        }
      });
    };

    // Setup observers immediately and also after a short delay
    setupObservers();
    const timeoutId = setTimeout(setupObservers, 100);

    return () => {
      clearTimeout(timeoutId);
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [sections]);

  return {
    isNavVisible,
    activeSection,
    handleSectionClick
  };
};
