import { useState, useEffect } from "react";
import WorkCard from "./WorkCard";

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
];

// Define the grid layout: each sub-array is a row, containing indices of projects
const gridLayout = [
  [4, 6],
  [0],
  [3, 1], 
  [5,6],
];

const PortfolioGrid = () => {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    // Show grid at the same time as navbar (1.5 seconds delay)
    const timer = setTimeout(() => {
      setShowGrid(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] py-6 transition-all duration-1000 ease-out ${
        showGrid ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      data-oid="hvnhpbb"
    >
      <div className="w-full mx-auto" data-oid="r9c34h1">
        {gridLayout.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex flex-col ${row.length > 1 ? "lg:flex-row" : ""} gap-16 pb-16`}
            data-oid="nfr8ot2"
          >
            {row.map((projectIndex) => {
              // Special width handling for row with project 4 and 6
              let widthClass = "w-full";
              if (row.length > 1) {
                if (rowIndex === 0 && projectIndex === 4) {
                  // Project 4 takes 60% width
                  widthClass = "w-[60%]";
                } else if (rowIndex === 0 && projectIndex === 6) {
                  // Project 6 takes 40% width
                  widthClass = "w-[40%]";
                } else {
                  // Other multi-item rows use equal width
                  widthClass = "flex-1";
                }
              }
              
              return (
                <div
                  key={projectIndex}
                  className={widthClass}
                  data-oid="zf.jo65"
                >
                  <WorkCard {...projects[projectIndex]} data-oid="skt8sfd" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
