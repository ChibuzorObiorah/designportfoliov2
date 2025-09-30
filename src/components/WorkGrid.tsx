import { useState, useEffect } from "react";
import WorkCard from "./WorkCard";
import { allProjects } from "@/data/projects";

// Define the grid layout: each sub-array is a row, containing indices of projects
const gridLayout = [
  [4, 6],
  [7, 3],
  [2, 0],
  [1, 5],
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
      className={`w-full px-[56px] sm:px-[72px] md:px-[88px] lg:px-[100px] py-6 transition-all duration-1000 ease-out ${
        showGrid ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      data-oid="hvnhpbb"
    >
      <div className="w-full max-w-[1400px] mx-auto" data-oid="r9c34h1">
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
                  } else if (rowIndex === 2 && projectIndex === 5) {
                    // Project 5 takes 60% width
                    widthClass = "w-[60%]";
                  } else if (rowIndex === 2 && projectIndex === 0) {
                    // Project 0 takes 40% width
                    widthClass = "w-[40%]";
                  } else if (rowIndex === 3 && projectIndex === 2) {
                    // Project 2 takes 60% width
                    widthClass = "w-[60%]";
                  } else if (rowIndex === 3 && projectIndex === 1) {
                    // Project 1 takes 40% width
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
                    <WorkCard {...allProjects[projectIndex]} data-oid="skt8sfd" />
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
