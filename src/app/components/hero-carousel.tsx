'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { imageData } from '@/lib/image-data';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const heroData = imageData.hero;
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false); // Set to false after first render

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [heroData.length]);

  const currentItem = heroData[index];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <Image
            src={currentItem.src}
            alt={currentItem.hint}
            fill
            className="object-cover"
            priority={index === 0}
            data-ai-hint={currentItem.hint}
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/60 to-black/80 z-10" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
            <motion.div
                key={index}
                className='flex flex-col items-center'
                initial={isFirstRender ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                <div className="mb-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-200" />
                <p className="text-sm font-medium text-slate-200">{currentItem.pill}</p>
                <Sparkles className="w-4 h-4 text-slate-200" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-shadow-lg max-w-4xl">
                {currentItem.title}
                </h1>
                <h2 className="text-xl md:text-2xl text-slate-200 mt-4 text-shadow-md max-w-3xl">
                {currentItem.subtitle}
                </h2>
            </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className='h-12 px-8 rounded-xl bg-primary text-primary-foreground shadow-lg'>
                    <Link href="/admissions">Apply Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className='h-12 px-8 rounded-xl bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 hover:border-white/60 hover:text-white'>
                    <Link href="/academics/programs">Explore Programs</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
