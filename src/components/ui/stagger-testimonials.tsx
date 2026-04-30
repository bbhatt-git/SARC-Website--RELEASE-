"use client"

import React, { useRef, useState, useEffect } from 'react';
import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TESTIMONIALS } from '@/lib/constants';
import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS[0];
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  return (
    <div className={cn(
      "w-[300px] md:w-[400px] flex-shrink-0 bg-white/80 dark:bg-neutral-surface/80 backdrop-blur-md border border-neutral-border/50 rounded-[24px] p-6 shadow-sm dark:shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between",
      className
    )}>
      <div className="relative mb-6">
        <div className="absolute -top-4 -left-4 text-brand/5 group-hover:text-brand/10 transition-colors">
          <Quote className="w-8 h-8 rotate-180" />
        </div>
        <p className="text-foreground/90 font-medium leading-relaxed text-sm md:text-[15px] relative z-10 italic">
          "{testimonial.text}"
        </p>
      </div>
      
      <div className="flex items-center gap-4 border-t border-neutral-border/20 pt-4 mt-auto">
        <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-brand/10">
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-foreground text-[13px] md:text-sm tracking-tight">{testimonial.author}</span>
          <span className="text-[10px] text-brand font-bold uppercase tracking-[0.1em]">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC<{ scrollYProgress: MotionValue<number> }> = ({ scrollYProgress }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const row1 = TESTIMONIALS.slice(0, Math.ceil(TESTIMONIALS.length / 2));
  const row2 = TESTIMONIALS.slice(Math.ceil(TESTIMONIALS.length / 2));

  // Significant duplication for aggressive parallax without gaps
  const row1Items = [...row1, ...row1, ...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2, ...row2, ...row2];

  // Aggressive parallax range for "moving bar" feel
  const row1X = useTransform(scrollYProgress, [0, 1], ["30%", "-120%"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["-120%", "30%"]);
  
  // Subtle skew based on scroll for dynamic feel
  const skew = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const smoothRow1X = useSpring(row1X, { stiffness: 50, damping: 30, restDelta: 0.001 });
  const smoothRow2X = useSpring(row2X, { stiffness: 50, damping: 30, restDelta: 0.001 });
  const smoothSkew = useSpring(skew, { stiffness: 50, damping: 30 });

  if (isMobile) {
    return (
      <div className="w-full overflow-hidden py-8 relative flex flex-col gap-6">
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-surfaceAlt via-neutral-surfaceAlt/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-surfaceAlt via-neutral-surfaceAlt/80 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-4 px-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} className="w-[280px]" />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 py-10 relative select-none overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-60 bg-gradient-to-r from-neutral-surfaceAlt via-neutral-surfaceAlt/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-60 bg-gradient-to-l from-neutral-surfaceAlt via-neutral-surfaceAlt/50 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Left to Right on Scroll */}
      <div className="w-full overflow-visible">
        <motion.div 
          style={{ x: smoothRow1X, skewX: smoothSkew }} 
          className="flex gap-10 w-max"
        >
          {row1Items.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: Right to Left on Scroll */}
      <div className="w-full overflow-visible">
        <motion.div 
          style={{ x: smoothRow2X, skewX: smoothSkew }} 
          className="flex gap-10 w-max"
        >
          {row2Items.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};