'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import Image from 'next/image';
import { Eye, Lightbulb, Heart, Shield, Globe, GraduationCap, Award, Users, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { imageData } from '@/lib/image-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
    { value: '7+', label: 'Years of Excellence' },
    { value: '2000+', label: 'Students Graduated' },
    { value: '95%', label: 'Success Rate' },
    { value: '50+', label: 'Expert Faculty' },
];

const missionPoints = [
    { number: '01', text: "Providing quality education that fosters critical thinking, innovation, and lifelong learning." },
    { number: '02', text: "Encouraging student-centered learning with a focus on practical knowledge and research-based education." },
    { number: '03', text: "Promoting ethical leadership and social responsibility through value-based education." },
    { number: '04', text: "Creating a nurturing and inclusive environment where students can explore their full potential." },
];

const milestones = [
    { year: 2017, event: "SARC Education Foundation was established with a vision for modern education." },
    { year: 2018, event: "First batch of +2 students graduated with excellent, district-topping results." },
    { year: 2019, event: "Introduced Management and Law streams for +2, expanding academic offerings." },
    { year: 2020, event: "Launched CTEVT programs to offer practical, vocational training for students." },
    { year: 2022, event: "Recognized as one of the top emerging colleges in the region for academic excellence." },
    { year: 2024, event: "Expanded campus with new state-of-the-art science and computer labs." }
];

const values = [
    { icon: Heart, title: "Student-Centered", description: "Every decision we make puts students first" },
    { icon: Shield, title: "Integrity", description: "Building trust through transparency and honesty" },
    { icon: Globe, title: "Global Perspective", description: "Preparing students for worldwide opportunities" },
    { icon: Lightbulb, title: "Innovation", description: "Embracing new methods and technologies" },
    { icon: Eye, title: "Excellence", description: "Striving for the highest standards" },
    { icon: GraduationCap, title: "Lifelong Learning", description: "Education beyond the classroom" },
];

export default function AboutView() {
    return (
        <div className="min-h-screen bg-neutral-bg">
            {/* Hero - Clean Editorial Style */}
            <section className="relative py-32 px-6 bg-gradient-to-b from-neutral-bg to-neutral-surface">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8" data-gsap-fade-up>
                        <div className="inline-block">
                            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground">About Us</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                            Building Tomorrow's<br />
                            <span className="text-brand">Leaders Today</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            Since 2017, SARC Education Foundation has been at the forefront of educational excellence in Bhimdatta, Kanchanpur, shaping the minds that will shape our future.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats - Minimal Horizontal */}
            <section className="py-16 px-6 border-y border-neutral-border bg-neutral-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12" data-gsap-stagger>
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision - Full Width Image with Overlay Text */}
            <section className="relative py-24 px-6 bg-neutral-bg">
                <div className="max-w-6xl mx-auto">
                    <div className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl" data-gsap-scale>
                        <Image
                            src={imageData.hero[2].src}
                            alt="Our Vision"
                            fill
                            className="object-cover"
                            data-ai-hint={imageData.hero[2].hint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-12 md:p-16">
                            <span className="text-brand font-semibold text-sm tracking-wider uppercase mb-4 block">Our Vision</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
                                To be a leading institution in Nepal that sets benchmarks in academic excellence, research, and technological innovation.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission - Numbered List */}
            <section className="py-24 px-6 bg-neutral-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16" data-gsap-fade-up>
                        <span className="text-brand font-semibold text-sm tracking-wider uppercase mb-4 block">Our Mission</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">What We Stand For</h2>
                    </div>
                    
                    <div className="space-y-8" data-gsap-stagger>
                        {missionPoints.map((point, index) => (
                            <div 
                                key={index} 
                                className="flex gap-8 items-start group"
                            >
                                <div className="text-6xl font-bold text-brand/20 group-hover:text-brand/40 transition-colors duration-300">
                                    {point.number}
                                </div>
                                <p className="text-xl text-foreground leading-relaxed pt-2 max-w-2xl group-hover:text-brand/90 transition-colors duration-300">
                                    {point.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline - Vertical Line Design */}
            <section className="py-24 px-6 bg-neutral-bg">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16 text-center" data-gsap-fade-up>
                        <span className="text-brand font-semibold text-sm tracking-wider uppercase mb-4 block">Our Journey</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Milestones</h2>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-border"></div>
                        
                        {milestones.map((milestone, index) => (
                            <div 
                                key={index}
                                className="relative pl-20 pb-16 last:pb-0 group"
                                data-gsap-fade-up
                            >
                                {/* Dot on timeline */}
                                <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-brand border-4 border-white shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                                
                                <div className="text-5xl font-bold text-brand mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">{milestone.year}</div>
                                <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">{milestone.event}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values - Grid of Icon Cards */}
            <section className="py-24 px-6 bg-neutral-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center" data-gsap-fade-up>
                        <span className="text-brand font-semibold text-sm tracking-wider uppercase mb-4 block">Our Values</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Core Principles</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-gsap-stagger>
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-neutral-bg border border-neutral-border rounded-2xl p-8 hover:shadow-xl hover:border-brand/50 transition-all duration-300 hover:-translate-y-1 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-6 group-hover:bg-brand transition-colors duration-300">
                                    <value.icon className="w-6 h-6 text-brand group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand transition-colors duration-300">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose SARC - Simple List */}
            <section className="py-24 px-6 bg-neutral-bg">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16" data-gsap-fade-up>
                        <span className="text-brand font-semibold text-sm tracking-wider uppercase mb-4 block">Why SARC</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">What Sets Us Apart</h2>
                    </div>

                    <div className="space-y-6" data-gsap-stagger>
                        {WHY_US_ITEMS.map((item, index) => (
                            <div
                                key={item.title}
                                className="border-b border-neutral-border pb-8 last:border-0 last:pb-0 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors duration-300">
                                        <item.icon className="w-5 h-5 text-brand group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand transition-colors duration-300">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center" data-gsap-scale>
                        <Button asChild size="lg" className="bg-brand hover:bg-brand/90 text-white h-12 px-8 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <Link href="/admissions">
                                Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
