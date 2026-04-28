'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, ArrowUp } from 'lucide-react';

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
  
  const socialLinks = [
    { href: "https://www.facebook.com/sarc.edu.np", label: "Facebook", icon: Facebook },
    { href: "#", label: "Twitter", icon: Twitter },
    { href: "https://instagram.com/sarc.edu.np", label: "Instagram", icon: Instagram },
  ];

  return (
    <>
      <button id="go-to-top" className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center translate-y-20 opacity-0 transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none" aria-label="Go to top">
        <ArrowUp className="transition-transform group-hover:-translate-y-1" />
      </button>

      <footer className="w-full bg-gradient-to-b from-neutral-surface to-neutral-bg pt-10 md:pt-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-pink/20 blur-[100px]"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-accent-lightgreen/20 blur-[100px]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-8 pb-8 md:pb-12">
            <div className="flex flex-col gap-4 w-full lg:max-w-[280px]">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/sarc.png" alt="SARC Logo" width={36} height={36} />
                <span className="text-lg font-bold tracking-tight">SARC Education Foundation</span>
              </Link>
              <p className="text-neutral-text-muted text-sm">Pioneering quality education in Nepal with a focus on innovation, character, and excellence.</p>
              <div className="flex gap-2">
                {socialLinks.map(({ href, icon: Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-neutral-surface flex items-center justify-center text-neutral-text-muted hover:bg-brand hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-12">
              <div className="flex flex-col gap-3 min-w-[130px]">
                <h4 className="font-semibold text-base">Platform</h4>
                <nav className="flex flex-col gap-2">
                  <Link href="/about/us" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">About Us</Link>
                  <Link href="/academics/programs" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">Programs</Link>
                  <Link href="/gallery" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">Gallery</Link>
                  <Link href="/contact" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">Help Center</Link>
                </nav>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base">Resources</h4>
                <nav className="flex flex-col gap-2">
                  <Link href="/academics/achievements" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">Alumni</Link>
                  <Link href="/about/staffs" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">Faculty</Link>
                  <Link href="/notice/general" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">Notices</Link>
                  <Link href="#" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">Privacy Policy</Link>
                </nav>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base">Reach Out</h4>
                <nav className="flex flex-col gap-2">
                  <a href="tel:099525271" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">099-525271</a>
                  <a href="mailto:contact@sarc.edu.np" className="text-neutral-text-muted hover:text-brand transition-colors text-sm">contact@sarc.edu.np</a>
                  <span className="max-w-[180px] text-neutral-text-muted text-sm">Bhimdatta-06, Kanchanpur, Nepal</span>
                </nav>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-t border-neutral-border gap-3 text-xs text-neutral-text-muted">
            <p>© {new Date().getFullYear()} SARC Education Foundation. All rights reserved.</p>
            <p>Designed for Excellence.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
