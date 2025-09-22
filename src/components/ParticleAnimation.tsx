import { useRef, useEffect, useState } from "react";
import { getColor } from "@/lib/colors";

export default function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      // Make canvas larger than container to allow bleeding effect
      const bleedAmount = 100; // Extra pixels on each side
      canvas.width = window.innerWidth + bleedAmount * 2;
      canvas.height = 387 + bleedAmount * 2; // Fixed height for footer + bleed
      setIsMobile(window.innerWidth < 768);
    };

    updateCanvasSize();

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      scatteredColor: string;
      life: number;
      maxLife: number;
    }[] = [];

    function createParticle() {
      if (!canvas) return null;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2, // Random velocity
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 0.5, // Smaller particles for denser effect
        color: getColor("fg-1"),
        scatteredColor: getColor("brand"),
        life: Math.random() * 100 + 50,
        maxLife: Math.random() * 100 + 50,
      };
    }

    function createInitialParticles() {
      if (!canvas) return;
      const baseParticleCount = 5000; // Much higher particle count for dense effect
      const particleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 387)),
      );
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        if (particle) particles.push(particle);
      }
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 50; // Smaller interaction distance for tighter feel

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        // Keep particles within bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Mouse interaction with warping and color change
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
          p.x += moveX * 0.1;
          p.y += moveY * 0.1;

          // Change color when interacting
          ctx.fillStyle = p.scatteredColor;
        } else {
          // Return to normal color
          ctx.fillStyle = p.color;
        }

        // Draw particle with opacity based on life
        const opacity = p.life / p.maxLife;
        ctx.globalAlpha = opacity;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        // Update life
        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle();
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      // Maintain particle count
      const baseParticleCount = 30000;
      const targetParticleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 387)),
      );
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle();
        if (newParticle) particles.push(newParticle);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    createInitialParticles();
    animate();

    const handleResize = () => {
      updateCanvasSize();
      particles = [];
      createInitialParticles();
    };

    const handleMove = (x: number, y: number) => {
      // Adjust mouse position for canvas offset (bleed amount)
      const bleedAmount = 100;
      mousePositionRef.current = {
        x: x + bleedAmount,
        y: y + bleedAmount,
      };
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
  }, [isMobile]);

  return (
    <div className="relative w-full h-full overflow-hidden" data-oid=":urvz.:">
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        aria-label="Interactive particle animation"
        data-oid="a0nsdby"
      />
    </div>
  );
}
