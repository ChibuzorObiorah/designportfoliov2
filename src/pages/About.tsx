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
            <div className="w-full mb-[80px]">
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
                    content="No design specifications on architecture, where something need to be weathered. Today, as people inhabit digital spaces, I strive to create well-crafted experiences with the same rigor."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="A culture of candor"
                    content="If it's not debate then no. If it's good, tell me why. If so it's each other, it won't do as any good."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Understanding why my work matters to the business"
                    content="I want to understand what makes it a hard task they're trying. This clarity keeps the light on, and clear as they're paying me."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Show don't tell"
                    content="It's rare what people design action speaks louder than words. In design, the prototypes usually communicate what words and all the planning."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="A good story"
                    content="People's attention are so valuable, yes it, and don't waste it."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Ongoing relationship with people I design for"
                    content="I genuinely think it's a privilege that I get to design for people. It's just at any opportunity I can talk to people I'm designing for, discovering and then this process."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Strong relationship with people I'm designing with, especially my PM"
                    content="PM is the leader, engineer actually make things happen. As a designer, I feel like the middle man sometimes. I want to build, and I also want to build the thing. This can lead to conflict, I've tried but I realized I need my partners. When we do not rule well, the product outcomes are solid. Yeah, so I want good those relationships."
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
