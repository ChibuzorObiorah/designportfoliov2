import { useRef, useEffect, useState } from "react";
import StaticHero from "./StaticHero";

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [canvasSupported, setCanvasSupported] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // SSR guard - only render on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Canvas feature detection
  useEffect(() => {
    if (!isClient) return;
    function detectCanvasSupport() {
      try {
        const testCanvas = document.createElement('canvas');
        const testCtx = testCanvas.getContext('2d');
        if (!testCtx) {
          console.warn('Canvas 2D context not available, using fallback');
          setCanvasSupported(false);
          setShowFallback(true);
          return false;
        }
        console.log('Canvas support detected');
        return true;
      } catch (e) {
        console.warn('Canvas detection failed:', e);
        setCanvasSupported(false);
        setShowFallback(true);
        return false;
      }
    }

    detectCanvasSupport();
  }, [isClient]);

  useEffect(() => {
    if (!canvasSupported || !isClient) return;
    
    // Reduced font loading timeout with better fallbacks
    let isMounted = true;
    const fontLoadTimeout = setTimeout(() => {
      console.log('Font load timeout (1s), proceeding with fallback fonts');
      if (isMounted) setFontLoaded(true);
    }, 1000); // Reduced to 1 second timeout
    
    async function loadFontAndStart() {
      console.log('Starting font load...');
      try {
        await document.fonts.load("900 100px 'Rubik Mono One'");
        await document.fonts.ready;
        console.log('Font loaded successfully');
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      } catch (e) {
        console.warn('Font loading failed, using system fallback:', e);
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      }
    }
    loadFontAndStart();
    return () => {
      isMounted = false;
      clearTimeout(fontLoadTimeout);
    };
  }, [canvasSupported, isClient]);

  useEffect(() => {
    if (!fontLoaded || !canvasSupported || !isClient) return;
    
    console.log('Initializing canvas...');
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found, switching to fallback');
      setShowFallback(true);
      return;
    }

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error('Canvas 2D context not available, switching to fallback');
        setShowFallback(true);
        return;
      }
      console.log('Canvas initialized successfully');
    } catch (e) {
      console.error('Canvas context creation failed:', e);
      setShowFallback(true);
      return;
    }

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
      setIsMobile(window.innerWidth < 768);
    };

    updateCanvasSize();

    let particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      scatteredColor: string;
      life: number;
    }[] = [];

    let textImageData: ImageData | null = null;

    function createTextImage() {
      if (!ctx || !canvas) return 0;

      ctx.fillStyle = "white";
      ctx.save();

      const textSize = isMobile ? 50 : 100;
      // Enhanced font fallback stack
      ctx.font = `900 ${textSize}px 'Rubik Mono One', 'Courier New', 'Monaco', 'Menlo', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText("CHIBUZOR", canvas.width / 2, canvas.height / 2);

      ctx.restore();

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      return textSize / 160;
    }

    function createParticle(scale: number) {
      if (!ctx || !canvas || !textImageData) return null;

      const data = textImageData.data;

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            scatteredColor: "#fff84c",
            life: Math.random() * 100 + 50,
          };
        }
      }

      return null;
    }

    function createInitialParticles(scale: number) {
      if (!canvas) return;
      const baseParticleCount = 7000;
      const particleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      );
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale);
        if (particle) particles.push(particle);
      }
    }

    let animationFrameId: number;

    function animate(scale: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#020b0d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 240;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (
          distance < maxDistance &&
          (isTouchingRef.current || !("ontouchstart" in window))
        ) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 60;
          const moveY = Math.sin(angle) * force * 60;
          p.x = p.baseX - moveX;
          p.y = p.baseY - moveY;

          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = "white";
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle(scale);
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      const baseParticleCount = 7000;
      const targetParticleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      );
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale);
        if (newParticle) particles.push(newParticle);
      }

      animationFrameId = requestAnimationFrame(() => animate(scale));
    }

    const scale = createTextImage();
    createInitialParticles(scale);
    animate(scale);

    const handleResize = () => {
      updateCanvasSize();
      const newScale = createTextImage();
      particles = [];
      createInitialParticles(newScale);
    };

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = () => {
      isTouchingRef.current = true;
    };

    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      mousePositionRef.current = { x: 0, y: 0 };
    };

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("resize", handleResize);
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
      canvas.addEventListener("mouseleave", handleMouseLeave);
      canvas.addEventListener("touchstart", handleTouchStart);
      canvas.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, fontLoaded, canvasSupported, isClient]);

  // Show fallback during SSR, if Canvas is not supported, or failed
  if (!isClient || showFallback || !canvasSupported) {
    return <StaticHero isMobile={isMobile} />;
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      data-oid="kl:ac:4"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with Chibuzor name"
        data-oid="0a_xdb8"
      />
    </div>
  );
}
