'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  className,
  reverse,
  children,
  vertical = false,
  pauseOnHover = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-stretch justify-start [gap:var(--gap)]',
          vertical ? 'flex-col animate-marquee-vertical' : 'flex-row animate-marquee-horizontal',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-stretch justify-start [gap:var(--gap)]',
          vertical ? 'flex-col animate-marquee-vertical' : 'flex-row animate-marquee-horizontal',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
    </div>
  );
}
