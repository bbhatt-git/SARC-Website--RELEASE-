'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import Image from 'next/image';
import { Check, Target, Building } from 'lucide-react';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { imageData } from '@/lib/image-data';
import { Timeline } from '@/app/components/timeline';

const missionItems = [
    { text: "Providing quality education that fosters critical thinking, innovation, and lifelong learning.", color: "border-sky-500" },
    { text: "Encouraging student-centered learning with a focus on practical knowledge and research-based education.", color: "border-emerald-500" },
    { text: "Promoting ethical leadership and social responsibility through value-based education.", color: "border-rose-500" },
    { text: "Creating a nurturing and inclusive environment where students can explore their full potential.", color: "border-amber-500" },
];

const milestones = [
    { year: 2017, event: "SARC Education Foundation was established with a vision for modern education." },
    { year: 2018, event: "First batch of +2 students graduated with excellent, district-topping results." },
    { year: 2019, event: "Introduced Management and Law streams for +2, expanding academic offerings." },
    { year: 2020, event: "Launched CTEVT programs to offer practical, vocational training for students." },
    { year: 2022, event: "Recognized as one of the top emerging colleges in the region for academic excellence." },
    { year: 2024, event: "Expanded campus with new state-of-the-art science and computer labs." }
];

export default function AboutView() {
    const timelineData = milestones.map(item => ({
        title: item.year.toString(),
        content: (
            <div className="testimonial-card p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                <h3 className="text-xl font-bold text-foreground">{item.event}</h3>
            </div>
        )
    }));

    return (
        <div>
            <PageHeader title="About SARC" subtitle="Our Story, Vision, and Commitment" />
            
            {/* Welcome Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <SectionTitle title="Nurturing Future Leaders Since 2017" subtitle="WELCOME TO SARC" align="left" />
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            SARC Education Foundation, located in Bhimdatta, Kanchanpur, is a leading educational institution dedicated to providing high-quality education with a focus on academic excellence, innovation, and holistic student development.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                             We are committed to shaping future leaders, thinkers, and innovators by fostering a culture of critical thinking, creativity, and ethical values. With a team of experienced faculty, state-of-the-art infrastructure, and a student-centric approach, SARC provides an ideal environment for academic and personal growth.
                        </p>
                    </div>
                    <div className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src={imageData.hero[0].src}
                            alt="SARC Campus"
                            fill
                            className="object-cover"
                            data-ai-hint={imageData.hero[0].hint}
                        />
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="bg-neutral-surface py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                             <div className="flex items-start gap-6">
                                <div className="bg-primary/10 p-4 rounded-full border border-primary/20 mt-1">
                                    <Target className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                                    <p className="text-muted-foreground text-lg mt-3 leading-relaxed">
                                        To be a leading institution in Nepal that sets benchmarks in academic excellence, research, and technological innovation. We aim to develop globally competent students and bridge the gap between academia and industry.
                                    </p>
                                </div>
                            </div>
                             <div className="flex items-start gap-6">
                                 <div className="bg-primary/10 p-4 rounded-full border border-primary/20 mt-1">
                                    <Building className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                                    <div className="grid md:grid-cols-1 gap-4 mt-4">
                                       {missionItems.map((item, index) => (
                                           <div key={index} className="flex items-start gap-3">
                                               <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                                               <p className="text-muted-foreground text-lg">{item.text}</p>
                                           </div>
                                       ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-lg">
                             <Image
                                src={imageData.hero[2].src}
                                alt="SARC Innovation"
                                fill
                                className="object-cover"
                                data-ai-hint={imageData.hero[2].hint}
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* History Section */}
            <section className="container mx-auto px-4 py-24">
                <SectionTitle title="Our Journey" subtitle="Key Milestones" />
                <div className="mt-16">
                    <Timeline data={timelineData} />
                </div>
            </section>

            {/* Why Choose SARC Section */}
            <section className="bg-neutral-surface py-24">
                <div className="container mx-auto px-4">
                    <SectionTitle title="Why Choose SARC?" subtitle="Our Commitment to Your Success" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {WHY_US_ITEMS.map((item) => (
                            <div
                                key={item.title}
                                className="testimonial-card p-8 flex items-start gap-6 h-full hover:-translate-y-2"
                            >
                                <div className="bg-primary/10 p-4 rounded-full border border-primary/20">
                                    <item.icon className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-lg">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
