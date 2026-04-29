'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { imageData } from '@/lib/image-data';
import { ArrowRight } from 'lucide-react';
import { TESTIMONIALS, WHY_US_ITEMS } from '@/lib/constants';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';
import { Marquee } from '@/app/components/marquee';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Based on the SkillForge UI the user liked.

const faqItems = [
    {
        question: "What grades/levels does SARC Education Foundation offer?",
        answer: "We offer classes from Nursery through Grade 12, plus +2 programs."
    },
    {
        question: "Where is SARC Education Foundation located?",
        answer: "We are located in Mahendranagar, Kanchanpur, Sudurpashchim Province, Nepal."
    },
    {
        question: "What is the medium of instruction?",
        answer: "We teach in both English and Nepali mediums."
    },
    {
        question: "How do I apply for admission?",
        answer: "Visit our school office or contact us to collect and submit the admission form."
    },
    {
        question: "What extracurricular activities are available?",
        answer: "We offer sports, debate, cultural programs, and science exhibitions."
    },
    {
        question: "Does SARC provide scholarships or financial aid?",
        answer: "Yes, merit-based and need-based scholarships are available for eligible students."
    },
    {
        question: "Is transportation available for students?",
        answer: "Yes, we provide school bus service covering major areas of Mahendranagar."
    },
    {
        question: "What board/curriculum does the school follow?",
        answer: "We follow the National Examination Board (NEB) curriculum set by the Government of Nepal."
    }
]

export default function HomeView() {
    return (
        <>
            <HeroSection />
            <FeatureCardsSection />
            <StatsTicker />
            <ProgressSection />
            <PopularProgramsSection />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
        </>
    );
}

const HeroSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress for a buttery feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40, // Lower stiffness = slower response
        damping: 20,   // Balanced damping = smooth finish
        restDelta: 0.001
    });

    // Scale from 1 to 1.3 to avoid overzooming and pixelation
    const scale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
    
    // Text and overlay fades out as we scroll down
    const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
    const y = useTransform(smoothProgress, [0, 0.5], [0, -80]);
    
    // Background overlay darkens slightly more as we zoom
    const bgOpacity = useTransform(smoothProgress, [0, 1], [0.6, 0.8]);

    return (
        <section ref={containerRef} className="relative w-full h-[150vh] md:h-[200vh] bg-neutral-bg">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-24 md:pt-32 pb-20 md:pb-32">
                {/* Background Image with Zoom */}
                <motion.div style={{ scale }} className="absolute inset-0 z-0 origin-center will-change-transform">
                    <Image
                        src="/images/hero-bg.png"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-50 dark:opacity-30"
                        priority
                    />
                </motion.div>
                
                {/* Dynamic Overlay */}
                <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-gradient-to-b from-neutral-bg/30 via-neutral-bg/70 to-neutral-bg z-0 pointer-events-none will-change-transform" />

                <motion.div style={{ opacity, y }} className="w-full max-w-[1200px] px-4 md:px-6 mx-auto z-10 flex flex-col items-center text-center will-change-transform">
                    <div className="inline-flex items-center gap-2 bg-neutral-bg/80 backdrop-blur px-4 py-2 rounded-full shadow-sm mb-6 border border-neutral-border">
                        <span className="font-semibold text-sm">Top Rated Academy in Far-West Nepal</span>
                    </div>

                    <h1 className="max-w-[800px] text-4xl md:text-[64px] md:leading-[1.1] font-bold capitalize mb-6">
                        Pioneering Futures with <span className="text-brand">Elite Mentorship</span>
                    </h1>

                    <p className="max-w-[600px] text-neutral-text-muted text-base md:text-xl mb-10">
                        Join the leading educational institution in Kanchanpur. Personalized tuition, modern labs, and a curriculum designed for the future.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Button asChild size="lg" className="h-12 px-8 rounded-xl font-semibold group text-lg">
                            <Link href="/admissions">
                                Apply Now <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-xl font-semibold text-lg bg-neutral-bg/50 backdrop-blur">
                            <Link href="/academics/programs">Explore Programs</Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Refined Smooth Asymmetrical Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px] fill-[#f9fafb] dark:fill-neutral-bg">
                        <path d="M0,80 C300,120 600,0 1200,60 L1200,120 L0,120 Z" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

const FeatureCardsSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const getPoints = (delay: number) => [0.1 + delay, 0.35 + delay, 0.55 - delay, 0.85 - delay];
    const getOpacityPoints = (delay: number) => [0.1 + delay, 0.3 + delay, 0.6 - delay, 0.85 - delay];

    // Individual Transforms for each card - OPTIMIZED FOR MOBILE 'TILT-IN'
    // 1. Robotics Lab (Top Left 1)
    const card1_points = getPoints(0);
    const card1_x = useTransform(smoothProgress, card1_points, [isMobile ? 0 : -200, 0, 0, isMobile ? 0 : -200]);
    const card1_y = useTransform(smoothProgress, card1_points, [isMobile ? 120 : 0, 0, 0, isMobile ? 120 : 0]);
    const card1_opacity = useTransform(smoothProgress, getOpacityPoints(0), [0, 1, 1, 0]);
    const card1_scale = useTransform(smoothProgress, card1_points, [isMobile ? 0.85 : 1.4, 1, 1, isMobile ? 0.85 : 1.4]);
    const card1_rotate = useTransform(smoothProgress, card1_points, [isMobile ? 15 : -12, 0, 0, isMobile ? -15 : 12]);

    // 2. Science Lab (Top Left 2)
    const card2_points = getPoints(0.04);
    const card2_x = useTransform(smoothProgress, card2_points, [isMobile ? 0 : -250, 0, 0, isMobile ? 0 : -250]);
    const card2_y = useTransform(smoothProgress, card2_points, [isMobile ? 140 : 0, 0, 0, isMobile ? 140 : 0]);
    const card2_opacity = useTransform(smoothProgress, getOpacityPoints(0.04), [0, 1, 1, 0]);
    const card2_scale = useTransform(smoothProgress, card2_points, [isMobile ? 0.86 : 1.45, 1, 1, isMobile ? 0.86 : 1.45]);
    const card2_rotate = useTransform(smoothProgress, card2_points, [isMobile ? 18 : -15, 0, 0, isMobile ? -18 : 15]);

    // 3. Success Rate (Bottom Left)
    const card3_points = getPoints(0.08);
    const card3_x = useTransform(smoothProgress, card3_points, [isMobile ? 0 : -300, 0, 0, isMobile ? 0 : -300]);
    const card3_y = useTransform(smoothProgress, card3_points, [isMobile ? 160 : 180, 0, 0, isMobile ? 160 : 180]);
    const card3_opacity = useTransform(smoothProgress, getOpacityPoints(0.08), [0, 1, 1, 0]);
    const card3_scale = useTransform(smoothProgress, card3_points, [isMobile ? 0.87 : 1.5, 1, 1, isMobile ? 0.87 : 1.5]);
    const card3_rotate = useTransform(smoothProgress, card3_points, [isMobile ? 20 : -18, 0, 0, isMobile ? -20 : 18]);

    // 4. Interactive Session (Center)
    const card4_points = getPoints(0.06);
    const card4_y = useTransform(smoothProgress, card4_points, [isMobile ? 180 : 250, 0, 0, isMobile ? 180 : 250]);
    const card4_opacity = useTransform(smoothProgress, getOpacityPoints(0.06), [0, 1, 1, 0]);
    const card4_scale = useTransform(smoothProgress, card4_points, [isMobile ? 0.85 : 1.4, 1, 1, isMobile ? 0.85 : 1.4]);
    const card4_rotate = useTransform(smoothProgress, card4_points, [isMobile ? 10 : 0, 0, 0, isMobile ? -10 : 0]);

    // 5. Academic Programs (Top Right)
    const card5_points = getPoints(0.02);
    const card5_x = useTransform(smoothProgress, card5_points, [isMobile ? 0 : 250, 0, 0, isMobile ? 0 : 250]);
    const card5_y = useTransform(smoothProgress, card5_points, [isMobile ? 140 : 0, 0, 0, isMobile ? 140 : 0]);
    const card5_opacity = useTransform(smoothProgress, getOpacityPoints(0.02), [0, 1, 1, 0]);
    const card5_scale = useTransform(smoothProgress, card5_points, [isMobile ? 0.86 : 1.4, 1, 1, isMobile ? 0.86 : 1.4]);
    const card5_rotate = useTransform(smoothProgress, card5_points, [isMobile ? 15 : 15, 0, 0, isMobile ? -15 : -15]);

    // 6. Resource Library (Bottom Right)
    const card6_points = getPoints(0.08);
    const card6_x = useTransform(smoothProgress, card6_points, [isMobile ? 0 : 300, 0, 0, isMobile ? 0 : 300]);
    const card6_y = useTransform(smoothProgress, card6_points, [isMobile ? 160 : 200, 0, 0, isMobile ? 160 : 200]);
    const card6_opacity = useTransform(smoothProgress, getOpacityPoints(0.08), [0, 1, 1, 0]);
    const card6_scale = useTransform(smoothProgress, card6_points, [isMobile ? 0.87 : 1.5, 1, 1, isMobile ? 0.87 : 1.5]);
    const card6_rotate = useTransform(smoothProgress, card6_points, [isMobile ? 18 : 18, 0, 0, isMobile ? -18 : -18]);

    return (
        <section ref={containerRef} className="py-20 md:py-40 bg-[#f9fafb] dark:bg-neutral-bg overflow-hidden relative -mt-1">
            <div className="w-full max-w-[1200px] px-4 md:px-6 mx-auto z-10">
                {/* Hero Grid Cards with Staggered Scroll-Based Animation */}
                <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 h-auto md:h-[500px]">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 h-full">
                        {/* Top Image Cards - Individual Animations */}
                        <div className="grid grid-cols-2 gap-4 h-[200px]">
                            <motion.div 
                                style={!isMobile ? { x: card1_x, y: card1_y, opacity: card1_opacity, scale: card1_scale, rotate: card1_rotate } : {}}
                                initial={isMobile ? { opacity: 0, y: 50, scale: 0.9, rotate: -5 } : {}}
                                whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative rounded-2xl overflow-hidden group bg-card border border-border shadow-lg"
                            >
                                <Image src={imageData.gallery[16].src} alt="Robotics lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fill data-ai-hint={imageData.gallery[16].hint} />
                            </motion.div>
                            <motion.div 
                                style={!isMobile ? { x: card2_x, y: card2_y, opacity: card2_opacity, scale: card2_scale, rotate: card2_rotate } : {}}
                                initial={isMobile ? { opacity: 0, y: 50, scale: 0.9, rotate: 5 } : {}}
                                whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                className="relative rounded-2xl overflow-hidden group bg-card border border-border shadow-lg"
                            >
                                <Image src={imageData.gallery[20].src} alt="Science lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fill data-ai-hint={imageData.gallery[20].hint} />
                            </motion.div>
                        </div>

                        {/* Success Rate Card - Come from left bottom staggered */}
                        <motion.div 
                            style={!isMobile ? { x: card3_x, y: card3_y, opacity: card3_opacity, scale: card3_scale, rotate: card3_rotate } : {}}
                            initial={isMobile ? { opacity: 0, y: 60, scale: 0.95 } : {}}
                            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : {}}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white dark:bg-neutral-surface rounded-2xl p-6 flex flex-col justify-between flex-grow border border-accent-pink/30 shadow-xl relative overflow-hidden text-left"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                            <div className="flex -space-x-3 z-10">
                                {TESTIMONIALS.slice(0, 3).map((t, i) => (
                                    <Image key={i} src={t.image} width={42} height={42} className="w-10 h-10 rounded-full border-2 border-neutral-bg object-cover shadow-sm" alt={`Student ${i + 1}`} />
                                ))}
                                <div className="w-10 h-10 rounded-full bg-accent-pink/20 border-2 border-neutral-bg flex items-center justify-center text-[10px] font-bold text-accent-pink">+1k</div>
                            </div>
                            <div className="flex justify-between items-end mt-4 z-10">
                                <div>
                                    <h2 className="text-[48px] leading-[1] font-bold text-foreground">95%</h2>
                                    <p className="text-sm text-neutral-text-muted font-semibold tracking-wide">Student Success Rate</p>
                                </div>
                                <Button asChild size="sm" className="h-9 px-4 rounded-lg bg-accent-pink text-white font-bold hover:opacity-90 transition-opacity">
                                    <Link href="/admissions">Join Us</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Center Column - Interactive Session - Come from bottom staggered */}
                    <motion.div 
                        style={!isMobile ? { y: card4_y, opacity: card4_opacity, scale: card4_scale, rotateX: 0 } : {}}
                        initial={isMobile ? { opacity: 0, y: 80, scale: 0.9, rotateX: 20 } : {}}
                        whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative rounded-2xl overflow-hidden h-[500px] group bg-card border border-border shadow-xl"
                    >
                        <Image src={imageData.hero[1].src} alt="Live Coaching" fill className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-ai-hint={imageData.hero[1].hint} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-10 left-0 w-full px-6 z-20 text-center">
                            <span className="bg-brand px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3 inline-block text-white shadow-lg">Hybrid Learning</span>
                            <h3 className="text-2xl font-bold text-white mb-2">Interactive Coaching Sessions</h3>
                            <p className="text-white/80 text-sm max-w-[250px] mx-auto">Bridging the gap between physical and digital education.</p>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4 h-[500px]">
                        {/* Academic Programs - From Right Middle staggered */}
                        <motion.div 
                            style={!isMobile ? { x: card5_x, y: card5_y, opacity: card5_opacity, scale: card5_scale, rotate: card5_rotate } : {}}
                            initial={isMobile ? { opacity: 0, y: 70, scale: 0.95 } : {}}
                            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : {}}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white dark:bg-neutral-surface rounded-2xl p-6 flex flex-col justify-between h-[270px] relative overflow-hidden border border-accent-lightgreen/30 shadow-xl text-left"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-lightgreen/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                            <div className="z-10">
                                <h2 className="text-[48px] leading-[1] font-bold text-foreground">5+</h2>
                                <p className="text-sm text-neutral-text-muted font-semibold tracking-wide mb-4">Academic Programs</p>
                                <p className="font-bold text-lg text-foreground leading-snug">+2 Science, Management, Law, CTEVT, and specialized Bridge Courses.</p>
                            </div>
                            <Link href="/academics/programs" className="z-10 inline-flex items-center text-sm font-bold text-accent-lightgreen hover:underline gap-1">
                                View all programs <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* Resource Library - From Right Bottom staggered */}
                        <motion.div 
                            style={!isMobile ? { x: card6_x, y: card6_y, opacity: card6_opacity, scale: card6_scale, rotate: card6_rotate } : {}}
                            initial={isMobile ? { opacity: 0, y: 80, scale: 0.95 } : {}}
                            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : {}}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white dark:bg-neutral-surface rounded-2xl p-6 flex flex-col justify-between flex-grow overflow-hidden border border-accent-yellow/30 shadow-xl relative text-left"
                        >
                            <div className="absolute top-0 right-0 w-36 h-36 bg-accent-yellow/5 rounded-full -mr-18 -mt-18 blur-3xl" />
                            <p className="font-bold text-xl text-foreground mb-4 z-10">Resource Library</p>
                            <div className="flex flex-col gap-3 z-10">
                                <div className="flex gap-2">
                                    <span className="bg-neutral-surface px-4 py-2 rounded-xl text-[12px] font-bold border border-neutral-border shadow-sm">Digital Notes</span>
                                    <span className="bg-neutral-surface px-4 py-2 rounded-xl text-[12px] font-bold border border-neutral-border shadow-sm">Online Tests</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="bg-neutral-surface px-4 py-2 rounded-xl text-[12px] font-bold border border-neutral-border shadow-sm">PDF Library</span>
                                    <span className="bg-neutral-surface px-4 py-2 rounded-xl text-[12px] font-bold border border-neutral-border shadow-sm">Lectures</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const ProgramText = ({ name }: { name: string }) => (
    <div className="flex items-center gap-4">
        <span className="w-1.5 h-1.5 rounded-full bg-brand/60"></span>
        <span className="text-sm font-medium text-neutral-text-muted tracking-wide uppercase whitespace-nowrap">{name}</span>
    </div>
);

const StatsTicker = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // We use a large range and percentage to ensure it always covers the screen
    const x = useTransform(scrollYProgress, [0, 1], ["-10%", "-60%"]);

    const programs = [
        '+2 Science',
        'Bridge Course',
        'Primary Education',
        '+2 Management',
        'Secondary Education',
    ];

    // Triple duplication for a truly dense, infinite feel
    const duplicatedPrograms = Array(12).fill(programs).flat();

    return (
        <section ref={sectionRef} className="py-6 bg-neutral-surfaceAlt overflow-hidden border-y border-neutral-border mt-10">
            <motion.div style={{ x }} className="flex gap-16 whitespace-nowrap">
                {duplicatedPrograms.map((program, index) => (
                    <ProgramText key={`${program}-${index}`} name={program} />
                ))}
            </motion.div>
        </section>
    );
};

const progressFeatures = [
    { side: 'left', delay: 0, title: WHY_US_ITEMS[0].title, description: WHY_US_ITEMS[0].description },
    { side: 'right', delay: 0, title: WHY_US_ITEMS[1].title, description: WHY_US_ITEMS[1].description },
    { side: 'left', delay: 100, title: WHY_US_ITEMS[2].title, description: WHY_US_ITEMS[2].description, offset: true },
    { side: 'right', delay: 100, title: WHY_US_ITEMS[3].title, description: WHY_US_ITEMS[3].description, offset: true },
    { side: 'left', delay: 200, title: WHY_US_ITEMS[4].title, description: WHY_US_ITEMS[4].description },
    { side: 'right', delay: 200, title: WHY_US_ITEMS[5].title, description: WHY_US_ITEMS[5].description },
];

const ProgressFeature = ({ scrollYProgress, item, index, isMobile, side }: {
    scrollYProgress: any,
    item: any,
    index: number,
    isMobile: boolean,
    side: 'left' | 'right'
}) => {
    const startOffset = 0.2;
    const mobileStart = 0.15; // Trigger earlier on mobile

    const points = isMobile
        ? [mobileStart + index * 0.08, mobileStart + 0.25 + index * 0.08, 0.75, 0.95]
        : [startOffset + index * 0.05, startOffset + 0.2 + index * 0.05, 0.65, 0.85];

    const x = useTransform(scrollYProgress, points,
        isMobile ? [0, 0, 0, 0] : [side === 'left' ? -100 : 100, 0, 0, side === 'left' ? -100 : 100]
    );

    const y = useTransform(scrollYProgress, points,
        isMobile ? [30, 0, 0, 30] : [0, 0, 0, 0]
    );

    const opacity = useTransform(scrollYProgress,
        isMobile ? [mobileStart + index * 0.08, mobileStart + 0.15 + index * 0.08, 0.8, 0.95] : [startOffset + index * 0.05, startOffset + 0.15 + index * 0.05, 0.75, 0.85],
        [0, 1, 1, 0]
    );

    const scale = useTransform(scrollYProgress, points, [isMobile ? 0.9 : 0.9, 1, 1, isMobile ? 0.9 : 0.9]);
    const rotateX = useTransform(scrollYProgress, points, [isMobile ? 0 : 45, 0, 0, isMobile ? 0 : 45]);

    return (
        <motion.div
            style={!isMobile ? { x, y, opacity, scale, rotateX, transformStyle: "preserve-3d" } : { x, y, opacity, scale }}
            initial={isMobile ? { opacity: 0, y: 30 } : {}}
            whileInView={isMobile ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col items-center ${side === 'left' ? 'lg:items-end' : 'lg:items-start'} gap-3 ${item.offset && !isMobile ? (side === 'left' ? 'lg:mr-12' : 'lg:ml-12') : ''}`}
        >
            <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold border-2 border-brand/20 mb-1 shadow-md">
                {`0${index + 1}`}
            </div>
            <h3 className="text-xl md:text-3xl font-bold leading-tight text-foreground">{item.title}</h3>
            <p className="text-sm md:text-lg text-neutral-text-muted max-w-[320px] leading-relaxed">{item.description}</p>
        </motion.div>
    );
};

const ProgressSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001
    });

    // Center Image Transforms (Clean parallax)
    const centerScale = useTransform(smoothProgress, [0.05, 0.4, 0.7, 0.95], [0.7, 1, 1, 0.7]);
    const centerOpacity = useTransform(smoothProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
    const centerZ = useTransform(smoothProgress, [0.05, 0.4, 0.7, 0.95], [-200, 0, 0, -200]);

    // Header Transforms
    const headerOpacity = useTransform(smoothProgress, [0, 0.1, 0.85, 0.95], [0, 1, 1, 0]);
    const headerY = useTransform(smoothProgress, [0, 0.1, 0.85, 0.95], [80, 0, 0, 80]);
    const headerScale = useTransform(smoothProgress, [0, 0.1, 0.85, 0.95], [0.8, 1, 1, 0.8]);

    // Ring Transforms
    const ringScale = useTransform(smoothProgress, [0.1, 0.5, 0.6, 0.85], [0.5, 1.2, 1.2, 0.5]);
    const ringOpacity = useTransform(smoothProgress, [0.1, 0.5, 0.6, 0.85], [0, 0.5, 0.5, 0]);

    return (
        <section ref={sectionRef} id="progress-section" className="py-16 md:py-32 bg-neutral-bg overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 relative">
                <motion.div
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="max-w-[600px] mx-auto text-center mb-12 md:mb-24"
                >
                    <h2 className="text-3xl md:text-[56px] font-bold leading-[1.1] capitalize">
                        Steady Progress,<br className="hidden md:block" />Endless Potential
                    </h2>
                </motion.div>

                {isMobile ? (
                    <div className="flex flex-col gap-16">
                        {/* Center Image for Mobile - Top of list or middle? User usually prefers middle but let's see */}
                        <div className="relative flex justify-center items-center py-8" style={{ perspective: "2000px" }}>
                            <motion.div
                                style={{ scale: centerScale, opacity: centerOpacity, z: centerZ }}
                                className="relative w-[280px] h-[280px] rounded-full bg-neutral-surfaceAlt overflow-hidden shadow-2xl z-10 border-4 border-white dark:border-neutral-surface"
                            >
                                <Image src={imageData.hero[3].src} alt="Student success" className="w-full h-full object-cover" fill data-ai-hint={imageData.hero[3].hint} />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent"></div>
                            </motion.div>
                        </div>

                        {/* Features in order 01-06 */}
                        <div className="flex flex-col gap-12 text-center">
                            {progressFeatures.map((item, i) => (
                                <ProgressFeature key={item.title} scrollYProgress={smoothProgress} item={item} index={i} isMobile={isMobile} side={item.side as any} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-8 items-center relative">
                        {/* Left Features */}
                        <div className="flex flex-col justify-between h-full py-6 space-y-12 lg:space-y-24 text-center lg:text-right order-2 lg:order-1">
                            {progressFeatures.map((item, i) => item.side === 'left' ? (
                                <ProgressFeature key={item.title} scrollYProgress={smoothProgress} item={item} index={i} isMobile={isMobile} side="left" />
                            ) : null)}
                        </div>

                        {/* Center Image */}
                        <div className="relative flex justify-center items-center order-1 lg:order-2" style={{ perspective: "2000px" }}>
                            <motion.div
                                style={{ scale: centerScale, opacity: centerOpacity, z: centerZ }}
                                className="relative w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full bg-neutral-surfaceAlt overflow-hidden shadow-2xl z-10 border-4 md:border-[12px] border-white dark:border-neutral-surface"
                            >
                                <Image src={imageData.hero[3].src} alt="Student success" className="w-full h-full object-cover" fill data-ai-hint={imageData.hero[3].hint} />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent"></div>
                            </motion.div>

                            {/* Decorative Rings */}
                            {!isMobile && (
                                <motion.div
                                    style={{ scale: ringScale, opacity: ringOpacity }}
                                    className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-brand/20 -z-10"
                                />
                            )}
                        </div>

                        {/* Right Features */}
                        <div className="flex flex-col justify-between h-full py-6 space-y-12 lg:space-y-24 text-center lg:text-left order-3">
                            {progressFeatures.map((item, i) => item.side === 'right' ? (
                                <ProgressFeature key={item.title} scrollYProgress={smoothProgress} item={item} index={i} isMobile={isMobile} side="right" />
                            ) : null)}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const programData = [
    {
        title: "ECD (Nursery-KG)",
        description: "Foundational early childhood development focusing on play-based learning and social skills.",
        image: imageData.gallery[10].src,
        hint: imageData.gallery[10].hint,
        tag: "EARLY YEARS",
    },
    {
        title: "Primary (1-5)",
        description: "Comprehensive primary education building core literacy, numeracy, and critical thinking.",
        image: imageData.gallery[1].src,
        hint: imageData.gallery[1].hint,
        tag: "PRIMARY",
    },
    {
        title: "Secondary (6-10)",
        description: "Advanced secondary curriculum preparing students for higher academic challenges.",
        image: imageData.gallery[5].src,
        hint: imageData.gallery[5].hint,
        tag: "SECONDARY",
    },
    {
        title: "+2 Science",
        description: "A rigorous program for aspiring engineers and medical professionals, focusing on STEM subjects.",
        image: imageData.gallery[20].src,
        hint: imageData.gallery[20].hint,
        tag: "SCIENCE STREAM",
    },
    {
        title: "+2 Management",
        description: "Equips students with business, finance, and economics fundamentals for future leadership.",
        image: imageData.gallery[3].src,
        hint: imageData.gallery[3].hint,
        tag: "MANAGEMENT",
    },
    {
        title: "Bridge Courses",
        description: "Specialized courses to bridge the gap between secondary and higher education streams.",
        image: imageData.gallery[16].src,
        hint: imageData.gallery[16].hint,
        tag: "PREPARATORY",
    }
];

const ProgramCard = ({ program, i }: { program: any, i: number }) => {
    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                rotateY: 90, 
                scale: 0.7,
                z: -500 
            }}
            whileInView={{ 
                opacity: 1, 
                rotateY: 0, 
                scale: 1,
                z: 0 
            }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{
                duration: 1.2,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1] // Custom smooth ease
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="bg-neutral-surface border border-neutral-border rounded-2xl p-5 pb-8 flex flex-col group hover:shadow-2xl transition-shadow duration-500 will-change-transform"
        >
            <div className="relative w-full h-[240px] rounded-xl overflow-hidden mb-6 bg-white shadow-inner">
                <Image src={program.image} alt={program.title} fill className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" data-ai-hint={program.hint} />
                <div className="absolute top-4 left-4 bg-brand text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">{program.tag}</div>
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-brand transition-colors">{program.title}</h3>
            <p className="text-neutral-text-muted text-sm leading-relaxed mb-6">{program.description}</p>
            <div className="mt-auto">
                <Button variant="outline" size="sm" className="rounded-xl font-bold group-hover:bg-brand group-hover:text-white transition-all shadow-sm">Learn More</Button>
            </div>
        </motion.div>
    );
};

const PopularProgramsSection = () => {
    return (
        <section id="exams" className="py-20 md:py-32 bg-neutral-bg px-4 md:px-6 overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="max-w-[500px]"
                    >
                        <h2 className="text-3xl md:text-[56px] md:leading-[1.1] font-bold mb-4">Our Premier Programs</h2>
                        <p className="text-neutral-text-muted text-lg">Specialized programs designed for academic excellence and career success.</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ perspective: "2000px" }}>
                    {programData.map((program, i) => (
                        <ProgramCard key={program.title} program={program} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};


const TestimonialsSection = () => (
    <section id="testimonials" className="py-10 md:py-16 bg-neutral-surfaceAlt">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div data-gsap-fade-up className="text-center mb-8 md:mb-10">
                <h2 className="text-3xl md:text-[48px] md:leading-[1.1] font-bold mb-3">Our Community Speaks</h2>
                <p className="text-neutral-text-muted max-w-[550px] mx-auto">Hear from students, parents, and faculty who have experienced the SARC difference.</p>
            </div>
        </div>
        <div data-gsap-fade-up>
            <StaggerTestimonials />
        </div>
    </section>
);


const FaqSection = () => (
    <section id="faq" className="max-w-[1200px] mx-auto py-10 md:py-16 px-4 md:px-6 bg-neutral-surfaceAlt md:rounded-[20px]">
        <div className="max-w-[800px] mx-auto">
            <div data-gsap-fade-up className="flex flex-col items-center text-center max-w-[500px] mx-auto mb-8 md:mb-10">
                <h2 className="text-3xl md:text-[48px] md:leading-[1.1] font-bold">Common Queries</h2>
            </div>
            <div className="max-w-3xl mx-auto flex flex-col gap-3">
                <Accordion type="single" collapsible className="w-full space-y-3">
                    {faqItems.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`} data-gsap-fade-up className="border border-neutral-border bg-neutral-bg rounded-xl px-5 hover:bg-neutral-surface transition-colors">
                            <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-4">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="pt-2 pb-4 text-neutral-text-muted leading-relaxed">{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    </section>
);

const ContactSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Text animations (Coming from extreme top-left near navbar)
    const textX = useTransform(scrollYProgress, [0, 0.4], [-800, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.4], [-1000, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.4], [1.5, 1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.5, 1]);

    // Form animations (Coming from extreme top-right near navbar)
    const formX = useTransform(scrollYProgress, [0, 0.4], [800, 0]);
    const formY = useTransform(scrollYProgress, [0, 0.4], [-1000, 0]);
    const formOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.5, 1]);

    return (
        <section ref={containerRef} id="contact" className="max-w-[1200px] mx-auto py-10 md:py-32 px-4 md:px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                <motion.div 
                    style={isDesktop ? { x: textX, y: textY, scale: textScale, opacity: textOpacity } : {}}
                    initial={!isDesktop ? { opacity: 0, y: 30 } : {}}
                    whileInView={!isDesktop ? { opacity: 1, y: 0 } : {}}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-[56px] md:leading-[1.1] font-bold mb-6">Talk to an Academic Counselor</h2>
                    <p className="text-neutral-text-muted text-lg md:text-xl leading-relaxed max-w-[500px]">Not sure which program fits you? Schedule a free counseling session today with our expert faculty members.</p>
                </motion.div>
                
                <motion.div 
                    style={isDesktop ? { x: formX, y: formY, opacity: formOpacity } : {}}
                    initial={!isDesktop ? { opacity: 0, y: 30 } : {}}
                    whileInView={!isDesktop ? { opacity: 1, y: 0 } : {}}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white dark:bg-neutral-surface border border-neutral-border p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-sm"
                >
                    <form action="/contact" className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-text ml-1">Full Name</label>
                                <input type="text" name="name" placeholder="Full Name" className="w-full h-14 px-5 rounded-xl border border-neutral-border focus:border-brand outline-none bg-white transition-all focus:shadow-lg" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-text ml-1">Email Address</label>
                                <input type="email" name="email" placeholder="Email Address" className="w-full h-14 px-5 rounded-xl border border-neutral-border focus:border-brand outline-none bg-white transition-all focus:shadow-lg" required />
                            </div>
                        </div>
                        <Button type="submit" size="lg" className="w-full h-14 rounded-xl bg-brand hover:bg-brand/90 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            Request Callback
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
