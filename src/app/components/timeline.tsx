'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, titleClassName }: { data: TimelineEntry[], titleClassName?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 60%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [50, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-3xl mx-auto py-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex-col md:flex-row z-10 items-center top-40 self-start hidden md:flex md:w-48 relative">
               <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-background ring-4 ring-background left-0">
                 <div className="h-4 w-4 rounded-full bg-muted border border-border" />
              </div>
              <h3 className={cn("text-4xl font-bold text-muted-foreground text-left w-full pl-12", titleClassName)}>
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 pr-4 md:pl-0 w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-background ring-4 ring-background -left-12 md:hidden">
                 <div className="h-4 w-4 rounded-full bg-muted border border-border" />
              </div>
              <h3 className={cn("md:hidden block text-xl mb-2 text-left font-bold text-muted-foreground", titleClassName)}>
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height > 0 ? height + 'px' : 'auto',
          }}
          className="absolute left-5 top-0 overflow-hidden w-[2px] bg-border/20 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-primary via-emerald-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
