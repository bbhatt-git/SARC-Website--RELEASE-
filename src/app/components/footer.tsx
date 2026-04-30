'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';

export default function Footer() {
  const pathname = usePathname();

  useEffect(() => {
    const goToTopBtn = document.getElementById('go-to-top');
    if (!goToTopBtn) return;

    const handleScroll = () => {
      if (window.scrollY > 400) {
        goToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        goToTopBtn.classList.add('translate-y-0', 'opacity-100');
      } else {
        goToTopBtn.classList.add('translate-y-20', 'opacity-0');
        goToTopBtn.classList.remove('translate-y-0', 'opacity-100');
      }
    };

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);
    goToTopBtn.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      goToTopBtn.removeEventListener('click', handleClick);
    };
  }, []);

  if (pathname.startsWith('/admin') || pathname === '/login') {
    return null;
  }
  
  return (
    <>
      <button id="go-to-top" className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center translate-y-20 opacity-0 transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none" aria-label="Go to top">
        <ArrowUp className="transition-transform group-hover:-translate-y-1" />
      </button>

      <FlickeringFooter />
    </>
  );
}

