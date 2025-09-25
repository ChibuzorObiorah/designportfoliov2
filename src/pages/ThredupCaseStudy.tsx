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

interface ThredupCaseStudyProps {
  currentProjectTitle?: string;
}

const ThredupCaseStudy = ({ currentProjectTitle = "ThredUp Checkout" }: ThredupCaseStudyProps) => {
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Filter out current project and get 2 random others
  const otherProjects = projects
    .filter(project => project.title !== currentProjectTitle)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  // Define sections for ThredUp case study
  const thredupSections = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'problem', label: 'PROBLEM' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'insights', label: 'INSIGHTS' },
    { id: 'ideation', label: 'IDEATION' },
    { id: 'solution', label: 'SOLUTION' },
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
                <p className="leading-[64px]">Revamped the checkout process in ThredUp's app to significantly decrease the drop-off rate.</p>
              </div>
            </header>
            <ProjectDetails 
              role="Lead Designer"
              duration="1 month"
              tools="Figma"
            />
          </div>

          {/* Hero Image */}
          <div className="flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full">
            <ImageContainer 
              src="/assets/thredup/thredup-header-img.jpg"
              alt="ThredUp checkout redesign header image"
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
              sections={thredupSections}
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
                    title="I interned as a designer at ThredUp, the biggest online thrift store, where I experienced a significant rebranding effort."
                    content={`ThredUP is the largest fashion resale marketplace for secondhand clothing. As a product design intern, I worked with the team on their native app, focusing on improving the checkout experience.

My experience encompasses product thinking, research, visual design, and prototyping. This was my inaugural project as a company employee, and I learned immensely from the guidance of my manager, Sarah.`}
                  />
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Problem Section */}
            <AnimatedSection delay={100}>
              <div id="problem" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="PROBLEM" />
                <ContentSection>
                  <TextBlock 
                    title="There was a 68% drop-off rate from the cart page to the checkout page, and a 20% more before users placed orders"
                    content={`On the ThredUp native app, there was a 68% drop-off rate from the cart page to the checkout page, and even a 20% more drop-off rate from the checkout page to users placing an order.

Since the checkout funnel is an important part of the ThredUp business, we wanted to see if we could reduce the drop-off rate by optimizing the design.`}
                  />
                  <BigCallout text="How might we simplify the checkout process and reduce the drop-off rate?" />
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Research Section */}
            <div id="research" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="RESEARCH" />
              <ContentSection>
                <TextBlock 
                  title="Conducted secondary research by doing a deep study of e-commerce"
                  content="To tackle this problem, I conducted some secondary research, reading through a bunch of articles to understand what makes a good checkout experience, and what made it stand out. One of the things that stood out right to me was:"
                />
                <BigCallout text="69.23% of all e-commerce visitors abandon their shopping carts" />
                
                <ImageContainer 
                  src="/assets/thredup/sec-research.png"
                  alt="Secondary research findings"
                  caption="SECONDARY RESEARCH INSIGHTS"
                  adaptToImage={true}
                />

                <TextBlock 
                  title="Market research"
                  content="In order to construct a concise and solid foundation for ThredUP's checkout flow, I ventured to see out to see what the other e-commerce platforms were doing well in their checkout process."
                />
                
                <ImageContainer 
                  src="/assets/thredup/market-research.png"
                  alt="Market research analysis"
                  caption="ANALYSIS OF WELL KNOWN E-COMMERCE CHECKOUT EXPERIENCES"
                  adaptToImage={true}
                />
              </ContentSection>
            </div>

            {/* Insights Section */}
            <div id="insights" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="INSIGHTS" />
              <ContentSection>
                <TextBlock 
                  title="People want to see the checkout steps and progress ahead of time."
                  content=""
                />
                <TextBlock 
                  title="A good checkout flow is clear, showing users the extra costs."
                  content=""
                />
                <TextBlock 
                  title="Reducing frustrations and making it intuitive helps users complete checkout faster."
                  content=""
                />
                <TextBlock 
                  title="Helping users through checkout speeds their progress."
                  content=""
                />
              </ContentSection>
            </div>

            {/* Ideation Section */}
            <div id="ideation" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="IDEATION" />
              <ContentSection>
                <TextBlock 
                  title="Bringing everything to life"
                  content={`After research, I brainstormed ideas to improve the checkout experience, including new features like the ability to scan credit card, offering guest checkout, inline validation for credit cards, e.t.c.

Taking into some business considerations and technical limitations, I moved on to bringing some of these ideas to life.`}
                />

                <TextBlock 
                  title="Lo-fi sketching"
                  content="Before moving on, I wanted to get a feel for what the new checkout flow could be. I was exploring between having all the steps displayed in one page and the steps laid out on a half-sheet."
                />
                
                <ImageContainer 
                  src="/assets/thredup/lofi-sketch.png"
                  alt="Lo-fi sketches"
                  caption="LO-FI SKETCHES"
                  adaptToImage={true}
                />

                <TextBlock 
                  title="Iterated through feedback"
                  content="I created three mockup iterations for the new checkout flow. Feedback highlighted the need to consider new and returning users. The half-sheet was ineffective for new users, while the third iteration provided clear step-by-step guidance."
                />
                
                <ImageContainer 
                  src="/assets/thredup/iterations-feedback.jpg"
                  alt="Iteration feedback"
                  caption="ITERATIONS BASED ON FEEDBACK"
                  adaptToImage={true}
                />
              </ContentSection>
            </div>

            {/* Solution Section */}
            <AnimatedSection delay={200}>
              <div id="solution" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
                <SectionHeader title="SOLUTION" />
                <ContentSection>
                  <TextBlock 
                    title="Adjusted to fit ThredUp's rebrand"
                    content="During this project, ThredUP rebranded, so I focused on the new design system, incorporating feedback and creating two final iterations."
                  />
                  
                  <ImageContainer 
                    src="/assets/thredup/rebranded-versions.png"
                    alt="Rebranded versions"
                    caption="REBRANDED CHECKOUT ITERATIONS"
                    adaptToImage={true}
                  />

                  <TextBlock 
                    title="Paid attention to the smallest interactions to provide delight for users and ease frustrations common in the checkout flows"
                    content="To achieve our Checkout goal, I analyzed all interactions, from validations to button clicks. I created a prototype to visualize these interactions."
                  />

                  <TextBlock 
                    title="Credit card inline validation"
                    content="I added a feature where the app tells users what kind of card they are inputing right when they type the first number."
                  />
                  
                  <GifContainer 
                    src="/assets/thredup/card-validation.gif"
                    alt="Card validation"
                    caption="INLINE CREDIT CARD VALIDATION"
                  />

                  <TextBlock 
                    title="Handling errors on the go"
                    content="Users will be able to know when they make a mistake while filling their information instead of waiting till the end, and having to everything all over again."
                  />
                  
                  <GifContainer 
                    src="/assets/thredup/inline-validation.gif"
                    alt="Inline validation"
                    caption="REAL-TIME ERROR VALIDATION"
                  />

                  <TextBlock 
                    title="Tooltips to help educate users"
                    content="Redesigned the tooltips to give users better information of what is required of them as they are filling out the forms."
                  />
                  
                  <GifContainer 
                    src="/assets/thredup/tooltip.gif"
                    alt="Tooltip design"
                    caption="HELPFUL TOOLTIPS"
                  />

                  <TextBlock 
                    title="Highlighted the promo code"
                    content="The promo code was previously hidden. It incentivizes purchases, so I emphasized it more than before."
                  />
                  
                  <GifContainer 
                    src="/assets/thredup/promo-code.gif"
                    alt="Promo code feature"
                    caption="PROMINENT PROMO CODE FIELD"
                  />

                  <TextBlock 
                    title="Order confirmation page"
                    content="I found a great oppurtunity here to add elements of the rebrand, giving users an exciting confirmation notice when they place their order and gives them option to keep navigating through the app."
                  />
                  
                  <GifContainer 
                    src="/assets/thredup/order-completed.gif"
                    alt="Order confirmation"
                    caption="DELIGHTFUL ORDER CONFIRMATION"
                  />

                  <ImageContainer 
                    src="/assets/thredup/thredup-final-img.jpg"
                    alt="Final solution"
                    caption="FINAL CHECKOUT SOLUTION"
                    adaptToImage={true}
                  />
                </ContentSection>
              </div>
            </AnimatedSection>

            {/* Learnings Section */}
            <div id="learnings" className="flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full">
              <SectionHeader title="LEARNINGS" />
              <ContentSection>
                <TextBlock 
                  title="Design needs to co-operate with business"
                  content="The biggest challenge was designing the payment method, considering ThredUP's business guidelines and payment companies. It was tough, but I found a solution that met all constraints."
                />
                <TextBlock 
                  title="Data empowers design"
                  content="This project arose from data on the checkout flow. We aim to create impactful products, and data helps us identify needed improvements. They inform us about user interactions. I wish I had more time to test my designs, but ThredUP will test them before public rollout."
                />
              </ContentSection>
            </div>
          </div>
        </div>

        {/* More Case Studies Section */}
        <AnimatedSection delay={150}>
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

export default ThredupCaseStudy;
