'use client';

import { useState, useRef, FormEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import { z } from "zod";
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import PageHeader from '../components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message is too short"),
});

type State = {
  message: string | null;
  errors: Record<string, string[] | undefined> | null;
  success: boolean;
};

const InfoCard = ({ icon: Icon, title, text, href }: { icon: React.ElementType, title: string, text: string, href?: string }) => (
    <div className="testimonial-card text-center p-8 hover:-translate-y-1 hover:shadow-xl">
        <div className="inline-block bg-brand-light text-brand p-4 rounded-full mb-4">
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        {href ? (
             <a href={href} className="text-neutral-text-muted hover:text-brand transition-colors">{text}</a>
        ) : (
            <p className="text-neutral-text-muted">{text}</p>
        )}
    </div>
);


export default function ContactView() {
    const [state, setState] = useState<State>({ message: null, errors: null, success: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const supabase = createClient();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setState({ message: null, errors: null, success: false });

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());
        const validatedFields = contactSchema.safeParse(rawData);

        if (!validatedFields.success) {
            const errors = validatedFields.error.flatten().fieldErrors;
            setState({ errors, message: "Please correct the errors.", success: false });
            setIsSubmitting(false);
            toast({ variant: 'destructive', title: 'Submission Error', description: 'Please check the form for errors.' });
            return;
        }

        const { error } = await supabase.from('contact_messages').insert([
            validatedFields.data
        ]);

        if (error) {
            setState({ message: `Server Error: ${error.message}`, errors: null, success: false });
            toast({ variant: 'destructive', title: 'Server Error', description: error.message });
        } else {
            setState({ message: "Thank you for your message! We will get back to you shortly.", errors: null, success: true });
            formRef.current?.reset();
        }
        setIsSubmitting(false);
    }

    return (
        <div>
            <PageHeader title="Get In Touch" subtitle="We're here to help" />

            <section className="py-20">
                <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     <InfoCard icon={MapPin} title="Address" text="Bhimdatta-06, Mahendranagar, Kanchanpur, Nepal" />
                     <InfoCard icon={Phone} title="Phone" text="099-525271" href="tel:099525271"/>
                     <InfoCard icon={Mail} title="Email" text="contact@sarc.edu.np" href="mailto:contact@sarc.edu.np"/>
                     <InfoCard icon={Clock} title="Office Hours" text="Sunday - Friday: 7:00 AM - 4:00 PM"/>
                </div>
            </section>

            <section className="container pb-20">
                 <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <Card className="testimonial-card">
                        <CardHeader>
                            <CardTitle>Send Us a Message</CardTitle>
                            <CardDescription>Have a question or feedback? Drop us a line.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {state.success ? (
                                <Alert variant="default" className="bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-500/30 dark:text-emerald-200">
                                    <CheckCircle className="h-4 w-4 !text-emerald-600 dark:!text-emerald-400" />
                                    <AlertTitle className="font-semibold">Success!</AlertTitle>
                                    <AlertDescription>{state.message}</AlertDescription>
                                </Alert>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name *</Label>
                                        <Input id="fullName" name="fullName" placeholder="Enter your name" required />
                                        {state.errors?.fullName && <p className="text-sm text-rose-500">{state.errors.fullName[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                                        {state.errors?.email && <p className="text-sm text-rose-500">{state.errors.email[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input id="phone" name="phone" type="tel" placeholder="+977 XXX-XXXXXX" required />
                                        {state.errors?.phone && <p className="text-sm text-rose-500">{state.errors.phone[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject *</Label>
                                        <Input id="subject" name="subject" placeholder="What is your inquiry about?" required />
                                        {state.errors?.subject && <p className="text-sm text-rose-500">{state.errors.subject[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea id="message" name="message" placeholder="Tell us more about your inquiry..." required rows={5} />
                                        {state.errors?.message && <p className="text-sm text-rose-500">{state.errors.message[0]}</p>}
                                    </div>
                                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : <><Send className="mr-2 h-4 w-4" />Send Message</>}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                     <div className="testimonial-card p-2 relative h-[550px] lg:h-full mt-8 lg:mt-0">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.851991823293!2d80.1753244743224!3d28.69376667562916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1ab1492806743%3A0x24a0f71e59229306!2sSARC%20EDUCATION%20FOUNDATION-Best%20in%20School%2Fcollege%20in%20Kanchanpur%2C%20Mahendranagar!5e0!3m2!1sen!2snp!4v1669888812613!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            className='rounded-xl'
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SARC Education Foundation Location"
                        ></iframe>
                    </div>
                </div>
            </section>
            
            <section className="pb-20">
                <div className="container">
                    <div className="bg-brand text-primary-foreground rounded-2xl p-12 text-center flex flex-col items-center">
                        <div className="bg-white/10 p-4 rounded-full mb-6">
                            <MapPin className="w-8 h-8"/>
                        </div>
                        <h2 className="text-3xl font-bold">Schedule a Campus Visit</h2>
                        <p className="mt-2 max-w-2xl mx-auto opacity-90">
                           Experience SARC firsthand. Tour our facilities, meet our faculty, and see innovation in action.
                        </p>
                        <Button asChild variant="secondary" className="mt-8 bg-white text-brand hover:bg-white/90 rounded-full">
                            <Link href="/admissions">Book Your Visit</Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}
