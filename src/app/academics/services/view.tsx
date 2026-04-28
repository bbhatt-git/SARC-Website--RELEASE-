'use client';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { 
    Library, Bus, Utensils, HeartHandshake, Microscope, Wifi, ShieldCheck, Gamepad2, Presentation,
    Cpu, BrainCircuit, Leaf, CircuitBoard, Rocket, Building, Globe
} from 'lucide-react';

const facilities = [
    { title: 'Modern Science & Computer Labs', icon: Microscope, description: 'Fully equipped physics, chemistry, biology, and computer labs for practical, hands-on learning.' },
    { title: 'Resourceful Library', icon: Library, description: 'Access a vast collection of books, journals, and digital resources to support your academic journey.' },
    { title: 'Smart Classrooms', icon: Presentation, description: 'Interactive and tech-based learning with modern audio-visual aids to enhance engagement.' },
    { title: 'Wi-Fi Campus', icon: Wifi, description: 'High-speed internet access available across the entire campus for students and faculty.' },
    { title: 'Transportation', icon: Bus, description: 'Safe and reliable bus services covering various routes for your convenience.' },
    { title: 'Hygienic Cafeteria', icon: Utensils, description: 'Enjoy healthy, delicious, and affordable meals in our clean and welcoming cafeteria.' },
    { title: 'Sports Facilities', icon: Gamepad2, description: 'Encouraging physical fitness with facilities for various indoor and outdoor sports.' },
    { title: 'Counseling & Support', icon: HeartHandshake, description: 'Confidential counseling and career guidance to support your personal and academic growth.' },
    { title: 'Health Care', icon: ShieldCheck, description: 'Basic first-aid and health care services available on campus for student well-being.' },
];

const innovationProjects = [
    {
        icon: Cpu,
        title: "Robotics & AI Lab",
        description: "Students build robots, program intelligent systems, and compete in national robotics challenges."
    },
    {
        icon: BrainCircuit,
        title: "Machine Learning Projects",
        description: "Hands-on experience with neural networks, computer vision, and predictive algorithms."
    },
    {
        icon: Leaf,
        title: "Corn Husk Doll Crafts",
        description: "Traditional crafts meet innovation — designing and marketing cultural products."
    },
    {
        icon: CircuitBoard,
        title: "IoT & Electronics",
        description: "Building smart devices, automation systems, and sustainable energy solutions."
    }
];

const educationalTours = [
    {
        icon: Microscope,
        title: "Bioengineering Facility Visits",
        description: "Exposure to cutting-edge research in genetic engineering and biotechnology."
    },
    {
        icon: Rocket,
        title: "Science Exhibitions",
        description: "Participation in national and regional science fairs and innovation competitions."
    },
    {
        icon: Building,
        title: "Industry Visits",
        description: "Real-world learning at technology companies, manufacturing plants, and startups."
    },
    {
        icon: Globe,
        title: "International Trips",
        description: "Educational tours to India and beyond for global exposure."
    },
];

export default function FacilitiesView() {
    return (
        <div>
            <PageHeader title="Facilities & Innovation" subtitle="World-Class Infrastructure & Practical Learning" />
            <div className="py-12 md:py-16 space-y-16 md:space-y-20">
                <section className="container mx-auto px-4 md:px-6">
                    <SectionTitle title="Our Facilities" subtitle="Supporting Your Success" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-8 md:mt-10">
                        {facilities.map((facility) => (
                            <div
                                key={facility.title}
                                className="testimonial-card p-5 md:p-6 flex flex-col items-center text-center gap-3 h-full hover:-translate-y-1"
                            >
                                <div className="bg-brand/10 p-3 rounded-full border border-brand/20">
                                    <facility.icon className="w-7 h-7 text-brand" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{facility.title}</h3>
                                    <p className="text-muted-foreground text-sm">{facility.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-neutral-surface py-12 md:py-16">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                        <SectionTitle title="Hands-On Innovation" subtitle="Real projects solving real problems" />
                        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-8 md:mt-10">
                            {innovationProjects.map((project) => (
                                <div
                                    key={project.title}
                                    className="testimonial-card p-5 md:p-6 flex items-start gap-4 h-full hover:-translate-y-1"
                                >
                                    <div className="bg-brand/10 p-3 rounded-full border border-brand/20">
                                        <project.icon className="w-7 h-7 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{project.title}</h3>
                                        <p className="text-muted-foreground text-sm md:text-base">{project.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <SectionTitle title="Educational Tours & Visits" subtitle="Learning beyond the campus" />
                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-8 md:mt-10">
                        {educationalTours.map((tour) => (
                            <div
                                key={tour.title}
                                className="testimonial-card p-4 md:p-5 flex flex-col items-center text-center gap-3 h-full hover:-translate-y-1"
                            >
                                <div className="bg-brand/10 p-3 rounded-full border border-brand/20">
                                    <tour.icon className="w-7 h-7 text-brand" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{tour.title}</h3>
                                    <p className="text-muted-foreground text-sm">{tour.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
