import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import WorkCard from '@/components/WorkCard';
import StickyNavigation from '@/components/case-study/StickyNavigation';
import { useStickyNavigation } from '@/hooks/useStickyNavigation';
import ImageContainer from '@/components/case-study/ImageContainer';
import GifContainer from '@/components/case-study/GifContainer';
import SectionHeader from '@/components/case-study/SectionHeader';
import ProjectDetails from '@/components/case-study/ProjectDetails';
import BigCallout from '@/components/case-study/BigCallout';
import ContentSection from '@/components/case-study/ContentSection';
import TextBlock from '@/components/case-study/TextBlock';
import MetricCard from '@/components/case-study/MetricCard';
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
    videoSrc: "/assets/ioshome/fullflow-ioshome.mp4",
    caseStudyLink: "/case-study",
  },
  {
    title: "ThredUp Checkout",
    description:
      "Revamped the checkout process to significantly decrease the drop-off rate",
    videoSrc: "/assets/thredup/thredup-thumbnail.jpg",
    caseStudyLink: "/thredup-case-study",
  },
];

interface CopilotCanvasCaseStudyProps {
  currentProjectTitle?: string;
}

const CopilotCanvasCaseStudy = ({ currentProjectTitle = "Copilot on Canvas" }: CopilotCanvasCaseStudyProps) => {
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Filter out current project and get 2 others
  const otherProjects = projects
    .filter(project => project.title !== currentProjectTitle)
    .slice(0, 2);

  // Define sections for Copilot Canvas case study
  const copilotCanvasSections = [
    { id: 'problem', label: 'PROBLEM' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'insights', label: 'INSIGHTS' },
    { id: 'approach', label: 'APPROACH' },
    { id: 'solution', label: 'SOLUTION' },
    { id: 'impact', label: 'IMPACT' },
    { id: 'learnings', label: 'LEARNINGS' },
  ];

  // Use sticky navigation hook
  const { isNavVisible, activeSection, handleSectionClick } = useStickyNavigation();

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
                <p className="leading-[64px]">Crafted an engaging Copilot experience on OneNote Canvas, significantly boosting user adoption.</p>
              </div>
            </header>
            <ProjectDetails 
              role="Lead Designer"
              duration="May - June 2024"
              tools="Figma"
            />
          </div>

          {/* Hero Image */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <ImageContainer 
              src="/assets/copilotcanvas/copilotcanvas-header.png"
              alt="Copilot on Canvas header image"
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
              sections={copilotCanvasSections}
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
                    title="The Copilot experience on the side pane wasn't intuitive for users in adopting to their workflows"
                    content={`We had an integration on the side as a chat, but we heard from user feedback that it felt disconnected, and they had to find it to use it. We wanted to meet them where they're at - right on the canvas.
                              We wanted to create more value for users with AI. Capturing ideas, brainstorming, editing their content were things LLMs are good at. The side pane made it more cumbersome, we wanted to design an easier way for them to experience this value in their workflow.`}
                  />
                  <TextBlock 
                    title="From a business perspective, this was needed to help increase adoption of Copilot, thereby increasing paying customers"
                    content="Increase adoption of Copilot. If we helped people realize the value of AI in their workflow, it'll increase the chance of them using it, and paying for Copilot subscription, boosting the business of the product."
                  />
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Research Section */}
            <AnimatedSection delay={100}>
              <div id="research" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="RESEARCH" />
                <ContentSection>
                  <TextBlock 
                    title="Dedicated team of researchers, learning from users as we were building"
                    content="During the development of Copilot at Microsoft, our research team engaged with users regularly. After launching the Copilot features, they followed up with users to gather feedback, allowing product teams to make improvements."
                  />
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Insights Section */}
            <AnimatedSection delay={150}>
              <div id="insights" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="INSIGHTS" />
                <ContentSection>
                  <TextBlock 
                    title="Users perceived Copilot as a fragmented experience across Microsoft's productivity suite"
                    content="New users often struggle to find and adopt Copilot, and even experienced users may feel it doesn't integrate well within apps. The different ways to access Copilot across various applications make it hard to develop consistent usage habits."
                  />
                  
                  <ImageContainer 
                    src="/assets/copilotcanvas/copilotcanvas-research.png"
                    alt="Research insights visualization"
                    caption="IMAGE CAPTION"
                    adaptToImage={true}
                  />

                  <TextBlock 
                    title="Users wanted one place to find Copilot, and in places where they naturally work"
                    content="Users prefer a single, reliable entry point to access Copilot across all applications. Additionally, Copilot features should be seamlessly integrated into the places where users already work, rather than being presented as separate, generic options."
                  />

                  <BigCallout text="Improving Copilot adoption wasn't about adding more access points, but about strategically placing Copilot functionality within users' existing workflows" />
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Approach Section */}
            <AnimatedSection delay={100}>
              <div id="approach" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="APPROACH" />
                <ContentSection>
                  <TextBlock 
                    title="Participated in continual syncs with other product teams Word, Excel, Powerpoint and Outlook"
                    content={`This was a major effort amongst other product at Microsoft, like Word, Excel, Powerpoint. We need to make sure the experience was consistent for users across the board.

This meant a recurring sync with designers from those products. Where we gave feedback and showcased ideas we wanted to bring in.`}
                  />
                  <TextBlock 
                    title="Contributed and leveraged existing design system"
                    content="In order to tackle the challenges identified in our research, we aimed to develop a cohesive Copilot experience that spans all Microsoft 365 applications. To achieve this, we adhered to a comprehensive Copilot design system and collaborated closely with other team members to enhance and expand upon it."
                  />
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Solution Section */}
            <AnimatedSection delay={200}>
              <div id="solution" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="SOLUTION" />
                <ContentSection>
                  <TextBlock 
                    title="Draft from nothing"
                    content="During this project, ThredUP rebranded, so I focused on the new design system, incorporating feedback and creating two final iterations."
                  />
                  
                  <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
                    <video 
                      src="/assets/copilotcanvas/draft.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-[16px] w-full h-auto object-contain"
                    />
                    <div className="flex gap-2 items-center justify-center py-3 w-full">
                      <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                        <p className="leading-[18px]">DRAFT PROTOTYPE</p>
                      </div>
                    </div>
                  </div>

                  <TextBlock 
                    title="Rewrite any content on your canvas"
                    content="I added a feature where the app tells users what kind of card they are inputing right when they type the first number."
                  />
                  
                  <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
                    <video 
                      src="/assets/copilotcanvas/rewrite.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-[16px] w-full h-auto object-contain"
                    />
                    <div className="flex gap-2 items-center justify-center py-3 w-full">
                      <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                        <p className="leading-[18px]">REWRITE PROTOTYPE</p>
                      </div>
                    </div>
                  </div>

                  <TextBlock 
                    title="Summarize any content on your canvas"
                    content="Users will be able to know when they make a mistake while filling their information instead of waiting till the end, and having to everything all over again."
                  />
                  
                  <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
                    <video 
                      src="/assets/copilotcanvas/summary.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-[16px] w-full h-auto object-contain"
                    />
                    <div className="flex gap-2 items-center justify-center py-3 w-full">
                      <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
                        <p className="leading-[18px]">SUMMARY PROTOTYPE</p>
                      </div>
                    </div>
                  </div>
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Impact Section */}
            <AnimatedSection delay={250}>
              <div id="impact" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="IMPACT" />
                <ContentSection>
                  <TextBlock 
                    title="We saw a significant increase in Copilot adoption"
                    content="In a recent 14-day experiment involving 50% of our production users, we observed impressive results regarding the OneNote Copilot features. Specifically, there was a remarkable 36.95% increase in the number of OneNote users who were aware of these features, and an even more significant 68% increase in users who actively tried them out. Due to these strong gains, the team decided to move forward with a full 100% production rollout. As a result, the weekly active users (WAU) of OneNote Copilot surged fivefold, climbing from 11.1K to an impressive 69.8K by the end of FY25."
                  />
                  
                  {/* Metrics Container */}
                  <div className="flex gap-[60px] h-[130px] items-center px-0 py-2 relative shrink-0">
                    <MetricCard 
                      value="+37%"
                      label="USERS SAW COPILOT"
                    />
                    <MetricCard 
                      value="+68%"
                      label="USERS TRIED COPILOT"
                    />
                    <MetricCard 
                      value="+68K"
                      label="Weekly active users"
                    />
                  </div>
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Learnings Section */}
            <AnimatedSection delay={150}>
              <div id="learnings" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="LEARNINGS" />
                <ContentSection>
                  <TextBlock 
                    title="Dive deep into the technical aspects"
                    content="The biggest challenge was designing the payment method, considering ThredUP's business guidelines and payment companies. It was tough, but I found a solution that met all constraints."
                  />
                  <TextBlock 
                    title="Do more testing with users before implementation"
                    content="Shoot for a realistic prototype, if not settle for a dummy one. Something's better than nothing to learn from users."
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

export default CopilotCanvasCaseStudy;
