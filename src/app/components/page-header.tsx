'use client';

import Image from 'next/image';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
    return (
        <section className="relative w-full overflow-hidden pt-20 pb-24 md:pt-24 md:pb-32 text-center flex items-center justify-center min-h-[220px] md:min-h-[300px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://framerusercontent.com/images/dd4YlCRPQwLAoUi2hmVMTWcB9s.png"
                    alt="Page Banner Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
            </div>

            <div className="container relative z-10 max-w-4xl mx-auto px-6 mt-4 md:mt-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-banner-header">
                    {title}
                </h1>
            </div>

            {/* Sine Wave Separation */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[60px] fill-neutral-bg"
                >
                    <path d="M0,0 C300,120 900,0 1200,120 V120 H0 Z" />
                </svg>
            </div>

            {/* Subtle background glow for depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-full bg-brand/5 blur-[120px] z-0 pointer-events-none" />
        </section>
    );
}
