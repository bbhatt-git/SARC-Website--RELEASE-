'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

export default function GSAPProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 1024;
    let obs: any = null;
    let tickerUpdate: any = null;

    if (!isMobile) {
      let targetY = window.scrollY;
      let currentY = window.scrollY;
      const lerp = 0.01; 
      const speed = 0.3; 

      obs = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        preventDefault: true,
        onChange: (self) => {
          targetY += self.deltaY * speed;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          targetY = Math.max(0, Math.min(targetY, maxScroll));
        }
      });

      tickerUpdate = () => {
        currentY += (targetY - currentY) * lerp;
        window.scrollTo(0, currentY);
        ScrollTrigger.update();
      };

      gsap.ticker.add(tickerUpdate);
    }

    // Initial animations run
    const animateElements = () => {
      ScrollTrigger.getAll().forEach(t => t.kill());

      // (Rest of your animation code)
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

      // Premier Program Cards 3D Flip
      const programCards = gsap.utils.toArray('.program-card-3d');
      if (programCards.length > 0) {
        gsap.from(programCards, {
          rotateY: 90,
          opacity: 0,
          scale: 0.8,
          z: -500,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '#exams',
            start: 'top 85%',
            end: 'top 20%',
            scrub: 2,
          }
        });

        gsap.to(programCards, {
          rotateY: -90,
          opacity: 0,
          scale: 0.8,
          z: -300,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '#exams',
            start: 'bottom 85%',
            end: 'bottom 15%',
            scrub: 1.5,
          }
        });
      }

      ScrollTrigger.refresh();
    };

    setTimeout(animateElements, 500);

    return () => {
      if (obs) obs.kill();
      if (tickerUpdate) gsap.ticker.remove(tickerUpdate);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]);

  return null;
}
