'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Smooth scroll with Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger animations
    const animateElements = () => {
      // Kill existing triggers to avoid duplicates on route change
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Fade up animations
      gsap.utils.toArray('[data-gsap-fade-up]').forEach((element: any) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Fade down
      gsap.utils.toArray('[data-gsap-fade-down]').forEach((element: any) => {
        gsap.fromTo(element,
          { opacity: 0, y: -50 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Scale
      gsap.utils.toArray('[data-gsap-scale]').forEach((element: any) => {
        gsap.fromTo(element,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1, scale: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.8)',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Stagger
      gsap.utils.toArray('[data-gsap-stagger]').forEach((container: any) => {
        const items = container.children;
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: container,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Parallax
      gsap.utils.toArray('[data-gsap-parallax]').forEach((element: any) => {
        const speed = element.dataset.speed || 0.2;
        gsap.to(element, {
          y: () => (window.innerHeight - element.offsetHeight) * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      // Text Reveal
      gsap.utils.toArray('[data-gsap-text-reveal]').forEach((element: any) => {
        const text = element.innerText;
        element.innerHTML = text.split(' ').map((word: string) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`).join(' ');
        
        const spans = element.querySelectorAll('span > span');
        gsap.fromTo(spans,
          { y: '100%' },
          {
            y: '0%',
            duration: 1,
            ease: 'power4.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      ScrollTrigger.refresh();
    };

    // Initial run and refresh
    setTimeout(animateElements, 100);

    return () => {
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]); // RE-RUN ON PATHNAME CHANGE

  return null;
}
