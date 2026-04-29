'use client';

import { useState, useEffect, Fragment } from 'react';
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
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Search, ArrowRight, ChevronRight, X, ChevronDown, Menu } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from 'framer-motion';


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href || '#'}
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-surface",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-neutral-text group-hover:text-brand">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-neutral-text-muted">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== hasScrolled) {
        setHasScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin') || pathname === '/login') {
    return null;
  }

  const SearchBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    };

    return (
      <form onSubmit={handleSearch} className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    );
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-neutral-bg/95 backdrop-blur-xl border-b border-neutral-border/50",
        hasScrolled ? 'shadow-lg shadow-black/5' : 'shadow-sm'
      )}
    >
      <div className="container mx-auto h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
            </motion.div>
            <div className="flex flex-col items-start justify-center h-[40px]" style={{ lineHeight: 0.8, marginTop: '-2px' }}>
              <span className="font-semibold text-brand text-base tracking-tight">SARC EDU.</span>
              <span className="font-bold text-foreground tracking-[0.1em] text-[9px] uppercase">FOUNDATION</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <NavigationMenuItem>
                  {link.children ? (
                    <>
                      <NavigationMenuTrigger className="group relative">
                        {link.label}
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-brand"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.2 }}
                        />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-neutral-bg">
                          {link.children.map((child) => (
                            <ListItem key={child.label} href={child.href} title={child.label}>
                              {child.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href={link.href!} className={navigationMenuTriggerStyle()}>
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              </motion.div>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="hidden lg:block w-48">
            <SearchBar />
          </div>
          <ModeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="hidden lg:inline-flex h-10 px-5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              <Link href="/admissions">Apply Now</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="lg:hidden relative h-10 w-10 z-50 flex items-center justify-center rounded-lg hover:bg-neutral-surface transition-colors"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </motion.button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-sm bg-neutral-bg p-0 flex flex-col">
                <SheetHeader className="p-4 flex-row items-center justify-between border-b border-neutral-border">
                  <Link href="/" className="flex items-center gap-2 group">
                    <Image src="/images/sarc.png" alt="SARC Logo" width={32} height={32} />
                    <div className="flex flex-col items-start justify-center h-[32px]" style={{ lineHeight: 0.8 }}>
                      <span className="font-semibold text-brand text-base tracking-tight">SARC EDU.</span>
                      <span className="font-bold text-foreground tracking-[0.1em] text-[9px] uppercase">FOUNDATION</span>
                    </div>
                  </Link>
                  <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                  <SheetDescription className="sr-only">A list of pages to navigate the SARC website.</SheetDescription>
                  <div className="flex items-center gap-2">
                    <ModeToggle />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>

                <div className="p-4 border-b border-neutral-border">
                  <SearchBar />
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <Accordion type="single" collapsible className="w-full space-y-1">
                    {NAV_LINKS.map((link) => (
                      <div key={link.label}>
                        {link.children ? (
                          <AccordionItem value={link.label} className="border-b-0">
                            <AccordionTrigger className="flex w-full items-center justify-between rounded-md px-4 py-3 text-lg font-medium text-neutral-text hover:bg-neutral-surface hover:no-underline">
                              {link.label}
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pl-4">
                              <div className="space-y-1 py-2">
                                {link.children.map(child => (
                                  <SheetClose asChild key={child.href}>
                                    <Link href={child.href} className="flex items-center gap-3 rounded-md px-4 py-2.5 text-base font-medium text-neutral-text hover:bg-neutral-surface">
                                      <child.icon className="h-5 w-5 text-brand" />
                                      {child.label}
                                    </Link>
                                  </SheetClose>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <SheetClose asChild>
                            <Link href={link.href!} className="flex items-center rounded-md px-4 py-3 text-lg font-medium text-neutral-text hover:bg-neutral-surface">
                              {link.label}
                            </Link>
                          </SheetClose>
                        )}
                      </div>
                    ))}
                  </Accordion>
                </nav>
                <div className="p-4 border-t border-neutral-border">
                  <Button asChild className="w-full h-11 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                    <Link href="/admissions">Apply Now</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

