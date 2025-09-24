import { useState, useEffect, useRef } from 'react';

interface UseCountAnimationProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const useCountAnimation = ({ 
  target, 
  duration = 2000, 
  prefix = '', 
  suffix = '' 
}: UseCountAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer to detect when element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '-50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  // Animate the count when element comes into view
  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Use easeOut animation for smooth effect
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isInView, target, duration]);

  const displayValue = `${prefix}${count}${suffix}`;

  return { displayValue, elementRef };
};
