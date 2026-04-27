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
      <StatsTicker />
      <ProgressSection />
      <PopularProgramsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}

const HeroSection = () => (
    <section className="relative w-full max-w-[1408px] mx-auto min-h-screen md:min-h-[900px] rounded-b-[24px] bg-gradient-to-b from-neutral-surface to-neutral-bg overflow-hidden flex flex-col items-center pt-24 md:pt-[150px]">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-peach opacity-20 blur-[100px]"></div>
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-accent-green opacity-20 blur-[100px]"></div>
        </div>

        <div className="w-full max-w-[1160px] px-6 md:px-10 mx-auto z-10 flex flex-col items-center text-center">
            <div data-fade-up className="flex flex-wrap justify-center items-center gap-2 bg-neutral-bg px-5 py-3 rounded-full shadow-sm mb-4 border border-neutral-border">
                <span className="font-semibold text-sm">Top Rated Academy in Far-West Nepal</span>
            </div>

            <h1 data-fade-up style={{ transitionDelay: '300ms' }} className="max-w-[850px] text-4xl md:text-[64px] md:leading-[73.6px] font-semibold capitalize mb-6">
                Pioneering Futures with <span className="text-brand">Elite Mentorship</span>
            </h1>
            
            <p data-fade-up style={{ transitionDelay: '500ms' }} className="max-w-[578px] text-neutral-text-muted text-base md:text-lg mb-10 md:mb-12">
                Join the leading educational institution in Kanchanpur. Personalized tuition, modern labs, and a curriculum designed for the future.
            </p>

            <div data-fade-up style={{ transitionDelay: '700ms' }} className="flex flex-col sm:flex-row items-center gap-4">
                <Button asChild size="lg" className="h-12 px-8 rounded-xl font-semibold group">
                    <Link href="/admissions">
                        Apply Now <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-xl font-semibold">
                    <Link href="/academics/programs">Explore Programs</Link>
                </Button>
            </div>
            
             {/* Hero Grid Cards */}
            <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 h-auto md:h-[500px]">
                {/* Left */}
                <div className="flex flex-col gap-4 h-full">
                    <div data-fade-left style={{ transitionDelay: '800ms' }} className="grid grid-cols-2 gap-4 h-[196px]">
                        <div className="relative rounded-2xl overflow-hidden group bg-card shadow-sm border border-border">
                            <Image src={imageData.gallery[16].src} alt="Robotics lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" fill data-ai-hint={imageData.gallery[16].hint} />
                        </div>
                        <div className="relative rounded-2xl overflow-hidden group bg-card shadow-sm border border-border">
                            <Image src={imageData.gallery[20].src} alt="Science lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" fill data-ai-hint={imageData.gallery[20].hint} />
                        </div>
                    </div>
                    <div data-fade-left style={{ transitionDelay: '950ms' }} className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-2xl p-6 flex flex-col justify-between flex-grow border border-orange-200 dark:border-orange-800">
                        <div className="flex -space-x-2">
                           <Image src={TESTIMONIALS[0].image} width={40} height={40} className="w-10 h-10 rounded-full border-2 border-orange-200 dark:border-orange-800 object-cover" alt="Student 1"/>
                           <Image src={TESTIMONIALS[1].image} width={40} height={40} className="w-10 h-10 rounded-full border-2 border-orange-200 dark:border-orange-800 object-cover" alt="Student 2"/>
                           <Image src={TESTIMONIALS[2].image} width={40} height={40} className="w-10 h-10 rounded-full border-2 border-orange-200 dark:border-orange-800 object-cover" alt="Student 3"/>
                        </div>
                        <div className="flex justify-between items-end mt-4 text-left">
                            <div>
                                <h2 className="text-[48px] leading-[55px] font-semibold text-foreground">95%</h2>
                                <p className="text-sm text-muted-foreground font-medium">Student Success Rate</p>
                            </div>
                            <Button asChild size="sm" className="h-9 px-4 rounded-lg bg-background text-foreground border border-border text-xs font-semibold hover:bg-accent">
                              <Link href="/admissions">Apply Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Center */}
                <div data-fade-up style={{ transitionDelay: '1100ms' }} className="relative rounded-2xl overflow-hidden h-[500px] group bg-card border border-border">
                    <Image src={imageData.hero[1].src} alt="Live Coaching" fill className="absolute inset-0 w-full h-full object-cover" data-ai-hint={imageData.hero[1].hint} />
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-6 z-20">
                        <span className="bg-brand px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">Hybrid Learning</span>
                        <h3 className="text-2xl font-bold text-foreground">Interactive Coaching Sessions</h3>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                
                {/* Right */}
                 <div className="flex flex-col gap-4 h-[500px]">
                    <div data-fade-right style={{ transitionDelay: '1250ms' }} className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl p-6 flex flex-col justify-between h-[280px] relative overflow-hidden border border-green-200 dark:border-green-800">
                        <div className="z-10 text-left">
                            <h2 className="text-[48px] leading-[55px] font-semibold text-foreground">5+</h2>
                            <p className="text-sm text-muted-foreground font-medium">Academic Programs</p>
                        </div>
                        <p className="font-semibold z-10 text-lg text-left text-foreground">+2 Science, Management, Law, CTEVT, and Bridge Courses.</p>
                    </div>
                    <div data-fade-right style={{ transitionDelay: '1400ms' }} className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-2xl p-6 flex flex-col justify-between flex-grow overflow-hidden border border-yellow-200 dark:border-yellow-800">
                        <p className="font-semibold text-lg text-left text-foreground">Resource Library</p>
                        <div className="mt-4 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <span className="bg-background px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border">Digital Notes</span>
                                <span className="bg-background px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border">Online Tests</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="bg-background px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border">Recorded Lectures</span>
                                <span className="bg-background px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border ml-4">PDF Library</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)


const ProgramText = ({ name }: { name: string }) => (
    <div className="flex items-center gap-4">
        <span className="w-1.5 h-1.5 rounded-full bg-brand/60"></span>
        <span className="text-sm font-medium text-neutral-text-muted tracking-wide uppercase whitespace-nowrap">{name}</span>
    </div>
);
  
const StatsTicker = () => {
    const programs = [
        '+2 Science',
        'Bridge Course',
        'Primary Education',
        '+2 Management',
        'Secondary Education',
    ];
    // Duplicate items multiple times to ensure no empty space during scroll
    const duplicatedPrograms = [...programs, ...programs, ...programs, ...programs];
    return (
        <section className="mt-8 py-6 bg-neutral-surfaceAlt overflow-hidden border-y border-neutral-border">
            <Marquee className="[--duration:25s] [--gap:3rem]" pauseOnHover>
                {duplicatedPrograms.map((program, index) => (
                    <ProgramText key={`${program}-${index}`} name={program} />
                ))}
            </Marquee>
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

const ProgressSection = () => (
    <section id="progress-section" className="py-16 md:py-24 bg-neutral-bg overflow-hidden">
        <div className="w-full max-w-[1160px] mx-auto px-6 md:px-10 relative">
            <div className="max-w-[560px] mx-auto text-center mb-12 md:mb-16" data-fade-up>
                <h2 className="text-3xl md:text-[52px] font-semibold leading-[1.15] capitalize">
                    Steady Progress,<br className="hidden md:block" />Endless Potential
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8 items-center relative">
                <div className="flex flex-col justify-between h-full py-10 space-y-16 lg:space-y-0 text-right order-2 lg:order-1">
                    {progressFeatures.filter(f => f.side === 'left').map(item => (
                         <div key={item.title} className={`flex flex-col items-end gap-3 transition-all duration-500 ease-out ${item.offset ? 'lg:mr-8' : ''}`} data-fade-left style={{ transitionDelay: `${item.delay}ms`}}>
                            <h3 className="text-2xl font-semibold leading-tight">{item.title}</h3>
                            <p className="text-base text-neutral-text-muted max-w-[290px]">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="relative flex justify-center items-center order-1 lg:order-2" data-fade-up>
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20 text-neutral-border">
                        <svg className="h-full w-auto" viewBox="0 0 100 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0 C 100 150, 0 250, 50 400 S 100 550, 50 800" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="relative w-[300px] h-[300px] md:w-[495px] md:h-[495px] rounded-full bg-neutral-surfaceAlt overflow-hidden shadow-2xl z-10 border-8 border-white">
                        <Image src={imageData.hero[3].src} alt="Student success" className="w-full h-full object-cover" fill data-ai-hint={imageData.hero[3].hint}/>
                    </div>
                </div>
                <div className="flex flex-col justify-between h-full py-10 space-y-16 lg:space-y-0 text-left order-3">
                    {progressFeatures.filter(f => f.side === 'right').map(item => (
                         <div key={item.title} className={`flex flex-col items-start gap-3 transition-all duration-500 ease-out ${item.offset ? 'lg:ml-8' : ''}`} data-fade-right style={{ transitionDelay: `${item.delay}ms`}}>
                            <h3 className="text-2xl font-semibold leading-tight">{item.title}</h3>
                            <p className="text-base text-neutral-text-muted max-w-[290px]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const programData = [
  {
    title: "+2 Science",
    description: "A rigorous program for aspiring engineers and medical professionals, focusing on Physics, Chemistry, Biology, and Mathematics.",
    image: imageData.gallery[20].src,
    hint: imageData.gallery[20].hint,
    tag: "SCIENCE STREAM",
    delay: 0
  },
  {
    title: "+2 Management",
    description: "Equips students with the fundamentals of business, finance, and economics, preparing them for corporate leadership.",
    image: imageData.gallery[3].src,
    hint: imageData.gallery[3].hint,
    tag: "MANAGEMENT",
    delay: 100
  },
  {
    title: "Innovation & Learning",
    description: "Personalized guidance and practical, project-based learning to help students choose the right academic and career path.",
    image: imageData.gallery[16].src,
    hint: imageData.gallery[16].hint,
    tag: "PRACTICAL EDUCATION",
    delay: 200
  }
];

const PopularProgramsSection = () => (
  <section id="exams" className="py-16 md:py-24 bg-neutral-bg px-6 md:px-10">
    <div className="max-w-[1160px] mx-auto">
      <div data-fade-up className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16">
        <div className="max-w-[550px]">
          <h2 className="text-3xl md:text-[52px] md:leading-[59.8px] font-semibold mb-4">Our Premier Programs</h2>
          <p className="text-neutral-text-muted">Specialized programs designed for academic excellence and career success.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programData.map(program => (
           <div key={program.title} data-fade-up style={{ transitionDelay: `${program.delay}ms`}} className="bg-neutral-surface border border-neutral-border rounded-[24px] p-5 pb-9 flex flex-col group hover:shadow-card transition-shadow duration-300">
             <div className="relative w-full h-[250px] rounded-2xl overflow-hidden mb-5 bg-white">
                <Image src={program.image} alt={program.title} fill className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-ai-hint={program.hint} />
                <div className="absolute top-4 left-4 bg-brand text-white px-4 py-1 rounded-full text-xs font-bold">{program.tag}</div>
             </div>
             <h3 className="text-2xl font-semibold mb-3">{program.title}</h3>
             <p className="text-neutral-text-muted text-sm mb-6">{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const TestimonialsSection = () => (
    <section id="testimonials" className="py-16 md:py-24 bg-neutral-surfaceAlt">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10">
            <div data-fade-up className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-[52px] md:leading-[59.8px] font-semibold mb-4">Our Community Speaks</h2>
                <p className="text-neutral-text-muted max-w-[600px] mx-auto">Hear from students, parents, and faculty who have experienced the SARC difference.</p>
            </div>
        </div>
        <div data-fade-up style={{ transitionDelay: '200ms' }}>
            <StaggerTestimonials />
        </div>
    </section>
);


const FaqSection = () => (
  <section id="faq" className="max-w-[1408px] mx-auto py-16 md:py-24 px-6 md:px-10 bg-neutral-surfaceAlt md:rounded-[24px]">
    <div className="max-w-[1160px] mx-auto">
        <div data-fade-up className="flex flex-col items-center text-center max-w-[560px] mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-[52px] md:leading-[59.8px] font-semibold">Common Queries</h2>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
             <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`} data-fade-up style={{ transitionDelay: `${i * 100}ms` }} className="border border-neutral-border bg-neutral-bg rounded-2xl px-6 hover:bg-neutral-surface transition-colors">
                        <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline py-6">
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

const ContactSection = () => (
  <section id="contact" className="max-w-[1160px] mx-auto py-16 md:py-24 px-6 md:px-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <div data-fade-up>
        <h2 className="text-3xl md:text-[52px] md:leading-[59.8px] font-semibold mb-6">Talk to an Academic Counselor</h2>
        <p className="text-neutral-text-muted text-lg mb-8">Not sure which program fits you? Schedule a free counseling session today.</p>
      </div>
      <div data-fade-up className="bg-neutral-surface border border-neutral-border p-8 rounded-3xl shadow-sm">
        <form action="/contact" className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input type="text" name="name" placeholder="Full Name" className="w-full h-14 px-6 rounded-xl border border-neutral-border focus:border-brand outline-none bg-white" required />
            <input type="email" name="email" placeholder="Email Address" className="w-full h-14 px-6 rounded-xl border border-neutral-border focus:border-brand outline-none bg-white" required />
          </div>
          <Button type="submit" size="lg" className="w-full h-12 rounded-xl font-semibold">
            Request Callback
          </Button>
        </form>
      </div>
    </div>
  </section>
);
