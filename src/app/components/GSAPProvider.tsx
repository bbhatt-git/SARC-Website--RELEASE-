'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider() {
  useEffect(() => {
    // Smooth scroll with Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger animations
    const animateElements = () => {
      // Fade up animations
      gsap.utils.toArray('[data-gsap-fade-up]').forEach((element: any) => {
        gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: 60 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Fade down animations
      gsap.utils.toArray('[data-gsap-fade-down]').forEach((element: any) => {
        gsap.fromTo(element,
          { 
            opacity: 0, 
            y: -60 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Fade left animations
      gsap.utils.toArray('[data-gsap-fade-left]').forEach((element: any) => {
        gsap.fromTo(element,
          { 
            opacity: 0, 
            x: -80 
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Fade right animations
      gsap.utils.toArray('[data-gsap-fade-right]').forEach((element: any) => {
        gsap.fromTo(element,
          { 
            opacity: 0, 
            x: 80 
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Scale animations
      gsap.utils.toArray('[data-gsap-scale]').forEach((element: any) => {
        gsap.fromTo(element,
          { 
            opacity: 0, 
            scale: 0.8 
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.75)',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Stagger animations for lists
      gsap.utils.toArray('[data-gsap-stagger]').forEach((container: any) => {
        const items = container.children;
        gsap.fromTo(items,
          { 
            opacity: 0, 
            y: 30 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    };

    // Initial animation
    animateElements();

    // Refresh ScrollTrigger on resize
    ScrollTrigger.addEventListener('refresh', () => lenisInstance.resize());
    ScrollTrigger.refresh();

    return () => {
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
}
