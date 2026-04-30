'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle,
  SheetDescription, SheetClose,
} from "@/components/ui/sheet";
import { Search, X, Menu, Phone, Mail } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Premium List Item (Single Row Style) ──────────────────────────────── */
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: any; description?: string }
>(({ className, title, children, icon: Icon, description, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={props.href || '#'}
        ref={ref}
        className={cn(
          "group flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 hover:bg-neutral-surface active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {Icon && (
          <div className="shrink-0 p-2.5 rounded-xl bg-brand/5 group-hover:bg-brand/10 transition-colors">
            <Icon className="w-5 h-5 text-brand" />
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <span className="text-[15px] font-bold text-foreground group-hover:text-brand transition-colors tracking-tight">
            {title}
          </span>
          {description && (
            <p className="text-[13px] text-muted-foreground/70 font-medium leading-snug line-clamp-1">
              {description}
            </p>
          )}
        </div>
      </Link>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

/* ─── Search bar ────────────────────────────────────────────────────────── */
function SearchBar({ className, isMobile = false }: { className?: string; isMobile?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };
  return (
    <form onSubmit={handleSearch} className={cn("relative flex items-center", isMobile ? "w-full" : "w-[120px]", className)}>
      <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground z-10 pointer-events-none" />
      <Input
        type="search"
        placeholder="Search"
        className="pl-9 pr-3 h-8 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 focus:bg-black/8 focus-visible:ring-1 focus-visible:ring-brand/30 transition-all rounded-full text-sm"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
}

/* ─── Shared pill glass style ─────────────────────────────────────────── */
function pillClass(scrolled: boolean) {
  return cn(
    "flex items-center rounded-full border transition-all duration-700",
    scrolled
      ? "bg-white/85 dark:bg-neutral-950/90 border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-xl shadow-black/10"
      : "bg-white/50 dark:bg-black/60 border-white/30 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-black/5"
  );
}

/* ─── Mobile drawer ─────────────────────────────────────────────────────── */
function MobileSheet() {
  const pathname = usePathname();
  return (
    <SheetContent side="right" className="max-w-sm bg-neutral-bg p-0 flex flex-col border-l-0">
      <SheetTitle className="sr-only">Menu</SheetTitle>
      <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
      <SheetHeader className="p-6 flex-row items-center justify-between border-b border-neutral-border/50">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/sarc.png" alt="SARC Logo" width={32} height={32} />
          <div className="flex flex-col items-start justify-center" style={{ lineHeight: 1 }}>
            <span className="font-bold text-brand text-base tracking-tight">SARC EDU.</span>
            <span className="font-bold text-foreground tracking-[0.1em] text-[8px] uppercase opacity-70">FOUNDATION</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      <nav className="flex-1 overflow-y-auto px-6 py-8">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.children ? (
                <AccordionItem value={link.label} className="border-b-0">
                  <AccordionTrigger className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-lg font-bold text-foreground hover:bg-neutral-surface hover:no-underline">
                    {link.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1 pl-4">
                    <div className="space-y-1 border-l-2 border-neutral-border/50 ml-2 pl-4">
                      {link.children.map(child => (
                        <SheetClose asChild key={child.href}>
                          <Link href={child.href} className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] font-semibold text-muted-foreground hover:text-brand hover:bg-brand/5">
                            {child.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <SheetClose asChild>
                  <Link
                    href={link.href!}
                    className={cn(
                      "flex items-center rounded-xl px-4 py-3 text-lg font-bold text-foreground hover:bg-neutral-surface",
                      pathname === link.href && "text-brand bg-brand/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              )}
            </div>
          ))}
        </Accordion>
      </nav>

      <div className="p-6 border-t border-neutral-border/50">
        <Button asChild className="w-full h-12 rounded-xl font-bold">
          <Link href="/admissions">Apply Now</Link>
        </Button>
      </div>
    </SheetContent>
  );
}

/* ─── Main Header ───────────────────────────────────────────────────────── */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth < 1200);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  if (pathname.startsWith('/admin') || pathname === '/login') return null;

  const topOffset = scrolled ? 'top-5' : 'top-4';
  const pillH = scrolled ? 'h-12' : 'h-14';

  return (
    <div className={cn("fixed left-0 right-0 z-50 pointer-events-none flex flex-col items-center transition-[top] duration-500", topOffset)}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          width: scrolled ? (isNarrow ? '94%' : '85%') : '94%' 
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-between w-full pointer-events-auto"
      >
        {/* Pill 1: Logo (Left) */}
        <div className={cn(pillClass(scrolled), pillH, "px-1.5 shrink-0 z-20")}>
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center p-1">
              <Image src="/images/sarc.png" alt="SARC Logo" width={scrolled ? 36 : 40} height={scrolled ? 36 : 40} className="object-contain" priority />
            </motion.div>
            {!isNarrow && (
              <div className="flex flex-col items-start justify-center ml-1 pr-3">
                <span className="font-bold text-brand text-[13px] leading-none tracking-tight">SARC EDU.</span>
                <span className="font-bold text-foreground/60 tracking-[0.1em] text-[8px] leading-none uppercase mt-1">FOUNDATION</span>
              </div>
            )}
          </Link>
        </div>

        {/* Pill 2: Desktop Nav (Centered between others) */}
        {!isNarrow && (
          <div className={cn(pillClass(scrolled), pillH, "px-2 z-10")}>
            <NavigationMenu>
              <NavigationMenuList className="gap-1 relative">
                {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href || (link.children && pathname.startsWith(link.href || '###'));
                    return (
                        <NavigationMenuItem key={link.label} className="relative">
                        {link.children ? (
                            <>
                            <NavigationMenuTrigger className={cn(
                                "bg-transparent text-sm font-bold h-9 px-4 rounded-full transition-all relative z-10",
                                isActive ? "text-brand" : "text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                            )}>
                                {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-1.5 flex flex-col gap-0.5 w-[320px] bg-neutral-bg rounded-[24px] shadow-2xl border-none">
                                    {link.children.map((child) => (
                                        <ListItem key={child.label} href={child.href} title={child.label} icon={child.icon} description={child.description} />
                                    ))}
                                </div>
                            </NavigationMenuContent>
                            </>
                        ) : (
                            <NavigationMenuLink asChild>
                            <Link href={link.href!} className={cn(
                                "flex items-center bg-transparent text-sm font-bold h-9 px-4 rounded-full transition-all relative z-10",
                                isActive ? "text-brand" : "text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                            )}>
                                {link.label}
                                {isActive && (
                                    <motion.div layoutId="active-nav-pill" className="absolute inset-0 bg-brand/10 dark:bg-brand/20 rounded-full -z-10" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                                )}
                            </Link>
                            </NavigationMenuLink>
                        )}
                        </NavigationMenuItem>
                    );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}

        {/* Pill 3: CTAs (Right) */}
        <div className={cn(pillClass(scrolled), pillH, "px-3 shrink-0 gap-2 z-20")}>
          {!isNarrow && <SearchBar className="mr-2" />}
          <ModeToggle />
          {!isNarrow && (
            <Button asChild className="h-9 px-5 rounded-full font-bold text-sm bg-brand hover:bg-brand/90 text-white shadow-lg shadow-brand/20 transition-all hover:scale-[1.03] active:scale-[0.97]">
              <Link href="/admissions">Apply Now</Link>
            </Button>
          )}
          <div className={cn(isNarrow ? "block" : "lg:hidden")}>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <MobileSheet />
            </Sheet>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
