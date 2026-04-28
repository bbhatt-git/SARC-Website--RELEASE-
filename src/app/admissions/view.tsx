'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, User, Phone, GraduationCap, Users2, Send } from 'lucide-react';
import { z } from "zod";
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '../components/page-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NATIONALITIES, NEPAL_PROVINCES, NEPAL_DISTRICTS, NEPALI_MONTHS, getNepaliYears, getDaysInMonth } from '@/lib/nepal-data';

const admissionSchema = z.object({
  // Personal
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Please select a gender"),
  nationality: z.string().min(1, "Please select a nationality"),
  citizenshipNo: z.string().optional(),
  
  // Contact
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "A valid phone number is required"),
  alternatePhone: z.string().optional(),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  district: z.string().min(1, "Please select a district"),
  province: z.string().min(1, "Please select a province"),
  
  // Academic
  applyingFor: z.string().min(1, "Please select a grade/program"),
  previousSchool: z.string().min(3, "Previous school name is required"),
  lastClassCompleted: z.string().min(1, "This field is required"),
  gpa: z.string().min(1, "GPA/Percentage is required"),
  achievements: z.string().optional(),
  
  // Father
  fatherName: z.string().min(3, "Father's name is required"),
  fatherPhone: z.string().min(10, "A valid phone number is required"),
  fatherOccupation: z.string().min(2, "Father's occupation is required"),
  fatherEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  
  // Mother
  motherName: z.string().min(3, "Mother's name is required"),
  motherPhone: z.string().min(10, "A valid phone number is required"),
  motherOccupation: z.string().min(2, "Mother's occupation is required"),
  motherEmail: z.string().email("Invalid email address").optional().or(z.literal('')),

  // Guardian
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianRelationship: z.string().optional(),
  guardianEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
});

type State = {
  message: string | null;
  errors: Record<string, string[] | undefined> | null;
  success: boolean;
};

const FormSection = ({ icon, title, description, children }: { icon: React.ElementType, title: string, description: string, children: React.ReactNode }) => {
    const Icon = icon;
    return (
        <Card className="testimonial-card">
            <CardHeader className='border-b'>
                <div className='flex items-center gap-4'>
                    <Icon className="w-6 h-6 text-brand" />
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {children}
            </CardContent>
        </Card>
    )
};

const FormField = ({ label, id, error, children }: { label: string, id: string, error?: string[], children: React.ReactNode}) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        {children}
        {error && <p className="text-sm text-rose-500">{error[0]}</p>}
    </div>
);


export default function AdmissionsView() {
    const [state, setState] = useState<State>({ message: null, errors: null, success: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const supabase = createClient();

    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [dobYear, setDobYear] = useState('');
    const [dobMonth, setDobMonth] = useState('');
    const [dobDay, setDobDay] = useState('');
    const [dobValue, setDobValue] = useState('');

    useEffect(() => {
        if (dobYear && dobMonth && dobDay) {
            setDobValue(`${dobYear}-${dobMonth}-${dobDay}`);
        } else {
            setDobValue('');
        }
    }, [dobYear, dobMonth, dobDay]);

    const resetForm = () => {
        formRef.current?.reset();
        setState({ message: null, errors: null, success: false });
        setSelectedProvince('');
        setDobYear('');
        setDobMonth('');
        setDobDay('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        setState({ message: null, errors: null, success: false });

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const validatedFields = admissionSchema.safeParse(rawData);

        if (!validatedFields.success) {
            const errors = validatedFields.error.flatten().fieldErrors;
            setState({
                errors,
                message: 'Error: Please check your input.',
                success: false,
            });
            setIsSubmitting(false);
            toast({
                variant: 'destructive',
                title: 'Submission Error',
                description: 'Please correct all the errors in the form before submitting.',
            });
            return;
        }
        
        const { error } = await supabase.from('admission_inquiries').insert([
            validatedFields.data,
        ]);

        if (error) {
            setState({
              message: `Server Error: ${error.message}`,
              errors: null,
              success: false
            });
            toast({ variant: 'destructive', title: 'Submission Error', description: error.message });
        } else {
             setState({
              message: `Thank you, ${validatedFields.data.firstName}! Your admission inquiry has been received. We will be in touch shortly.`,
              errors: null,
              success: true
            });
            formRef.current?.reset();
        }
        setIsSubmitting(false);
    }

    return (
        <div>
            <PageHeader title="Admissions" subtitle="Begin Your Journey at SARC" />
            <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12 md:py-16">
                {!state.success ? (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <FormSection icon={User} title="Personal Information" description="Please provide the student's personal details.">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="First Name" id="firstName" error={state.errors?.firstName}>
                                    <Input id="firstName" name="firstName" placeholder="e.g. John" required />
                                </FormField>
                                <FormField label="Last Name" id="lastName" error={state.errors?.lastName}>
                                    <Input id="lastName" name="lastName" placeholder="e.g. Doe" required />
                                </FormField>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Date of Birth (B.S.)</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Select onValueChange={setDobYear} name="dob_year">
                                            <SelectTrigger><SelectValue placeholder="YYYY" /></SelectTrigger>
                                            <SelectContent>
                                                {getNepaliYears().map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <Select onValueChange={setDobMonth} name="dob_month">
                                            <SelectTrigger><SelectValue placeholder="MM" /></SelectTrigger>
                                            <SelectContent>
                                                {NEPALI_MONTHS.map(month => <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <Select onValueChange={setDobDay} name="dob_day">
                                            <SelectTrigger><SelectValue placeholder="DD" /></SelectTrigger>
                                            <SelectContent>
                                                {getDaysInMonth().map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <input type="hidden" name="dob" value={dobValue} />
                                    {state.errors?.dob && <p className="text-sm text-rose-500">{state.errors.dob[0]}</p>}
                                </div>
                                <FormField label="Gender" id="gender" error={state.errors?.gender}>
                                    <Select name="gender">
                                        <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormField>
                                <FormField label="Nationality" id="nationality" error={state.errors?.nationality}>
                                    <Select name="nationality">
                                        <SelectTrigger><SelectValue placeholder="Select nationality" /></SelectTrigger>
                                        <SelectContent>
                                            {NATIONALITIES.map(nat => <SelectItem key={nat} value={nat}>{nat}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </FormField>
                                <FormField label="Citizenship No. (Optional)" id="citizenshipNo" error={state.errors?.citizenshipNo}>
                                    <Input id="citizenshipNo" name="citizenshipNo" placeholder="e.g. 12-34-56789" />
                                </FormField>
                            </div>
                        </FormSection>

                        {/* Contact Information */}
                        <FormSection icon={Phone} title="Contact Information" description="How can we get in touch with you?">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Email Address" id="email" error={state.errors?.email}>
                                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                                </FormField>
                                <FormField label="Phone Number" id="phone" error={state.errors?.phone}>
                                    <Input id="phone" name="phone" type="tel" placeholder="+977-..." required />
                                </FormField>
                            </div>
                            <div className="mt-6">
                                <FormField label="Alternate Phone (Optional)" id="alternatePhone" error={state.errors?.alternatePhone}>
                                    <Input id="alternatePhone" name="alternatePhone" type="tel" placeholder="+977-..." />
                                </FormField>
                            </div>
                            <div className="mt-6">
                                <FormField label="Permanent Address" id="permanentAddress" error={state.errors?.permanentAddress}>
                                    <Textarea id="permanentAddress" name="permanentAddress" placeholder="Street, Ward No, Municipality/VDC" required />
                                </FormField>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <FormField label="Province" id="province" error={state.errors?.province}>
                                    <Select name="province" onValueChange={setSelectedProvince}>
                                        <SelectTrigger><SelectValue placeholder="Select province" /></SelectTrigger>
                                        <SelectContent>
                                            {NEPAL_PROVINCES.map(prov => <SelectItem key={prov} value={prov}>{prov}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </FormField>
                                <FormField label="District" id="district" error={state.errors?.district}>
                                    <Select name="district" disabled={!selectedProvince}>
                                        <SelectTrigger><SelectValue placeholder="Select district" /></SelectTrigger>
                                        <SelectContent>
                                            {selectedProvince && NEPAL_DISTRICTS[selectedProvince] ? (
                                                NEPAL_DISTRICTS[selectedProvince].map(dist => <SelectItem key={dist} value={dist}>{dist}</SelectItem>)
                                            ) : (
                                                <div className="p-2 text-center text-sm text-neutral-text-muted">Select a province first</div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormField>
                            </div>
                        </FormSection>

                        {/* Academic Information */}
                        <FormSection icon={GraduationCap} title="Academic Information" description="Tell us about the student's academic background.">
                            <div className='grid md:grid-cols-2 gap-6'>
                                <FormField label="Applying For" id="applyingFor" error={state.errors?.applyingFor}>
                                    <Select name="applyingFor">
                                    <SelectTrigger id="applyingFor"><SelectValue placeholder="Select a grade" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ecd">ECD</SelectItem>
                                        <SelectItem value="1-8">School Section (1-8)</SelectItem>
                                        <SelectItem value="9-10">School Section (9-10)</SelectItem>
                                        <SelectItem value="bridge">Bridge Course</SelectItem>
                                        <SelectItem value="+2-science">+2 Science</SelectItem>
                                        <SelectItem value="+2-management">+2 Management</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </FormField>
                                <FormField label="Previous School Name" id="previousSchool" error={state.errors?.previousSchool}>
                                    <Input id="previousSchool" name="previousSchool" placeholder="e.g. ABC Secondary School" required />
                                </FormField>
                            </div>
                            <div className='grid md:grid-cols-2 gap-6 mt-6'>
                                <FormField label="Last Class Completed" id="lastClassCompleted" error={state.errors?.lastClassCompleted}>
                                    <Input id="lastClassCompleted" name="lastClassCompleted" placeholder="e.g., Class 10" required />
                                </FormField>
                                <FormField label="GPA / Percentage" id="gpa" error={state.errors?.gpa}>
                                    <Input id="gpa" name="gpa" placeholder="e.g., 3.8 GPA" required />
                                </FormField>
                            </div>
                            <div className="mt-6">
                                <FormField label="Academic Achievements / Awards (Optional)" id="achievements" error={state.errors?.achievements}>
                                    <Textarea id="achievements" name="achievements" placeholder="List any awards, competitions, or distinctions" />
                                </FormField>
                            </div>
                        </FormSection>

                        {/* Parent/Guardian Information */}
                        <FormSection icon={Users2} title="Parent/Guardian Information" description="Please provide details for emergency contacts.">
                            {/* Father's Info */}
                            <h4 className="font-semibold text-brand mb-4">Father's Information</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Full Name" id="fatherName" error={state.errors?.fatherName}><Input id="fatherName" name="fatherName" required/></FormField>
                                <FormField label="Phone Number" id="fatherPhone" error={state.errors?.fatherPhone}><Input id="fatherPhone" name="fatherPhone" type="tel" required/></FormField>
                                <FormField label="Occupation" id="fatherOccupation" error={state.errors?.fatherOccupation}><Input id="fatherOccupation" name="fatherOccupation" required/></FormField>
                                <FormField label="Email" id="fatherEmail" error={state.errors?.fatherEmail}><Input id="fatherEmail" name="fatherEmail" type="email" /></FormField>
                            </div>

                            {/* Mother's Info */}
                            <h4 className="font-semibold text-brand mt-8 mb-4">Mother's Information</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Full Name" id="motherName" error={state.errors?.motherName}><Input id="motherName" name="motherName" required /></FormField>
                                <FormField label="Phone Number" id="motherPhone" error={state.errors?.motherPhone}><Input id="motherPhone" name="motherPhone" type="tel" required /></FormField>
                                <FormField label="Occupation" id="motherOccupation" error={state.errors?.motherOccupation}><Input id="motherOccupation" name="motherOccupation" required /></FormField>
                                <FormField label="Email" id="motherEmail" error={state.errors?.motherEmail}><Input id="motherEmail" name="motherEmail" type="email" /></FormField>
                            </div>

                            {/* Guardian's Info */}
                            <h4 className="font-semibold text-brand mt-8 mb-4">Guardian's Information (If Applicable)</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Full Name" id="guardianName" error={state.errors?.guardianName}><Input id="guardianName" name="guardianName" /></FormField>
                                <FormField label="Phone Number" id="guardianPhone" error={state.errors?.guardianPhone}><Input id="guardianPhone" name="guardianPhone" type="tel" /></FormField>
                                <FormField label="Relationship" id="guardianRelationship" error={state.errors?.guardianRelationship}><Input id="guardianRelationship" name="guardianRelationship" /></FormField>
                                <FormField label="Email" id="guardianEmail" error={state.errors?.guardianEmail}><Input id="guardianEmail" name="guardianEmail" type="email" /></FormField>
                            </div>
                        </FormSection>

                        <div className="flex flex-col items-center">
                            <Button type="submit" className="w-full max-w-xs" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                                ) : 'Submit Application'}
                            </Button>
                            {state.message && !state.success && state.errors && (
                                <Alert variant="destructive" className="mt-6">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>Please review the form and correct the highlighted errors.</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </form>
                ) : (
                    <div className="text-center testimonial-card py-16 px-8">
                        <div className="inline-block bg-emerald-100 p-4 rounded-full border-4 border-emerald-200">
                            <CheckCircle className="w-16 h-16 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold mt-8 text-foreground">Application Submitted!</h2>
                        <p className="text-neutral-text-muted text-lg mt-4 max-w-prose mx-auto">
                            {state.message}
                        </p>
                        <Button onClick={resetForm} className="mt-8" size="lg">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Another Inquiry
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
