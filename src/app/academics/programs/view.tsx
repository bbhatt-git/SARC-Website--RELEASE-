'use client';
import PageHeader from '@/app/components/page-header';
import {
    FlaskConical, Briefcase, Check, Package, Bus, Cpu, Users, Presentation, Network, School, Book, BookCopy, Leaf, Computer, BarChart, ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTitle from '@/app/components/section-title';

// Data for the page sections
const schoolProgramFeatures = [
    "Comprehensive curriculum aligned with national standards",
    "Hands-on science and math labs",
    "Cultural and artistic development programs",
    "Sports and physical education",
    "Early exposure to coding and robotics",
    "Character building and leadership skills",
];

const faculties = [
    {
        name: 'Science Faculty',
        icon: FlaskConical,
        description: "Our Science Faculty is dedicated to fostering innovation and critical thinking, preparing students for careers in technology, research, and healthcare.",
        streams: [
            {
                name: 'Bio Science',
                description: 'For students aspiring to careers in medicine, dentistry, pharmacy, and other health sciences, with a focus on biology, zoology, and botany.',
                icon: Leaf,
            },
            {
                name: 'Computer Science & Engineering',
                description: 'For students aiming for careers in engineering, IT, and software development, with in-depth knowledge of software development, programming, hardware, and algorithms.',
                icon: Computer,
            },
        ],
    },
    {
        name: 'Management Faculty',
        icon: Briefcase,
        description: "The Management Faculty equips students with the entrepreneurial and managerial skills needed to excel in the global business environment.",
        streams: [
            {
                name: 'Business',
                description: 'Focuses on core business principles including marketing, finance, and economics. Ideal for future entrepreneurs and corporate leaders.',
                icon: BarChart,
            },
            {
                name: 'Computer Commerce',
                description: 'A modern blend of commerce and information technology, preparing students for tech-driven business roles and e-commerce.',
                icon: ShoppingCart,
            },
        ],
    },
];

const teachingApproaches = [
    { icon: Package, title: "Project-Based Learning", description: "Students work on real-world problems and create tangible solutions." },
    { icon: Bus, title: "Experiential Tours", description: "Regular visits to research labs, industries, and science exhibitions." },
    { icon: Cpu, title: "Technology Integration", description: "AI, robotics, and digital tools embedded in daily learning." },
    { icon: Users, title: "Collaborative Environment", description: "Group projects, peer learning, and mentorship programs." },
    { icon: Presentation, title: "Assessment Beyond Exams", description: "Portfolio-based evaluation, presentations, and project demonstrations." },
    { icon: Network, title: "Industry Connect", description: "Guest lectures from innovators, entrepreneurs, and researchers." },
];

const subjectGroups = {
    science: {
        grade11: ["Com. English", "Com. Nepali", "Physics", "Chemistry", "Mathematics", "Biology/Computer Science"],
        grade12: ["Com. English", "Com. Nepali", "Physics", "Chemistry", "Biology/Mathematics", "Computer Science"]
    },
    management: {
        grade11: ["Com. English", "Com. Nepali", "Accountancy", "Economics", "Hotel Management / Business Studies / Mathematics", "Computer Science (Any 1)"],
        grade12: ["Com. English", "Business Mathematics/Marketing", "Accountancy", "Economics", "Hotel Management / Business Studies / Mathematics", "Computer Science (Any 1)"]
    }
};

export default function ProgramsView() {
    return (
        <div>
            <PageHeader title="Academic Programs" subtitle="Pathways to Your Future" />
            
            <div className="py-12 md:py-16 space-y-16 md:space-y-20">
                {/* School Program Section */}
                <section className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <Card className="testimonial-card overflow-hidden hover:-translate-y-1">
                        <CardHeader className="bg-card/50 p-5 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand/10 p-2.5 rounded-full">
                                    <School className="w-7 h-7 text-brand" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl md:text-2xl">School Program (ECD to Class 10)</CardTitle>
                                    <p className="text-muted-foreground mt-1 text-sm">Foundation years focusing on holistic development and core academic excellence.</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 md:p-6 grid md:grid-cols-2 gap-x-6 gap-y-3">
                            {schoolProgramFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                                    <p className="text-foreground text-sm">{feature}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                {/* 10+2 Faculties Section */}
                <section className="container mx-auto px-4 md:px-6">
                    <SectionTitle title="Our Faculties" subtitle="Expertise in Science & Management" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-10">
                        {faculties.map((faculty) => (
                            <Card key={faculty.name} className="testimonial-card h-full flex flex-col hover:-translate-y-1">
                                <CardHeader className="text-center items-center p-5 md:p-6">
                                    <div className="p-3 bg-brand/10 rounded-full inline-block mb-3">
                                        <faculty.icon className="w-8 h-8 text-brand" />
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl">{faculty.name}</CardTitle>
                                    <CardDescription className="pt-2 max-w-md mx-auto text-sm">{faculty.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 p-5 md:p-6 flex-grow">
                                    {faculty.streams.map((stream) => (
                                        <div key={stream.name} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/70 hover:border-brand/50 transition-colors duration-300">
                                                <div className="bg-accent-green/10 p-2 rounded-full mt-0.5">
                                                <stream.icon className="w-5 h-5 text-accent-green" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base text-foreground">{stream.name}</h4>
                                                <p className="text-muted-foreground text-xs">{stream.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Teaching Approach Section */}
                <section className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <SectionTitle title="Our Teaching Approach" subtitle="Learning for the 21st Century" />
                     <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground text-sm">Learning methods designed for the 21st century and beyond.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-8 md:mt-10">
                        {teachingApproaches.map((item, index) => (
                             <div key={item.title} className="testimonial-card text-center p-5 md:p-6 h-full hover:-translate-y-1">
                                <div className="inline-block bg-brand/10 text-brand p-3 rounded-full mb-3">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Subject Groups Section */}
                <section className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <SectionTitle title="+2 Subject Groups" subtitle="Official Combinations" />
                     <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground text-sm">Official combinations for Science and Management (Grade XI/XII).</p>
                    <Tabs defaultValue="science" className="w-full mt-8 md:mt-10">
                        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                            <TabsTrigger value="science">Science</TabsTrigger>
                            <TabsTrigger value="management">Management</TabsTrigger>
                        </TabsList>
                        <TabsContent value="science">
                            <SubjectGroupTable group={subjectGroups.science} />
                        </TabsContent>
                        <TabsContent value="management">
                            <SubjectGroupTable group={subjectGroups.management} />
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
        </div>
    );
}

function SubjectGroupTable({ group }: { group: { grade11: string[], grade12: string[] } }) {
    return (
        <Card className="testimonial-card p-0 mt-4 md:mt-6">
            <div className="grid md:grid-cols-2 gap-px bg-border/20 rounded-lg overflow-hidden">
                <div className="bg-card p-4 md:p-5">
                    <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-foreground">Grade XI</h3>
                    <ul className="space-y-2 md:space-y-3">
                        {group.grade11.map(subject => (
                            <li key={subject} className="flex items-center gap-2 md:gap-3">
                                <BookCopy className="w-4 h-4 text-brand" />
                                <span className="text-muted-foreground text-sm">{subject}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-card p-4 md:p-5">
                    <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-foreground">Grade XII</h3>
                    <ul className="space-y-2 md:space-y-3">
                        {group.grade12.map(subject => (
                            <li key={subject} className="flex items-center gap-2 md:gap-3">
                                <BookCopy className="w-4 h-4 text-brand" />
                                <span className="text-muted-foreground text-sm">{subject}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    )
}
