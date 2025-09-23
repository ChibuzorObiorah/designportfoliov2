import { useState, useEffect } from "react";
import WorkCard from "./WorkCard";

const projects = [
  {
    title: "Shortcutter.io",
    description:
      "Built a web app that transforms written stories into visually consistent, cinematic image sequences using OpenAI API",
    videoSrc: "/videos/shortcutter/shortcutter_prototype.mp4",
    caseStudy: false,
  },
  {
    title: "Tidy up for OneNote Canvas",
    description: "Integrated AI features in OneNote canvas",
    videoSrc: "/videos/copilotcanvas/tidyup_prototype.mp4",
    caseStudy: false,
  },
  {
    title: "Upscale in Designer",
    description:
      "AI-powered image enhancement tool in one click - resulted in high engagement with users",
    videoSrc: "/videos/upscale/upscale_prototype.mp4",
    caseStudy: false,
  },
  {
    title: "Copilot Scoping in OneNote",
    description: "Helping users understand the scope of LLMs in OneNote",
    videoSrc: "/videos/copilotscoping/scopingUI.mp4",
    caseStudy: true,
    caseStudyLink: "/copilot-context",
  },
  {
    title: "Copilot on Canvas",
    description: "Integrated AI features in OneNote canvas",
    videoSrc: "/videos/copilotcanvas/rewrite_prototype.mp4",
    caseStudy: false,
  },
  {
    title: "Visualis",
    description:
      "Built a game that helps users master keyboard shortcuts through muscle memory—designed to make learning efficient, and fun.",
    videoSrc: "/videos/visualis/visualis-prototype.mp4",
    caseStudy: false,
  },
  {
    title: "iOS Home in OneNote",
    description:
      "Making it easy for users to capture and retrieve notes faster",
    videoSrc: "/videos/ioshome/placeholder.mp4",
    caseStudy: false,
  },
];

// Define the grid layout: each sub-array is a row, containing indices of projects
const gridLayout = [
  [0, 1],
  [4],
  [3, 1], 
  [5],
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
            {row.map((projectIndex) => (
              <div
                key={projectIndex}
                className={row.length > 1 ? "flex-1" : "w-full"}
                data-oid="zf.jo65"
              >
                <WorkCard {...projects[projectIndex]} data-oid="skt8sfd" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
