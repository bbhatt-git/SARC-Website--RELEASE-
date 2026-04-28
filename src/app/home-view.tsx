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
    <section className="relative w-full max-w-[1408px] mx-auto min-h-screen md:min-h-[800px] rounded-b-[20px] bg-gradient-to-b from-neutral-surface to-neutral-bg overflow-hidden flex flex-col items-center pt-20 md:pt-32">
        <div className="w-full max-w-[1200px] px-4 md:px-6 mx-auto z-10 flex flex-col items-center text-center">
            <div data-gsap-fade-up className="inline-flex items-center gap-2 bg-neutral-bg/80 backdrop-blur px-4 py-2 rounded-full shadow-sm mb-6 border border-neutral-border">
                <span className="font-semibold text-sm">Top Rated Academy in Far-West Nepal</span>
            </div>

            <h1 data-gsap-fade-up className="max-w-[800px] text-4xl md:text-[56px] md:leading-[1.1] font-bold capitalize mb-5">
                Pioneering Futures with <span className="text-brand">Elite Mentorship</span>
            </h1>
            
            <p data-gsap-fade-up className="max-w-[550px] text-neutral-text-muted text-base md:text-lg mb-8">
                Join the leading educational institution in Kanchanpur. Personalized tuition, modern labs, and a curriculum designed for the future.
            </p>

            <div data-gsap-fade-up className="flex flex-col sm:flex-row items-center gap-3">
                <Button asChild size="lg" className="h-11 px-6 rounded-lg font-semibold group">
                    <Link href="/admissions">
                        Apply Now <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 px-6 rounded-lg font-semibold">
                    <Link href="/academics/programs">Explore Programs</Link>
                </Button>
            </div>
            
             {/* Hero Grid Cards */}
            <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-3 h-auto md:h-[450px]">
                {/* Left */}
                <div className="flex flex-col gap-3 h-full">
                    <div data-gsap-fade-left className="grid grid-cols-2 gap-3 h-[180px]">
                        <div className="relative rounded-xl overflow-hidden group bg-card border border-border">
                            <Image src={imageData.gallery[16].src} alt="Robotics lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" fill data-ai-hint={imageData.gallery[16].hint} />
                        </div>
                        <div className="relative rounded-xl overflow-hidden group bg-card border border-border">
                            <Image src={imageData.gallery[20].src} alt="Science lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" fill data-ai-hint={imageData.gallery[20].hint} />
                        </div>
                    </div>
                    <div data-gsap-fade-left className="bg-gradient-to-br from-accent-pink/20 to-accent-pink/10 dark:from-accent-pink/10 dark:to-accent-pink/5 rounded-xl p-5 flex flex-col justify-between flex-grow border border-accent-pink/30">
                        <div className="flex -space-x-2">
                           <Image src={TESTIMONIALS[0].image} width={36} height={36} className="w-9 h-9 rounded-full border-2 border-accent-pink/30 object-cover" alt="Student 1"/>
                           <Image src={TESTIMONIALS[1].image} width={36} height={36} className="w-9 h-9 rounded-full border-2 border-accent-pink/30 object-cover" alt="Student 2"/>
                           <Image src={TESTIMONIALS[2].image} width={36} height={36} className="w-9 h-9 rounded-full border-2 border-accent-pink/30 object-cover" alt="Student 3"/>
                        </div>
                        <div className="flex justify-between items-end mt-3 text-left">
                            <div>
                                <h2 className="text-[42px] leading-[1] font-semibold text-foreground">95%</h2>
                                <p className="text-sm text-muted-foreground font-medium">Student Success Rate</p>
                            </div>
                            <Button asChild size="sm" className="h-8 px-3 rounded-lg bg-background text-foreground border border-border text-xs font-semibold hover:bg-accent">
                              <Link href="/admissions">Apply Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Center */}
                <div data-gsap-fade-up className="relative rounded-xl overflow-hidden h-[450px] group bg-card border border-border">
                    <Image src={imageData.hero[1].src} alt="Live Coaching" fill className="absolute inset-0 w-full h-full object-cover" data-ai-hint={imageData.hero[1].hint} />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-4 z-20">
                        <span className="bg-brand px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Hybrid Learning</span>
                        <h3 className="text-xl font-bold text-foreground">Interactive Coaching Sessions</h3>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                
                {/* Right */}
                 <div className="flex flex-col gap-3 h-[450px]">
                    <div data-gsap-fade-right className="bg-gradient-to-br from-accent-lightgreen/20 to-accent-lightgreen/10 dark:from-accent-lightgreen/10 dark:to-accent-lightgreen/5 rounded-xl p-5 flex flex-col justify-between h-[250px] relative overflow-hidden border border-accent-lightgreen/30">
                        <div className="z-10 text-left">
                            <h2 className="text-[42px] leading-[1] font-semibold text-foreground">5+</h2>
                            <p className="text-sm text-muted-foreground font-medium">Academic Programs</p>
                        </div>
                        <p className="font-semibold z-10 text-base text-left text-foreground">+2 Science, Management, Law, CTEVT, and Bridge Courses.</p>
                    </div>
                    <div data-gsap-fade-right className="bg-gradient-to-br from-accent-yellow/20 to-accent-yellow/10 dark:from-accent-yellow/10 dark:to-accent-yellow/5 rounded-xl p-5 flex flex-col justify-between flex-grow overflow-hidden border border-accent-yellow/30">
                        <p className="font-semibold text-base text-left text-foreground">Resource Library</p>
                        <div className="mt-3 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <span className="bg-background px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border border-border">Digital Notes</span>
                                <span className="bg-background px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border border-border">Online Tests</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="bg-background px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border border-border">Recorded Lectures</span>
                                <span className="bg-background px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border border-border ml-3">PDF Library</span>
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
    const duplicatedPrograms = [...programs, ...programs, ...programs, ...programs];
    return (
        <section className="py-4 bg-neutral-surfaceAlt overflow-hidden border-y border-neutral-border">
            <Marquee className="[--duration:25s] [--gap:2rem]" pauseOnHover>
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
    <section id="progress-section" className="py-10 md:py-16 bg-neutral-bg overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 relative">
            <div className="max-w-[500px] mx-auto text-center mb-10 md:mb-12" data-gsap-fade-up>
                <h2 className="text-3xl md:text-[48px] font-bold leading-[1.1] capitalize">
                    Steady Progress,<br className="hidden md:block" />Endless Potential
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 items-center relative">
                <div className="flex flex-col justify-between h-full py-6 space-y-12 lg:space-y-0 text-right order-2 lg:order-1">
                    {progressFeatures.filter(f => f.side === 'left').map(item => (
                         <div key={item.title} className={`flex flex-col items-end gap-2 ${item.offset ? 'lg:mr-6' : ''}`} data-gsap-fade-left>
                            <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                            <p className="text-sm text-neutral-text-muted max-w-[260px]">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="relative flex justify-center items-center order-1 lg:order-2" data-gsap-fade-up>
                    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-neutral-surfaceAlt overflow-hidden shadow-xl z-10 border-4 border-white">
                        <Image src={imageData.hero[3].src} alt="Student success" className="w-full h-full object-cover" fill data-ai-hint={imageData.hero[3].hint}/>
                    </div>
                </div>
                <div className="flex flex-col justify-between h-full py-6 space-y-12 lg:space-y-0 text-left order-3">
                    {progressFeatures.filter(f => f.side === 'right').map(item => (
                         <div key={item.title} className={`flex flex-col items-start gap-2 ${item.offset ? 'lg:ml-6' : ''}`} data-gsap-fade-right>
                            <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                            <p className="text-sm text-neutral-text-muted max-w-[260px]">{item.description}</p>
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
  <section id="exams" className="py-10 md:py-16 bg-neutral-bg px-4 md:px-6">
    <div className="max-w-[1200px] mx-auto">
      <div data-gsap-fade-up className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 md:mb-10">
        <div className="max-w-[500px]">
          <h2 className="text-3xl md:text-[48px] md:leading-[1.1] font-bold mb-3">Our Premier Programs</h2>
          <p className="text-neutral-text-muted">Specialized programs designed for academic excellence and career success.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programData.map(program => (
           <div key={program.title} data-gsap-fade-up className="bg-neutral-surface border border-neutral-border rounded-xl p-4 pb-6 flex flex-col group hover:shadow-lg transition-all duration-300">
             <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4 bg-white">
                <Image src={program.image} alt={program.title} fill className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-ai-hint={program.hint} />
                <div className="absolute top-3 left-3 bg-brand text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase">{program.tag}</div>
             </div>
             <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
             <p className="text-neutral-text-muted text-sm">{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


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

const ContactSection = () => (
  <section id="contact" className="max-w-[1200px] mx-auto py-10 md:py-16 px-4 md:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div data-gsap-fade-up>
        <h2 className="text-3xl md:text-[48px] md:leading-[1.1] font-bold mb-4">Talk to an Academic Counselor</h2>
        <p className="text-neutral-text-muted text-base md:text-lg mb-6">Not sure which program fits you? Schedule a free counseling session today.</p>
      </div>
      <div data-gsap-fade-up className="bg-neutral-surface border border-neutral-border p-6 rounded-2xl shadow-sm">
        <form action="/contact" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Full Name" className="w-full h-12 px-4 rounded-lg border border-neutral-border focus:border-brand outline-none bg-white" required />
            <input type="email" name="email" placeholder="Email Address" className="w-full h-12 px-4 rounded-lg border border-neutral-border focus:border-brand outline-none bg-white" required />
          </div>
          <Button type="submit" size="lg" className="w-full h-11 rounded-lg font-semibold">
            Request Callback
          </Button>
        </form>
      </div>
    </div>
  </section>
);
