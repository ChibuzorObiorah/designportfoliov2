import { useState, useEffect } from "react";
import WorkCard from "./WorkCard";

const projects = [
  {
    title: "Shortcutter.io",
    description:
      "Built a game to help users master keyboard shortcuts through muscle memory, to make learning efficient, and fun.",
    videoSrc: "/assets/shortcutter/shortcutter-prototype.mp4",
    // caseStudyLink: "/shortcutter-case-study", // Disabled - page not ready
  },
  {
    title: "Tidy up for OneNote Canvas",
    description: "Designed a one-click feature to tidy up the OneNote canvas, to help users relaize value with AI with less effort.",
    videoSrc: "/assets/copilotcanvas/tidyup_prototype.mp4",
    // caseStudyLink: "/tidyup-case-study", // Disabled - page not ready
  },
  {
    title: "Upscale in Designer",
    description:
      "Designed anAI-powered image enhancement tool in one click - resulting in high engagement with users",
    videoSrc: "/assets/upscale/upscale-prototype.mp4",
    // caseStudyLink: "/upscale-case-study", // Disabled - page not ready
  },
  {
    title: "Copilot Scoping in OneNote",
    description: "Helping users understand the scope of LLMs in OneNote, increasing user adoption and satisfaction.",
    videoSrc: "/assets/copilotscoping/scopingUI.mp4",
    caseStudyLink: "/copilot-context",
  },
  {
    title: "Copilot on Canvas",
    description: "Crafted an engaging Copilot experience on OneNote Canvas, significantly boosting user adoption",
    videoSrc: "/assets/copilotcanvas/rewrite.mp4",
    caseStudyLink: "/copilot-canvas",
  },
  {
    title: "Visualis",
    description:
      "Built a web app that transforms written stories into visually consistent, cinematic image sequences using OpenAI API",
    videoSrc: "/assets/visualis/visualis-prototype.mp4",
    // caseStudyLink: "/visualis-case-study", // Disabled - page not ready
  },

  {
    title: "iOS Home in OneNote",
    description:
      "Designed the OneNote iOS app to make it easy for users to capture and retrieve notes faster, increasing usage and retention.",
    videoSrc: "/assets/ioshome/fullflow-ioshome.mp4",
    caseStudyLink: "/case-study",
  },
  {
    title: "ThredUp Checkout",
    description:
      "Revamped the checkout process for the Thredup appto significantly decrease the drop-off rate",
    videoSrc: "/assets/thredup/thredup-thumbnail.png",
    caseStudyLink: "/thredup-case-study",
  },
];

// Define the grid layout: each sub-array is a row, containing indices of projects
const gridLayout = [
  [4, 6],
  [7, 3],
  [5],
  [0, 1],
  [2],
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
          <div key={rowIndex}>
            {/* Add Reels header before the third row (index 2) */}
            {rowIndex === 2 && (
              <div className="w-full py-12">
                <div className="text-center">
                  <h2 className="font-rubik-mono-one text-[36px] text-fg-1 mb-2">
                    Reels
                  </h2>
                  <p className="text-caption-1 text-fg-2 uppercase">
                    CASE STUDIES COMING SOON
                  </p>
                </div>
              </div>
            )}
            
            <div
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
