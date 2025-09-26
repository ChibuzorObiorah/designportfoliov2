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
    <>
    <div className={`min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Photo Gallery Section */}
      <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] pt-[80px] pb-[80px]">
        <div className="w-full max-w-[1280px] mx-auto">
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
      <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] pb-[80px]">
        <div className="max-w-[1280px] mx-auto">
          {/* Quick Facts Section */}
          <AnimatedSection delay={300}>
            <div className="w-full mb-[32px]">
              <div className="w-[720px] mx-auto">
                <ContentSection>
                  <div>
                    <h2 className="text-caption-1 text-fg-1 mb-6">
                      QUICK FACTS
                    </h2>
                    <TextBlock 
                      content="Born and raised in Nigeria, but now based in New York City area. Recently got married, love working out but currently have an obsession with basketball. Ran a photography business in the past."
                    />
                    <TextBlock 
                      content="5 years of experience in product design. 4+ years at Microsoft. Currently focused on building AI experiences for Microsoft Copilot."
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
                <div className="mb-6">
                  <h2 className="text-caption-1 text-fg-1">
                    THINGS I'D FIGHT FOR
                  </h2>
                </div>

                <ContentSection>
                  <TextBlock 
                    title="The kind of craft architects put in their work"
                    content="My design experience began in Architecture. We threw sleep out the window, watching the sun rise, just to make sure our lines were straight. That's craft. And I like to bring that kind of intentionality to work I care about."
                  />
                </ContentSection>

                <ContentSection>
                  <TextBlock 
                    title="Strong relaionship with my PM and engineering partners"
                    content="The outcome of a product is directly related with how well the triad works. I learn a lot from them, and it makes buiding so much more enjoyable."
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

          {/* Accolades Section */}
          <AnimatedSection delay={500}>
            <div className="w-full">
              <div className="max-w-[1280px] mx-auto">
                <div className="flex gap-8 items-start justify-between pt-[100px] pb-[100px]">
                  {/* Experience & Education Column */}
                  <div className="flex-1 flex flex-col gap-[8px]">
                    {/* Experience */}
                    <div className="pb-[24px]">
                      <div className="flex gap-[8px] items-center pb-[16px]">
                        <h3 className="text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]">
                          EXPERIENCE
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Product Designer, Microsoft
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Aug 2021 - Present
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Product Design Intern, ThredUp
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          May 2020 - Aug 2020
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Product Design Consultant, Kiva
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Feb 2020 - May 2020
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Product Design Consultant, Ancestry
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Sept 2019 - Dec 2019
                        </p>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="pb-[24px]">
                      <div className="flex gap-[8px] items-center pb-[16px]">
                        <h3 className="text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]">
                          EDUCATION
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[8px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          University of California, Berkeley
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Aug 2017 - May 2021
                        </p>
                      </div>
                      
                      <div className="pb-[16px]">
                        <p className="text-body-1 text-fg-2 tracking-[0.16px] leading-[22px]">
                          Bachelor of Arts in Cognitive Science
                          <br />
                          Certificate in Design Innovation
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Learning Column */}
                  <div className="flex-1 flex flex-col gap-px">
                    {/* Skills */}
                    <div className="pb-[24px]">
                      <div className="flex gap-[8px] items-center pb-[16px]">
                        <h3 className="text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]">
                          SKILLS
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Tools
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Figma, Lovable, Cursor, VS Code, Davinci Resolve
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Programming
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          HTML/CSS, JavaScript, React, Python
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Design
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Interaction Design, User Research, Design Systems, UX Strategy, Prototyping, Accessibility, Mobile UX
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Other
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Squatting 4 plates, Video Editing, Photography
                        </p>
                      </div>
                    </div>

                    {/* Learning */}
                    <div className="pb-[24px]">
                      <div className="flex gap-[8px] items-center pb-[16px]">
                        <h3 className="text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]">
                          LEARNING
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Motion
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Trying to learn how to use tools like Jitter and Rive. They'll be useful in creating moments of delights for users.
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Coding
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          I still feel the need to double down on learning more coding. AI makes it easier, but my understanding of coding systems/structure improves the outcomes when using AI.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Awards Column */}
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <div className="pb-[24px]">
                      <div className="flex gap-[8px] items-center pb-[16px]">
                        <h3 className="text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]">
                          AWARDS
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          Best Website Design
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          Top 3 site in Berkeley's web development course (120+ students)
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-[8px] pb-[16px]">
                        <h4 className="text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]">
                          The Fluegelman Bunnell Award
                        </h4>
                        <p className="text-body-1 text-fg-2 tracking-[0.16px]">
                          For overcoming adversity and contributing to community
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
    
    {/* Footer */}
    <Footer />
    </>
  );
};

export default About;
