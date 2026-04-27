'use client';
import PageHeader from '@/app/components/page-header';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { imageData } from '@/lib/image-data';

export default function FounderView() {
    return (
        <div>
            <PageHeader 
                title="Our Founder" 
                subtitle="The Visionary Behind SARC" 
            />
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-5 gap-16 items-center max-w-6xl mx-auto">
                        
                        {/* Founder's Profile Card */}
                        <div className="md:col-span-2">
                            <div className="testimonial-card p-6 text-center">
                                <div className="relative w-48 h-48 mx-auto">
                                    <Image
                                        src={imageData.staff.dr_laxman_basnet.src}
                                        alt="Laxman Basnet, Founder of SARC"
                                        fill
                                        className="rounded-full object-cover shadow-2xl"
                                        data-ai-hint={imageData.staff.dr_laxman_basnet.hint}
                                    />
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-2xl font-bold text-foreground">Laxman Basnet, Ph.D.</h3>
                                    <p className="text-primary font-medium mt-1">Founder & Visionary</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Ph.D. in Education | 20+ Years Experience
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Founder's Message */}
                        <div className="space-y-6 md:col-span-3">
                            <h2 className="text-3xl font-bold text-foreground">A Message from the Founder</h2>
                            
                            <div className="relative bg-card/50 backdrop-blur-sm border-l-4 border-primary p-6 rounded-r-xl shadow-lg">
                                <Quote className="w-12 h-12 text-primary/10 absolute -top-5 -left-5" />
                                <p className="text-xl font-semibold text-foreground italic relative z-10">
                                    “Learn with Purpose. Lead with Confidence.”
                                </p>
                            </div>
                            
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                SARC believes education should be modern, practical, and useful for real life. We combine books with activities, projects, and technology so students learn with purpose and grow with confidence.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Since our inception, the goal has been to create more than just a school. We envisioned a vibrant community dedicated to nurturing not just academic brilliance, but also the character, values, and essential life skills that shape future leaders and responsible global citizens. 
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
