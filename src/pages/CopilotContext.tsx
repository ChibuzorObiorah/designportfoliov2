import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import WorkCard from '@/components/WorkCard';
import StickyNavigation from '@/components/case-study/StickyNavigation';
import { useStickyNavigation } from '@/hooks/useStickyNavigation';
import ImageContainer from '@/components/case-study/ImageContainer';
import SectionHeader from '@/components/case-study/SectionHeader';
import ProjectDetails from '@/components/case-study/ProjectDetails';
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

interface CopilotContextProps {
  currentProjectTitle?: string;
}

const CopilotContext = ({ currentProjectTitle = "Copilot Scoping in OneNote" }: CopilotContextProps) => {
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Filter out current project and get 2 random others
  const otherProjects = projects
    .filter(project => project.title !== currentProjectTitle)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  // Define sections for Copilot Context case study - matching Figma design with 6 sections
  const copilotSections = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'problem', label: 'PROBLEM' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'insights', label: 'INSIGHTS' },
    { id: 'solution', label: 'SOLUTION' },
    { id: 'impact', label: 'IMPACT' },
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
              <div className="text-title-1 text-fg-1 font-ibm-plex-condensed font-semibold w-full">
                <p>Designed a feature to help users understand the scope of Copilot, influencing other product teams</p>
              </div>
            </header>
            <ProjectDetails 
              role="User Research Lead, Product Strategy"
              duration="2 months"
              tools="Figma, Playbook UX, PowerPoint"
            />
          </div>

          {/* Hero Image */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <ImageContainer 
              src="/assets/copilotscoping/copilotcontext-header.png"
              alt="Copilot Context case study header image"
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
              sections={copilotSections}
            />
          </div>

          {/* Right Content Area */}
          <div className="w-full">
            {/* Overview Section */}
            <AnimatedSection delay={200}>
              <div id="overview" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="OVERVIEW" />
              <ContentSection>
                <TextBlock 
                  title="Led research and design efforts to explore how users want to reference and interact with their notes through OneNote's AI-powered chat interface."
                  content={`Microsoft OneNote evolved to incorporate AI capabilities through Copilot integration. As part of this transformation, we needed to understand how users envision using AI in their note-taking workflow.

This project focused on conducting comprehensive user research to inform the design and development of how users want to reference and interact with their notes through OneNote's AI-powered chat interface.`}
                />
              </ContentSection>
              </div>
            </AnimatedSection>

            {/* Problem Section */}
            <AnimatedSection delay={150}>
              <div id="problem" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="PROBLEM" />
              <ContentSection>
                <TextBlock 
                  title="From our past research reports, we learned that users struggle with understanding the scope of Copilot in OneNote."
                  content={`Users want clarity on what portion of their OneNote content Copilot is reasoning over and the ability to change that scope to fit their needs.

Since this affects how users interact with AI features in their daily workflow, it became crucial to understand their mental models and expectations.`}
                />
                <BigCallout text="How might we help users understand and control what content Copilot can access in OneNote?" />
              </ContentSection>
              </div>
            </AnimatedSection>

            {/* Research Section - Combined with Findings */}
            <AnimatedSection delay={100}>
              <div id="research" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="RESEARCH" />
              <ContentSection>
                <TextBlock 
                  title="Conducted 60-minute moderated usability studies across 5 participants"
                  content="We conducted comprehensive user research to understand how users want to reference and interact with their notes through OneNote's AI-powered chat interface. I created 3 prototypes to validate different design approaches."
                />

                <TextBlock 
                  title="Prototype 1: Auto-scoping"
                  content="Automatically scoping Copilot's context based on users' prompt - letting the AI determine what content to reference."
                />

                <TextBlock 
                  title="Prototype 2: Manual scoping"
                  content="Using a dropdown menu to help users manually scope Copilot's context - giving users explicit control."
                />

                <TextBlock 
                  title="Prototype 3: File references"
                  content="Leveraged the existing UI for file references to help users reference external files - building on familiar patterns."
                />

                <ImageContainer 
                  src="/assets/copilotscoping/autoscope.mp4"
                  alt="Auto-scoping prototype video"
                  caption="PROTOTYPE 1: AUTO-SCOPING"
                  showCaption={false}
                />

                <ImageContainer 
                  src="/assets/copilotscoping/scopingUI.mp4"
                  alt="Manual scoping prototype video"
                  caption="PROTOTYPE 2: MANUAL SCOPING"
                  showCaption={false}
                />

                <ImageContainer 
                  src="/assets/copilotscoping/contextIQ.mp4"
                  alt="File references prototype video"
                  caption="PROTOTYPE 3: FILE REFERENCES"
                  showCaption={false}
                />
              </ContentSection>
              </div>
            </AnimatedSection>

            {/* Insights Section */}
            <AnimatedSection delay={180}>
              <div id="insights" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="INSIGHTS" />
              <ContentSection>
                <TextBlock 
                  title="4 out of 5 users preferred the dropdown menu for manual context control"
                  content="It was the clearest and most intuitive approach for users to understand and control what Copilot could access."
                />

                <TextBlock 
                  title="Users want automatic context but don't know how to reference it"
                  content="Users want Copilot to automatically add context based on their prompt, but were uncertain about how to reference their intended context in their prompt."
                />

                <TextBlock 
                  title="Default scope expectations varied"
                  content="Some users expected their default scope to be the current page, not the entire notebook, since that's the content they're actively viewing."
                />

                <TextBlock 
                  title="Existing file reference UI wasn't discoverable"
                  content="The existing UI for file references was not very discoverable and seemed complex for users in our research study."
                />

                <TextBlock 
                  title="Mental model mismatch"
                  content="Users had different mental models of OneNote's organizational hierarchy than our internal terminology, suggesting we needed to bridge this gap in our design."
                />
              </ContentSection>
              </div>
            </AnimatedSection>

            {/* Solution Section */}
            <AnimatedSection delay={220}>
              <div id="solution" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="SOLUTION" />
              <ContentSection>
                <TextBlock 
                  title="Designed a clear context selector that gives users control"
                  content="Based on our research findings, we designed a solution that balances automatic intelligence with user control, making it clear what content Copilot can access."
                />

                <BigCallout text="The solution gives users visibility and control over Copilot's scope while maintaining simplicity." />
              </ContentSection>
              </div>
            </AnimatedSection>

            {/* Impact Section - Combined with Reflection */}
            <AnimatedSection delay={160}>
              <div id="impact" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="IMPACT" />
              <ContentSection>
                <TextBlock 
                  title="Research findings influenced other Microsoft 365 products"
                  content="Our research findings were applicable to other products in the Microsoft 365 suite, like Word, Excel, and PowerPoint. We collaborated with other teams on arriving at a solution for Copilot solutions across all products."
                />

                <TextBlock 
                  title="Solving a core problem for AI chat interfaces"
                  content="This problem is fundamental for AI chat interfaces integrated into other products, because of the need for users to understand context and steer the AI system correctly. Today similar design patterns are used across different products like Cursor, ChatGPT etc."
                />

                <TextBlock 
                  title="Balance is key"
                  content="Finding the right balance between AI assistance and user control emerged as a crucial consideration. Users want AI to enhance their workflow without taking away their agency in the note-taking process."
                />

                <TextBlock 
                  title="Collaborate early and often"
                  content="To ensure alignment with other Microsoft teams and develop a consistent solution for all users, I learned the importance of early stakeholder involvement. This approach not only accelerated progress but also empowered team members by giving them a voice from the beginning."
                />
              </ContentSection>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* More Case Studies Section */}
        <AnimatedSection delay={120}>
          <div className="flex flex-col gap-9 items-start px-0 py-20 relative shrink-0 w-full">
            <div className="text-caption-1 text-fg-2 font-ibm-plex-mono w-full">
              <p>MORE CASE STUDIES</p>
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

export default CopilotContext;
