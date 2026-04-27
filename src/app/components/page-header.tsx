'use client';

import { Sparkles } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <section className="bg-gradient-to-b from-neutral-bg to-neutral-surface relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 text-center border-b border-neutral-border">
            <div className="container relative z-10">
                <div className="mb-4 inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand" />
                    <p className="font-semibold uppercase tracking-wider text-muted-foreground text-xs">{subtitle}</p>
                </div>
                <h1 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                    {title}
                </h1>
            </div>
        </section>
    );
}
