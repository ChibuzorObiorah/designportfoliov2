import React, { useEffect, useState } from 'react';

const About = () => {
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Page entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen px-20 transition-opacity duration-1000 ease-out ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`glass-container p-12 max-w-2xl transition-all duration-1000 ease-out delay-200 ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-title-1 text-fg-1 mb-6">About Me</h1>
        <p className="text-body-1 text-fg-2 leading-relaxed">
          This is the About page. The glass effect navbar is working perfectly! 
          You can toggle between Work and About using the glass toggle on the right side of the navbar.
        </p>
      </div>
    </div>
  );
};

export default About;
