import { useState, useEffect } from "react";
import WorkCard from "./WorkCard";

// All projects including those not ready yet
const allProjects = [
  {
    title: "Shortcutter.io",
    description:
      "Built a web app that transforms written stories into visually consistent, cinematic image sequences using OpenAI API",
    videoSrc: "/assets/shortcutter/shortcutter-prototype.mp4",
    // caseStudyLink: "/shortcutter-case-study", // Disabled - page not ready
  },
  {
    title: "Tidy up for OneNote Canvas",
    description: "Integrated AI features in OneNote canvas",
    videoSrc: "/assets/copilotcanvas/tidyup_prototype.mp4",
    // caseStudyLink: "/tidyup-case-study", // Disabled - page not ready
  },
  {
    title: "Upscale in Designer",
    description:
      "AI-powered image enhancement tool in one click - resulted in high engagement with users",
    videoSrc: "/assets/upscale/upscale-prototype.mp4",
    // caseStudyLink: "/upscale-case-study", // Disabled - page not ready
  },
  {
    title: "Copilot Scoping in OneNote",
    description: "Helping users understand the scope of LLMs in OneNote",
    videoSrc: "/assets/copilotscoping/scopingUI.mp4",
    caseStudyLink: "/copilot-context",
  },
  {
    title: "Copilot on Canvas",
    description: "Crafted an engaging Copilot experience on OneNote Canvas, significantly boosting user adoption",
    videoSrc: "/assets/copilotcanvas/rewrite_prototype.mp4",
    caseStudyLink: "/copilot-canvas",
  },
  {
    title: "Visualis",
    description:
      "Built a game that helps users master keyboard shortcuts through muscle memory—designed to make learning efficient, and fun.",
    videoSrc: "/assets/visualis/visualis-prototype.mp4",
    // caseStudyLink: "/visualis-case-study", // Disabled - page not ready
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
    videoSrc: "/assets/thredup/thredup-thumbnail.png",
    caseStudyLink: "/thredup-case-study",
  },
];

// Filter to only show projects that have case study pages ready
const projects = allProjects.filter(project => project.caseStudyLink);

// Define the grid layout for the filtered projects (only clickable ones)
// Current clickable projects: Copilot Canvas, iOS Home, ThredUp, Copilot Scoping
const gridLayout = [
  [0, 2], // Copilot on Canvas, iOS Home
  [3, 1], // ThredUp, Copilot Scoping
];

const PortfolioGrid = () => {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    // Show grid with reduced delay for better responsiveness
    const timer = setTimeout(() => {
      setShowGrid(true);
    }, 800);

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
            className={`flex flex-col ${row.length > 1 ? "lg:flex-row" : ""} gap-12 pb-16`}
            data-oid="nfr8ot2"
          >
            {row.map((projectIndex) => {
              // Special width handling for specific rows
              let widthClass = "w-full";
              if (row.length > 1) {
                if (rowIndex === 0 && projectIndex === 4) {
                  // Project 4 takes 60% width
                  widthClass = "w-[60%]";
                } else if (rowIndex === 0 && projectIndex === 6) {
                  // Project 6 takes 40% width
                  widthClass = "w-[40%]";
                } else if (rowIndex === 1 && projectIndex === 7) {
                  // Project 7 takes 40% width
                  widthClass = "w-[40%]";
                } else if (rowIndex === 1 && projectIndex === 3) {
                  // Project 3 takes 60% width
                  widthClass = "w-[60%]";
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
