'use client';

import Image from 'next/image';
import { imageData } from '@/lib/image-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, History, Target, Users2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutView() {
    const stats = [
        { v: '07+', l: 'Years', i: History },
        { v: '2k+', l: 'Alumni', i: Users2 },
        { v: '95%', l: 'Success', i: Trophy },
        { v: '50+', l: 'Experts', i: Target },
    ];

    const milestones = [
        { y: '2017', t: 'The Foundation', e: 'Established with a focus on Science and Technology excellence.' },
        { y: '2019', t: 'Growth', e: 'Introduced Management and Law streams, expanding our footprint.' },
        { y: '2022', t: 'Recognition', e: 'Named the region\'s top emerging academic institution.' },
        { y: '2024', t: 'Modernization', e: 'Launched high-tech labs and digital research centers.' }
    ];

    return (
        <div className="bg-neutral-bg selection:bg-brand selection:text-white overflow-hidden">
            {/* Professional Hero */}
            <section className="relative pt-24 pb-12 px-6 border-b border-neutral-border">
                <div className="container mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <span data-gsap-fade-down className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-3 block">Our Identity</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight" data-gsap-text-reveal>
                            Redefining the Future<br />
                            of <span className="text-brand">Education.</span>
                        </h1>
                    </div>
                    <p className="text-lg text-neutral-text-muted max-w-sm font-medium leading-tight mb-2" data-gsap-fade-left>
                        SARC is a leading institution in Nepal dedicated to academic rigor and innovation since 2017.
                    </p>
                </div>
            </section>

            {/* Stats - Centered Container */}
            <section className="bg-neutral-surface border-b border-neutral-border">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {stats.map((s, i) => (
                            <div key={i} className="p-8 border-neutral-border border-b sm:border-b-0 sm:border-r last:border-0 group hover:bg-brand transition-colors duration-500" data-gsap-stagger>
                                <div className="text-3xl md:text-5xl font-bold text-foreground group-hover:text-white transition-colors tracking-tight mb-1">{s.v}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-text-muted group-hover:text-white/80 transition-colors">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Asymmetric Content Section */}
            <section className="border-b border-neutral-border">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 items-center">
                        <div className="relative h-[350px] lg:h-[500px] border-neutral-border lg:border-r overflow-hidden rounded-2xl lg:rounded-none my-8 lg:my-0">
                            <Image 
                                src={imageData.hero[1].src} 
                                alt="Campus" 
                                fill 
                                className="object-cover"
                                data-gsap-parallax data-speed="0.1"
                            />
                            <div className="absolute inset-0 bg-brand/5" />
                        </div>
                        <div className="p-8 lg:p-16 space-y-10">
                            <div data-gsap-fade-up className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-none">Our Vision</h2>
                                <p className="text-xl text-neutral-text-muted leading-tight font-medium">
                                    To be a leading institution in Nepal that sets benchmarks in academic excellence, research, and technological innovation.
                                </p>
                            </div>
                            <div className="grid gap-4" data-gsap-stagger>
                                {[
                                    { t: 'Student Centered', d: 'Every decision we make puts students first' },
                                    { t: 'Integrity', d: 'Building trust through transparency' },
                                    { t: 'Innovation', d: 'Embracing new methods and technologies' }
                                ].map((v) => (
                                    <div key={v.t} className="p-6 bg-neutral-surface rounded-2xl border border-neutral-border hover:border-brand transition-colors">
                                        <h4 className="font-black uppercase text-sm tracking-widest text-brand mb-1">{v.t}</h4>
                                        <p className="text-sm opacity-70 font-medium">{v.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section - Improved Desktop Alignment */}
            <section className="py-24 px-6 bg-neutral-surface">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-20" data-gsap-fade-up>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Our Journey</h2>
                        <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-border -translate-x-1/2" />
                        
                        <div className="space-y-16">
                            {milestones.map((m, i) => (
                                <div key={m.y} className={cn(
                                    "relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0",
                                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                                )} data-gsap-fade-up>
                                    <div className="flex-1 w-full pl-12 md:pl-0">
                                        <div className={cn(
                                            "p-8 bg-neutral-bg border border-neutral-border rounded-[32px] shadow-sm hover:border-brand transition-all group",
                                            i % 2 === 0 ? "md:mr-16 text-left md:text-right" : "md:ml-16 text-left"
                                        )}>
                                            <div className="text-3xl font-bold text-brand mb-2">{m.y}</div>
                                            <h4 className="text-xl font-bold mb-3 uppercase tracking-tight">{m.t}</h4>
                                            <p className="text-base text-neutral-text-muted leading-relaxed font-medium">{m.e}</p>
                                        </div>
                                    </div>

                                    {/* Timeline Dot - Centered on desktop */}
                                    <div className="absolute left-4 md:left-1/2 top-10 md:top-1/2 w-8 h-8 rounded-full bg-brand border-4 border-white shadow-xl flex items-center justify-center -translate-x-1/2 md:-translate-y-1/2 z-10 shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    </div>

                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA - Scaled down for better fit */}
            <section className="py-24 md:py-32 px-6 text-center bg-neutral-bg relative overflow-hidden">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto space-y-10 relative z-10" data-gsap-scale>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-foreground">
                            Shape Your<br /><span className="text-brand">Future.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button asChild size="lg" className="rounded-none px-12 h-14 bg-brand text-white hover:bg-brand/90 text-lg font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105">
                                <Link href="/admissions">Apply Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-none px-12 h-14 border-neutral-border text-neutral-text hover:bg-neutral-surface text-lg font-black uppercase tracking-widest transition-all">
                                <Link href="/contact">Inquiry</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand rounded-full blur-[120px]" />
                </div>
            </section>
        </div>
    )
}
