import React from "react";

const CopilotContext: React.FC = () => {
  return (
    <div
      className="min-h-screen px-4 py-8 md:px-32 lg:px-64"
      style={{ background: "var(--BG-1)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--FG-1)" }}
        >
          OneNote Copilot Context
        </h1>
        {/* Placeholder for header image */}
        <div
          className="w-full h-48 bg-gray-200 rounded mb-8 flex items-center justify-center"
          style={{ color: "var(--FG-2)" }}
        >
          (Header image placeholder)
        </div>
        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Led research and design efforts to explore how users want to
            reference and interact with their notes through OneNote's AI-powered
            chat interface.
          </h2>
          <p className="mb-2" style={{ color: "var(--FG-2)" }}>
            <strong>My Role:</strong> User Research Lead, Product Strategy,
            Feature Prioritization
            <br />
            Led research planning, execution, and analysis to inform product
            direction
            <br />
            <strong>Timeline:</strong> June - July 2024
            <br />
            <strong>Tools:</strong> Figma, Playbook UX, PowerPoint
            <br />
            <strong>Team:</strong> Bea Villanueva, Product Manager, and a group
            of engineers.
          </p>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Overview
          </h2>
          <p className="mb-2" style={{ color: "var(--FG-1)" }}>
            Microsoft OneNote evolved to incorporate AI capabilities through
            Copilot integration. As part of this transformation, we needed to
            understand how users envision using AI in their note-taking
            workflow. This project focused on conducting comprehensive user
            research to inform the design and development of how users want to
            reference and interact with their notes through OneNote's AI-powered
            chat interface.
          </p>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Problem
          </h2>
          <p className="mb-2" style={{ color: "var(--FG-1)" }}>
            From our past research reports, we learned that users struggle with
            understanding the scope of Copilot in OneNote. Users want clarity on
            what portion of their OneNote content Copilot is reasoning over and
            the ability to change that scope to fit their needs.
          </p>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Research
          </h2>
          <p className="mb-2" style={{ color: "var(--FG-1)" }}>
            We conducted 60-minute moderated usability studies across 5
            participants to understand how users want to reference and interact
            with their notes through OneNote's AI-powered chat interface. I
            created 3 prototypes to validate designs.
          </p>
          <ul className="list-disc pl-6 mb-2" style={{ color: "var(--FG-1)" }}>
            <li className="mb-1">
              <strong>Prototype 1:</strong> Automatically scoping Copilot's
              context based on users' prompt.
            </li>
            <li className="mb-1">
              <strong>Prototype 2:</strong> Using a dropdown menu to help users
              manually scope Copilot's context.
            </li>
            <li className="mb-1">
              <strong>Prototype 3:</strong> Leveraged the existing UI for file
              references to help users reference external files.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Key Insights
          </h2>
          <ul className="list-disc pl-6 mb-2" style={{ color: "var(--FG-1)" }}>
            <li className="mb-1">
              4 out of 5 users in our study preferred the dropdown menu to
              manually add context to Copilot. It was the clearest and most
              intuitive for users.
            </li>
            <li className="mb-1">
              Users want Copilot to automatically add context to its search
              based on their prompt. But users were uncertain about how to
              reference their intended context in their prompt.
            </li>
            <li className="mb-1">
              Some users expected their default scope to be the Pages not
              notebook, since that is the content they are looking at when
              interacting with Copilot.
            </li>
            <li className="mb-1">
              Using the existing UI for file references was not very
              discoverable, and seemed complex for the users in our research
              study.
            </li>
            <li className="mb-1">
              Users had different understandings of OneNote's organizational
              hierarchy. The terms we use internally do not align with what they
              use.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Impact
          </h2>
          <p className="mb-2" style={{ color: "var(--FG-1)" }}>
            Our research findings were applicable to other products in the
            Microsoft 365 suite, like Word, Excel, and PowerPoint, and we were
            able to collaborate with other teams on arriving at a solution for
            Copilot solutions across all products.
          </p>
          <p className="mb-2" style={{ color: "var(--FG-1)" }}>
            This problem is a core problem for AI chat interfaces integrated
            into other products, because of the need for users to understand its
            context and to steer the AI system correctly. Today similar design
            patterns are used across different products like Cursor, ChatGPT
            etc.
          </p>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Reflections
          </h2>
          <ul className="list-disc pl-6 mb-2" style={{ color: "var(--FG-1)" }}>
            <li className="mb-1">
              <strong>Balance is key:</strong> Finding the right balance between
              AI assistance and user control emerged as a crucial consideration.
              Users want AI to enhance their workflow without taking away their
              agency in the note-taking process.
            </li>
            <li className="mb-1">
              <strong>Collaborate early and often:</strong> To ensure alignment
              with other Microsoft teams and develop a consistent solution for
              all users, I learned the importance of early stakeholder
              involvement. This approach not only accelerated progress but also
              empowered team members by giving them a voice from the beginning.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            More Projects
          </h2>
          <ul className="list-disc pl-6 mb-2" style={{ color: "var(--FG-1)" }}>
            <li>Canvas Copilot</li>
            <li>ThredUp</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--FG-1)" }}
          >
            Get in touch
          </h2>
          <p className="mb-2" style={{ color: "var(--FG-1)" }}>
            obiorahchibuzor3@gmail.com
          </p>
        </section>
        <footer className="mt-12 text-sm" style={{ color: "var(--FG-2)" }}>
          I designed and coded this website with some help from AI © 2025
        </footer>
      </div>
    </div>
  );
};

export default CopilotContext;
