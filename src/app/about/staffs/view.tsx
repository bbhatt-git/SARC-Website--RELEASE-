'use client';
import { STAFF_MEMBERS } from '@/lib/constants';
import Image from 'next/image';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { Facebook, Linkedin, Award, Users, Bot, Briefcase, HeartHandshake, CheckCircle, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { imageData } from '@/lib/image-data';

const departments = [
    { name: 'Academic Faculty', stat: '25+', icon: Users },
    { name: 'Innovation Labs Team', stat: '8+', icon: Bot },
    { name: 'Administration', stat: '12+', icon: Briefcase },
    { name: 'Student Welfare', stat: '6+', icon: HeartHandshake },
];

const teamQualities = [
    'Highly qualified with advanced degrees',
    'Passionate about student success',
    'Trained in modern teaching methodologies',
    'Experienced in project-based learning',
    'Committed to continuous professional development',
    'Approachable and supportive mentors',
];

const staffAchievements = [
    { title: "Excellence in Teaching", date: "2023", description: "Multiple national teaching awards and recognition" },
    { title: "Research Publications", date: "2022-2024", description: "Faculty papers published in international journals" },
    { title: "Student Success Rate", date: "Ongoing", description: "95%+ students achieving distinction in board exams" },
    { title: "Innovation Projects", date: "2023-2024", description: "50+ successful student projects guided by our team" },
]

type StaffMember = (typeof STAFF_MEMBERS)[0];

const StaffCard = ({ staff }: { staff: StaffMember }) => {
    const staffImage = (imageData.staff as any)[staff.id];

    return (
        <Card className="testimonial-card overflow-hidden text-center group h-full flex flex-col hover:-translate-y-1">
            <div className="relative bg-muted/30 pt-12 pb-6">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-8 h-24 w-24 rounded-full bg-gradient-to-tr from-brand/20 to-accent-green/20 opacity-0 transition-all duration-500 group-hover:scale-[3.5] group-hover:opacity-50"></div>
                <div className="relative mx-auto h-20 w-20 rounded-full ring-4 ring-background">
                    {staffImage && (
                        <Image
                            src={staffImage.src}
                            alt={`Portrait of ${staff.name}`}
                            fill
                            className="rounded-full object-cover"
                            data-ai-hint={staffImage.hint}
                        />
                    )}
                </div>
            </div>
            <CardContent className="flex flex-grow flex-col p-5 space-y-2">
                <div>
                    <h3 className="text-lg font-bold text-foreground">{staff.name}</h3>
                    <p className="font-medium text-brand text-sm">{staff.role}</p>
                    {'credentials' in staff && staff.credentials && (
                        <p className="text-xs text-muted-foreground mt-1">{staff.credentials}</p>
                    )}
                </div>
                <p className="flex-grow text-xs text-muted-foreground italic">"{staff.philosophy}"</p>
                <div className="flex items-center justify-center gap-3 pt-3 border-t border-neutral-border">
                    <Link href={staff.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Follow ${staff.name} on Facebook`} className="text-neutral-text-muted transition-colors hover:text-blue-600">
                        <Facebook size={18} />
                    </Link>
                     <Link href={staff.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Follow ${staff.name} on Instagram`} className="text-neutral-text-muted transition-colors hover:text-pink-500">
                        <Instagram size={18} />
                    </Link>
                    <Link href={staff.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Follow ${staff.name} on LinkedIn`} className="text-neutral-text-muted transition-colors hover:text-sky-700">
                        <Linkedin size={18} />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default function StaffsView() {
    const leadership = STAFF_MEMBERS.filter(s => ['Founder / CEO', 'Academic Director', 'Managing Director', 'Program Coordinator'].includes(s.role));
    const support = STAFF_MEMBERS.filter(s => ['Accountant', 'Receptionist', 'Support Staff'].includes(s.role));
    
    const teachingFacultyRoles = ['HOD (Science) | Physics', 'Physics', 'Chemistry', 'Biology', 'Botany', 'Computer Science', 'Mathematics', 'English & Literature', 'Nepali', 'Economics'];
    const faculty = STAFF_MEMBERS.filter(s => teachingFacultyRoles.includes(s.role) || s.role === 'Faculty');

    return (
        <div>
            <PageHeader title="Our Dedicated Staff" subtitle="Meet Our Team" />
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 space-y-16 md:space-y-20">
                
                {/* Departments Section */}
                 <section>
                    <SectionTitle title="Our Departments" subtitle="Specialized teams for student excellence" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-8 md:mt-10">
                        {departments.map((dept, index) => (
                            <Card key={index} className="testimonial-card text-center p-5 md:p-6 group relative overflow-hidden hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <dept.icon className="w-9 h-9 text-brand mx-auto mb-3" />
                                    <p className="text-3xl md:text-4xl font-bold text-foreground">{dept.stat}</p>
                                    <p className="text-muted-foreground mt-2">{dept.name}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Team Qualities Section */}
                <section className="max-w-4xl mx-auto">
                    <SectionTitle title="What Sets Our Team Apart" subtitle="Qualified and passionate professionals" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 md:mt-10">
                        {teamQualities.map((quality, index) => (
                            <div key={index} className="flex items-start gap-3 rounded-lg bg-neutral-surface p-3 border border-transparent hover:border-brand/20 transition-colors">
                                <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                                <p className="text-foreground text-sm">{quality}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Administrative Leadership Section */}
                <section>
                    <SectionTitle title="Administrative Leadership" subtitle="Guiding SARC's vision and operations" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-8 md:mt-10">
                        {leadership.map((staff) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}
                    </div>
                </section>

                {/* Teaching Faculty Section */}
                <section>
                    <SectionTitle title="Teaching Faculty" subtitle="Dedicated educators shaping young minds" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-8 md:mt-10">
                        {faculty.map((staff) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}
                    </div>
                </section>
                
                {/* Support Team Section */}
                <section>
                    <SectionTitle title="Support Team" subtitle="Ensuring smooth operations" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-8 md:mt-10">
                        {support.map((staff) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}
                    </div>
                </section>
                
                 {/* Staff Achievements Section */}
                <section>
                    <SectionTitle title="Staff Achievements" subtitle="Our Commitment to Excellence" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-8 md:mt-10">
                        {staffAchievements.map((ach, index) => (
                             <Card key={index} className="testimonial-card p-4 md:p-5 text-center group relative overflow-hidden hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <Award className="w-7 h-7 text-accent-yellow mx-auto mb-3" />
                                    <p className="font-semibold text-accent-yellow text-xs">{ach.date}</p>
                                    <h3 className="font-bold text-foreground mt-1 text-sm">{ach.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-2">{ach.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                 {/* Join Our Team CTA */}
                <section>
                    <Card className="testimonial-card bg-gradient-to-r from-brand to-accent-green p-5 md:p-6 text-center text-white">
                        <h2 className="text-2xl md:text-3xl font-bold">Join Our Team</h2>
                        <p className="mt-2 max-w-2xl mx-auto opacity-90 text-sm md:text-base">
                            Are you passionate about education and innovation? We're always looking for talented individuals to join our mission.
                        </p>
                        <Button asChild className="mt-4 md:mt-6 rounded-full bg-white text-brand hover:bg-white/90">
                            <Link href="/contact">Career Opportunities</Link>
                        </Button>
                    </Card>
                </section>

            </div>
        </div>
    );
}
