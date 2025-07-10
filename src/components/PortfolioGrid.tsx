import PortfolioCard from './PortfolioCard';

const PortfolioGrid = () => {
  const projects = [
    {
      title: "Hypermedia UI",
      description: "A dynamic interface system built with modern web technologies. Focusing on responsive design and user interaction patterns.",
      tags: "React, TypeScript",
      height: "medium" as const
    },
    {
      title: "Visuals",
      description: "Creative direction and visual design for various digital projects. Emphasizing clean aesthetics and brand consistency.",
      tags: "Design, Branding",
      height: "small" as const
    },
    {
      title: "Upgrade to Designer",
      description: "A comprehensive design system and toolkit for modern web applications. Built with scalability and accessibility in mind.",
      tags: "Design System, UI/UX",
      height: "large" as const
    },
    {
      title: "UI5 Items in Codebase",
      description: "Implementation of UI5 components within existing codebase architecture. Focusing on seamless integration and performance.",
      tags: "UI5, Integration",
      height: "small" as const
    },
    {
      title: "Capital on Canvas",
      description: "Digital art platform connecting artists with collectors. Built with focus on user experience and marketplace functionality.",
      tags: "Web App, E-commerce",
      height: "medium" as const
    },
    {
      title: "Contact to Continue",
      description: "Communication platform designed for seamless collaboration. Emphasizing real-time features and user engagement.",
      tags: "Communication, Real-time",
      height: "small" as const
    },
    {
      title: "Capital on Canvas",
      description: "Extended features and mobile optimization for the digital art marketplace. Enhanced user experience across all devices.",
      tags: "Mobile, UX",
      height: "medium" as const
    }
  ];

  return (
    <section className="w-full px-6 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8">
            <PortfolioCard {...projects[0]} />
            <PortfolioCard {...projects[3]} />
            <PortfolioCard {...projects[5]} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">
            <PortfolioCard {...projects[1]} />
            <PortfolioCard {...projects[2]} />
            <PortfolioCard {...projects[4]} />
            <PortfolioCard {...projects[6]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;