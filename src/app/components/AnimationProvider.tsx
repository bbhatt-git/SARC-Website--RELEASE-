'use client';

import { useEffect } from 'react';

export default function AnimationProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // --- Animation on Scroll ---
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    }, observerOptions);

    const animElements = document.querySelectorAll('[data-fade-up], [data-fade-down], [data-fade-left], [data-fade-right]');
    
    animElements.forEach((el) => {
      el.classList.add('reveal-item');
      if (el.hasAttribute('data-fade-up')) el.classList.add('reveal-up');
      if (el.hasAttribute('data-fade-down')) el.classList.add('reveal-down');
      if (el.hasAttribute('data-fade-left')) el.classList.add('reveal-left');
      if (el.hasAttribute('data-fade-right')) el.classList.add('reveal-right');
      
      requestAnimationFrame(() => {
        observer.observe(el);
      });
    });

    // --- Accordion (FAQ) Logic ---
    const faqItems = document.querySelectorAll('[data-faq-item]');
    faqItems.forEach(item => {
      const trigger = item.querySelector('[data-faq-trigger]');
      if (trigger) {
        trigger.addEventListener('click', () => {
          const content = item.querySelector('.accordion-content-wrapper') as HTMLElement;
          if (content) {
            const isOpen = item.getAttribute('data-state') === 'open';
            
            // Close all other items
            faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                const otherContent = otherItem.querySelector('.accordion-content-wrapper') as HTMLElement;
                otherItem.setAttribute('data-state', 'closed');
                if(otherContent) otherContent.style.maxHeight = '0px';
              }
            });

            // Toggle current item
            if (isOpen) {
              item.setAttribute('data-state', 'closed');
              content.style.maxHeight = '0px';
            } else {
              item.setAttribute('data-state', 'open');
              content.style.maxHeight = content.scrollHeight + "px";
            }
          }
        });
      }
    });

    return () => {
      animElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return null;
}
