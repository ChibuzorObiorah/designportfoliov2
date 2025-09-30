export interface Project {
  title: string;
  description: string;
  videoSrc: string;
  caseStudyLink?: string;
}

// All projects - used on home page
export const allProjects: Project[] = [
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
    title: "Upscale in Copilot",
    description:
      "Designed an AI-powered image enhancement tool in one click, resulting in high engagement with users",
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

// Only projects with working case study links - used in case study pages
export const projectsWithCaseStudies: Project[] = allProjects.filter(
  project => project.caseStudyLink
);

// Get other projects for case study pages (excludes current project, only shows projects with case studies)
export const getOtherCaseStudyProjects = (currentProjectTitle: string, limit: number = 2): Project[] => {
  return projectsWithCaseStudies
    .filter(project => project.title !== currentProjectTitle)
    .slice(0, limit);
};

