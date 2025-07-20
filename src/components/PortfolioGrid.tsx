import { useState, useEffect } from 'react';
import WorkCard from './WorkCard';

const PortfolioGrid = () => {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    // Show grid at the same time as navbar (1.5 seconds delay)
    const timer = setTimeout(() => {
      setShowGrid(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "Shortcutter.io",
      description: "Built a web app that transforms written stories into visually consistent, cinematic image sequences using OpenAI API",
      imageSrc: "/placeholder.svg",
      caseStudy: false
    },
    {
      title: "Visualis",
      description: "Built a game that helps users master keyboard shortcuts through muscle memory—designed to make learning efficient, and fun.",
      imageSrc: "/placeholder.svg",
      caseStudy: false
    },
    {
      title: "Upscale in Designer",
      description: "AI-powered image enhancement tool in one click - resulted in high engagement with users",
      imageSrc: "/placeholder.svg",
      caseStudy: true
    },
    {
      title: "iOS Home in OneNote",
      description: "Making it easy for users to capture and retrieve notes faster",
      imageSrc: "/placeholder.svg",
      caseStudy: true
    },
    {
      title: "Copilot on Canvas",
      description: "Integrated AI features in OneNote canvas",
      imageSrc: "/placeholder.svg",
      caseStudy: true
    },
    {
      title: "Copilot in OneNote",
      description: "Helping users understand the scope of LLMs in OneNote",
      imageSrc: "/placeholder.svg",
      caseStudy: true
    },
    {
      title: "Copilot on Canvas",
      description: "Integrated AI features in OneNote canvas",
      imageSrc: "/placeholder.svg",
      caseStudy: true
    }
  ];

  return (
    <section className={`w-full px-[60px] py-20 transition-all duration-1000 ease-out ${
      showGrid ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Row 1: 2 WorkCards */}
        <div className="flex flex-col lg:flex-row gap-16 pb-16">
          <div className="flex-1">
            <WorkCard {...projects[0]} />
          </div>
          <div className="flex-1">
            <WorkCard {...projects[1]} />
          </div>
        </div>

        {/* Row 2: 1 WorkCard (full width) */}
        <div className="flex gap-16 pb-16">
          <div className="w-full">
            <WorkCard {...projects[2]} />
          </div>
        </div>

        {/* Row 3: 2 WorkCards */}
        <div className="flex flex-col lg:flex-row gap-16 pb-16">
          <div className="flex-1">
            <WorkCard {...projects[3]} />
          </div>
          <div className="flex-1">
            <WorkCard {...projects[4]} />
          </div>
        </div>

        {/* Row 4: 2 WorkCards */}
        <div className="flex flex-col lg:flex-row gap-16 pb-16">
          <div className="flex-1">
            <WorkCard {...projects[5]} />
          </div>
          <div className="flex-1">
            <WorkCard {...projects[6]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;