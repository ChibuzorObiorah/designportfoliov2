import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import WorkCard from '@/components/WorkCard';
import StickyNavigation from '@/components/case-study/StickyNavigation';
import { useStickyNavigation } from '@/hooks/useStickyNavigation';
import ImageContainer from '@/components/case-study/ImageContainer';
import SectionHeader from '@/components/case-study/SectionHeader';
import ProjectDetails from '@/components/case-study/ProjectDetails';
import MetricCard from '@/components/case-study/MetricCard';
import QuoteCard from '@/components/case-study/QuoteCard';
import BigCallout from '@/components/case-study/BigCallout';
import ContentSection from '@/components/case-study/ContentSection';
import TextBlock from '@/components/case-study/TextBlock';
import AnimatedSection from '@/components/case-study/AnimatedSection';

// Projects data - same as in WorkGrid.tsx
const projects = [
  {
    title: "Shortcutter.io",
    description:
      "Built a web app that transforms written stories into visually consistent, cinematic image sequences using OpenAI API",
    videoSrc: "/assets/shortcutter/shortcutter_prototype.mp4",
    caseStudyLink: "/shortcutter-case-study",
  },
  {
    title: "Tidy up for OneNote Canvas",
    description: "Integrated AI features in OneNote canvas",
    videoSrc: "/assets/copilotcanvas/tidyup_prototype.mp4",
    caseStudyLink: "/tidyup-case-study",
  },
  {
    title: "Upscale in Designer",
    description:
      "AI-powered image enhancement tool in one click - resulted in high engagement with users",
    videoSrc: "/assets/upscale/upscale_prototype.mp4",
    caseStudyLink: "/upscale-case-study",
  },
  {
    title: "Copilot Scoping in OneNote",
    description: "Helping users understand the scope of LLMs in OneNote",
    videoSrc: "/assets/copilotscoping/scopingUI.mp4",
    caseStudyLink: "/copilot-context",
  },
  {
    title: "Copilot on Canvas",
    description: "Integrated AI features in OneNote canvas",
    videoSrc: "/assets/copilotcanvas/rewrite_prototype.mp4",
    caseStudyLink: "/copilot-canvas-case-study",
  },
  {
    title: "Visualis",
    description:
      "Built a game that helps users master keyboard shortcuts through muscle memory—designed to make learning efficient, and fun.",
    videoSrc: "/assets/visualis/visualis-prototype.mp4",
    caseStudyLink: "/visualis-case-study",
  },
  {
    title: "iOS Home in OneNote",
    description:
      "Making it easy for users to capture and retrieve notes faster",
    videoSrc: "/assets/ioshome/placeholder.mp4",
    caseStudyLink: "/case-study",
  },
];

interface IOSHomeCaseStudyProps {
  currentProjectTitle?: string;
}

const IOSHomeCaseStudy = ({ currentProjectTitle = "iOS Home in OneNote" }: IOSHomeCaseStudyProps) => {
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Filter out current project and get 2 others
  const otherProjects = projects
    .filter(project => project.title !== currentProjectTitle)
    .slice(0, 2);

  // Define sections for iOS Home case study
  const iosHomeSections = [
    { id: 'problem', label: 'PROBLEM' },
    { id: 'solution', label: 'SOLUTION' },
    { id: 'impact', label: 'IMPACT' },
    { id: 'approach', label: 'APPROACH' },
    { id: 'challenges', label: 'CHALLENGES' },
    { id: 'experiment', label: 'EXPERIMENT' },
    { id: 'learnings', label: 'LEARNINGS' },
  ];

  // Use sticky navigation hook
  const { isNavVisible, activeSection, handleSectionClick } = useStickyNavigation();
  
  console.log('IOSHomeCaseStudy state:', { isNavVisible, activeSection });

  // Page entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Main Content Container */}
      <div className="flex flex-col items-center px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] py-0 w-full max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div id="hero-section" className="flex flex-col items-start relative shrink-0 w-full">
          {/* Title and Details */}
          <div className="flex flex-col items-start justify-center pb-3 pt-20 px-0 relative shrink-0 w-full">
            <header className="flex flex-col gap-5 items-start max-w-[1500px] overflow-visible py-0 relative shrink-0 w-full">
              <div className="bg-clip-text bg-gradient-to-b font-['IBM_Plex_Sans_Condensed'] font-semibold from-[#f5f5f5] text-[48px] to-[#fafafa] w-full [&]:text-transparent">
                <p className="leading-[64px]">Designed a new Home for the iOS app in OneNote, leading to an increase in usage retention</p>
              </div>
            </header>
            <ProjectDetails />
          </div>

          {/* Hero Image */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <ImageContainer 
              src="/assets/ioshome/ioshome-header-img.png"
              alt="iOS Home in OneNote header image"
              adaptToImage={true}
            />
          </div>
        </div>

        {/* Body Container with Grid Layout */}
        <div className="grid grid-cols-[309px_1fr] gap-2 w-full">
          {/* Left Navigation Panel - Always Present */}
          <div className="relative">
            <StickyNavigation 
              isVisible={isNavVisible}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
              sections={iosHomeSections}
            />
          </div>

          {/* Right Content Area */}
          <div className="w-full">
          {/* Problem Section */}
          <AnimatedSection delay={200}>
            <div id="problem" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="PROBLEM" />
              <ContentSection>
                <TextBlock 
                  title="OneNote's notebook structure is neat on desktop, but on mobile, it becomes a scavenger hunt."
                  content={`Need your grocery list or a note during a meeting? Digging through layers wastes time. Search helps if you remember how you saved notes. 

Jotting down ideas isn't easy; users face decisions on note placement, slowing them down. We found people want to capture thoughts quickly, but our rigid structure hinders this, especially on mobile.`}
                />
                <TextBlock 
                  title="Make mobile note-taking delightful, encouraging users to stay, boosting usage and retention."
                  content={`Need your grocery list or a note during a meeting? Digging through layers wastes time. Search helps if you remember how you saved notes. 

Jotting down ideas isn't easy; users face decisions on note placement, slowing them down. We found people want to capture thoughts quickly, but our rigid structure hinders this, especially on mobile.`}
                />
                <BigCallout text="How might we help users quickly capture their ideas and easily find their notes?" />
              </ContentSection>
            </div>
          </AnimatedSection>

          {/* Solution Section */}
          <AnimatedSection delay={150}>
            <div id="solution" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="SOLUTION" />
              <ContentSection>
                <TextBlock 
                  title="A new Home"
                  content="We introduced a new feature called Home, where you can view all your notes and easily create a new one with a single button."
                />
              </ContentSection>
            </div>
          </AnimatedSection>

          {/* Solution Video */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <video 
              src="/assets/ioshome/homeview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-[16px] w-full h-auto object-contain"
            />
            <div className="flex gap-2 items-center justify-center py-3 w-full">
              <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                <p className="leading-[18px]">Grid and List views</p>
              </div>
            </div>
          </div>

          {/* Filter Video */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <video 
              src="/assets/ioshome/filterview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-[16px] w-full h-auto object-contain"
            />
            <div className="flex gap-2 items-center justify-center py-3 w-full">
              <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                <p className="leading-[18px]">Filter & Sort</p>
              </div>
            </div>
          </div>

          {/* Capture Video */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <video 
              src="/assets/ioshome/captureview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-[16px] w-full h-auto object-contain"
            />
            <div className="flex gap-2 items-center justify-center py-3 w-full">
              <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                <p className="leading-[18px]">Quick Capture</p>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <AnimatedSection delay={250}>
            <div id="impact" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="IMPACT" />
              <ContentSection>
                <div className="flex gap-[60px] items-center px-0 py-2 relative shrink-0 w-full">
                  <MetricCard label="STICKY NOTE USAGE" value="+48%" />
                  <MetricCard label="PAGE CREATION" value="+12%" />
                  <MetricCard label="2-DAY RETENTION" value="+3%" />
                </div>
              </ContentSection>
            </div>
          </AnimatedSection>

          {/* Approach Section */}
          <AnimatedSection delay={100}>
            <div id="approach" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="APPROACH" />
              <ContentSection>
                <TextBlock 
                  title="Explored existing solutions tackling this problems"
                  content="We designed a new feature called, Home to help people see all their notes, and helping them quickly creating a new note."
                />
                <ImageContainer 
                  src="/assets/ioshome/ioshome-research.png"
                  alt="Research on existing solutions"
                  adaptToImage={true}
                />
              </ContentSection>
            </div>
          </AnimatedSection>

          {/* Challenges Section */}
          <AnimatedSection delay={180}>
            <div id="challenges" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="CHALLENGES" />
              <ContentSection>
                <TextBlock 
                  title="Users created notes with multiple modalities and we wanted to make this available to them from the Home tab"
                  content={`The common usage of our mobile app revolves around creating a task list. We explored different modalities for capturing ideas, including audio, camera, and keyboard, to ensure users could choose their preferred method from the Home tab.

Our goal was to provide a quick capture solution while keeping other options easily discoverable. We aimed to design a seamless experience that would prevent any drop-off due to these changes.`}
                />
              <div className="flex flex-col gap-2 items-center justify-center py-6 w-full">
                <video 
                  src="/assets/ioshome/1-fab.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-[16px] w-full h-auto object-contain"
                />
                <div className="flex gap-2 items-center justify-center py-3 w-full">
                  <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                    <p className="leading-[18px]">Iteration 1: FAB button</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center py-6 w-full">
                <video 
                  src="/assets/ioshome/2-splitbutton.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-[16px] w-full h-auto object-contain"
                />
                <div className="flex gap-2 items-center justify-center py-3 w-full">
                  <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                    <p className="leading-[18px]">Iteration 2: Split Button</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center py-6 w-full">
                <video 
                  src="/assets/ioshome/3-halfsheet.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-[16px] w-full h-auto object-contain"
                />
                <div className="flex gap-2 items-center justify-center py-3 w-full">
                  <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                    <p className="leading-[18px]">Iteration 3: Half sheet</p>
                  </div>
                </div>
              </div>
            </ContentSection>
          </div>
          </AnimatedSection>

          {/* Experiment Section */}
          <AnimatedSection delay={120}>
            <div id="experiment" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="EXPERIMENT" />
              <ContentSection>
                <TextBlock 
                  title="We conducted A/B/n experiment with four treatments"
                  content="The experiment was done to help understand the most effective design that'll help us improve user engagement and retention."
                />
              </ContentSection>
            </div>
          </AnimatedSection>

          {/* Experiment Image */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <ImageContainer 
              src="/assets/ioshome/ioshome-experiment.png"
              alt="Experiment display"
              caption="DISPLAY OF EXPERIMENTS"
              adaptToImage={true}
            />
          </div>

          {/* Experiment Results */}
          <div className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
            <ContentSection>
              <TextBlock 
                title="Treatment 3 delivered the strongest results"
                content="Treatment 3 - where we used the FAB button and defaulted users back to the Home page resulted the highest increase in page creation, 2-day retention and Sticky Note usage. Booting users into the Home view improves access to relevant content and encourages note creation."
              />
            </ContentSection>
          </div>

          {/* Final Impact Section */}
          <div className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
            <SectionHeader title="IMPACT" />
            <ContentSection>
              <div className="flex gap-11 items-stretch pb-6 pt-8 px-0 relative shrink-0 w-full">
                <QuoteCard 
                  quote="This was a rare set of experiment where all the treatments produced positive results! Selecting the best overall performing treatment required deeper analysis of key metrics. Congratulations to the iOS crew for following an experimentation mindset from start to finish on this work and doing a great job!"
                  author="Engineering leadership"
                  className="flex-1"
                />
                <QuoteCard 
                  quote="Kudos to the iOS crew for all the work to get here and for pushing on our PLG culture by using experiments to have the data tell us which treatment was best."
                  author="Product leadership"
                  className="flex-1"
                />
              </div>
              <div className="flex gap-[60px] h-[130px] items-center px-0 py-2 relative shrink-0 w-auto">
                <MetricCard label="STICKY NOTE USAGE" value="+48%" />
                <MetricCard label="PAGE CREATION" value="+12%" />
                <MetricCard label="2-DAY RENTENTION" value="+3%" />
              </div>
            </ContentSection>
          </div>

          {/* Learnings Section */}
          <AnimatedSection delay={160}>
            <div id="learnings" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="LEARNINGS" />
              <ContentSection>
                <TextBlock 
                  title="Think in systems as you design helps teams move faster"
                  content="On the technical side, I made sure to build reusable components as I designed, fitting everything into the larger system. This approach not only sped up development, but also set us up nicely for future updates."
                />
                <TextBlock 
                  title="Consistent design across platforms benefits from parallel work."
                  content="Design choices were influenced by the Android team, leaving me feeling boxed in. I wanted to innovate for iOS but had to follow existing decisions. Collaboration between teams is essential for consistency, and I could've advocated more for user-backed ideas."
                />
              </ContentSection>
            </div>
          </AnimatedSection>
          </div>
        </div>

        {/* More Case Studies Section */}
        <AnimatedSection delay={100}>
          <div className="flex flex-col gap-9 items-start px-0 py-20 relative shrink-0 w-full">
            <div className="font-['IBM_Plex_Mono'] font-semibold text-fg-2 text-[14px] tracking-[-0.28px] w-full">
              <p className="leading-[normal]">MORE CASE STUDIES</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-16 items-start w-full">
              {otherProjects.map((project, index) => (
                <div key={index} className="flex-1 w-full">
                  <WorkCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Use existing Footer component */}
      <Footer />
    </div>
  );
};

export default IOSHomeCaseStudy;
