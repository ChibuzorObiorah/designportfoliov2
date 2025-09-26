import React, { useEffect, useState } from 'react';
import AnimatedSection from '@/components/case-study/AnimatedSection';
import TextBlock from '@/components/case-study/TextBlock';
import ContentSection from '@/components/case-study/ContentSection';
import Footer from '@/components/Footer';

const About = () => {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [showMiddleImage, setShowMiddleImage] = useState(false);
  const [showSideImages, setShowSideImages] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(1); // Middle image starts active

  // Page entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Image animation sequence
  useEffect(() => {
    if (isPageVisible) {
      // Show middle image first
      const middleTimer = setTimeout(() => {
        setShowMiddleImage(true);
      }, 500);

      // Then slide out side images
      const sideTimer = setTimeout(() => {
        setShowSideImages(true);
      }, 1000);

      return () => {
        clearTimeout(middleTimer);
        clearTimeout(sideTimer);
      };
    }
  }, [isPageVisible]);

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <div className={`min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Photo Gallery Section */}
      <div className="w-full px-[80px] pt-[80px] pb-[80px]">
        <div className="w-full max-w-[1120px] mx-auto">
          <div className="relative h-[481px] flex justify-center items-center">
            {/* Left Image (1950s) */}
            <img 
              src="/assets/aboutme/1950.jpg"
              alt="1950s Photo"
              onClick={() => handleImageClick(0)}
              className={`absolute aspect-[368/481] w-[368px] rounded-lg cursor-pointer transition-all duration-500 ease-out origin-center object-cover ${
                activeImageIndex === 0 ? 'z-30 scale-105 shadow-2xl' : 'z-10 scale-100 shadow-lg'
              } ${
                showSideImages 
                  ? 'translate-x-[-200px] rotate-[-10deg] opacity-100' 
                  : 'translate-x-0 rotate-0 opacity-0'
              }`}
            />

            {/* Middle Image (Current) */}
            <img 
              src="/assets/aboutme/menow.jpg"
              alt="Current Photo"
              onClick={() => handleImageClick(1)}
              className={`absolute aspect-[368/481] w-[368px] rounded-lg cursor-pointer transition-all duration-500 ease-out origin-center object-cover ${
                activeImageIndex === 1 ? 'z-30 scale-105 shadow-2xl' : 'z-20 scale-100 shadow-lg'
              } ${
                showMiddleImage ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Right Image (1970s) */}
            <img 
              src="/assets/aboutme/1970.jpg"
              alt="1970s Photo"
              onClick={() => handleImageClick(2)}
              className={`absolute aspect-[368/481] w-[368px] rounded-lg cursor-pointer transition-all duration-500 ease-out origin-center object-cover ${
                activeImageIndex === 2 ? 'z-30 scale-105 shadow-2xl' : 'z-10 scale-100 shadow-lg'
              } ${
                showSideImages 
                  ? 'translate-x-[200px] rotate-[10deg] opacity-100' 
                  : 'translate-x-0 rotate-0 opacity-0'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full px-[80px] pb-[80px]">
        <div className="max-w-[1120px] mx-auto">
          {/* Quick Facts Section */}
          <AnimatedSection delay={300}>
            <div className="w-full mb-[32px]">
              <div className="w-[720px] mx-auto">
                <ContentSection>
                  <div>
                    <h2 className="text-title-2 text-fg-1 mb-6">
                      Quick facts
                    </h2>
                    <TextBlock 
                      content="Born and raised in Nigeria, but now based in New York City area. I've been at Microsoft for 4+ years. Recently got married, love watching our kid currently have an obsession with basketball. Believe in psychological safety."
                    />
                  </div>
                </ContentSection>
              </div>
            </div>
          </AnimatedSection>

          {/* Things I'd Fight For Section */}
          <AnimatedSection delay={400}>
            <div className="w-full">
              <div className="w-[720px] mx-auto space-y-8">
                <div className="mb-12">
                  <h2 className="text-title-2 text-fg-1">
                    Things I'd fight for
                  </h2>
                </div>

                <ContentSection>
                  <TextBlock 
                    title="The kind of craft architects put in their work"
                    content="My design experience began in Architecture. We threw sleep out the window, 
                    watching the sun rise, just to make sure our lines were straight. 
                    That's craft. And I like to bring that kind of intentionality to work I care about."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Strong relaionship with my PM and engineering partners"
                    content="The outcome of a product is directly related with how well the triad works. I learn a lot from them,
                    and it makes buiding so much more enjoyable."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="A culture of candor"
                    content="If it’s bad, please tell me. If it’s good, tell me why. If we BS each other, it won’t do us any good."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Understanding how the work impacts the business"
                    content="The money keeps the light on, and after all, they’re paying me."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Show don't tell"
                    content="It's true what people say: action speaks louder than words. I've experienced it, usually anything closer to the real deal does much better than all my yapping."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="A good story"
                    content="People's attention are so valuable, get it, and don't waste it."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Ongoing relationship with people I design for"
                    content="I genuinely think it's a privilege that I get to design for people. I'll jump at any opportunity to talk to people I'm designing for."
                  />
                </ContentSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
