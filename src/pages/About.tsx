const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-20">
      <div className="glass-container p-12 max-w-2xl">
        <h1 className="text-title-1 text-fg-1 mb-6">About Me</h1>
        <p className="text-body-1 text-fg-2 leading-relaxed">
          This is the About page. The glass effect navbar is working perfectly! 
          You can toggle between Work and About using the glass toggle on the right side of the navbar.
        </p>
      </div>
    </div>
  );
};

export default About;
