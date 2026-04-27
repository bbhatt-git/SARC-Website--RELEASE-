
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Loader2, Inbox, User, Phone, GraduationCap, Users2, Menu, X, Check, Bell, Calendar, FileText, Award, Search, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  createNotice,
  updateNotice,
  deleteNotice,
  importResultsFromCSV,
  createPushNotice,
  updatePushNotice,
  deletePushNotice,
  uploadImageToGitHub,
  type Notice,
  type Result,
  type PushNotice,
  createResult,
  updateResult,
  deleteResult,
} from './actions';

const formatDate = (timestamp: string | undefined) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

type Inquiry = {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    nationality: string;
    citizenshipNo?: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    permanentAddress: string;
    district: string;
    province: string;
    applyingFor?: string;
    previousSchool: string;
    lastClassCompleted: string;
    gpa: string;
    achievements?: string;
    fatherName: string;
    fatherPhone: string;
    fatherOccupation: string;
    fatherEmail?: string;
    motherName: string;
    motherPhone: string;
    motherOccupation: string;
    motherEmail?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianRelationship?: string;
    guardianEmail?: string;
    created_at: string;
};


type Message = {
    id: string; fullName: string; email: string; phone: string; subject: string; message: string; created_at: string;
};

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
    value ? (
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <Label className="text-right text-muted-foreground pt-1">{label}</Label>
            <p className="font-medium text-foreground">{value}</p>
        </div>
    ) : null
);

const DetailSection = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="space-y-4">
        <h4 className="flex items-center gap-3 font-semibold text-lg text-primary border-b pb-2">
            <Icon className="w-5 h-5" />
            <span>{title}</span>
        </h4>
        <div className="space-y-3 pl-2">{children}</div>
    </div>
);


const AdmissionsTab = ({ inquiries }: { inquiries: Inquiry[] }) => {
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    if (!inquiries || inquiries.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4">
                <Inbox className="h-12 w-12" />
                <h3 className="text-lg font-semibold">No Inquiries Yet</h3>
                <p>New admission inquiries will appear here as they are submitted.</p>
            </div>
        );
    }
    
    const formatApplyingFor = (value?: string) => {
        if (!value) return 'Not Specified';
        return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    return (
        <>
            <div className="border-b border-border/50 pb-4 mb-6">
                <h3 className="text-lg font-semibold">Received Applications ({inquiries.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inquiries.map((inquiry) => (
                    <Card
                        key={inquiry.id}
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
                        onClick={() => setSelectedInquiry(inquiry)}
                    >
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 border-b">
                            <CardTitle className="text-base font-semibold">{inquiry.firstName} {inquiry.lastName}</CardTitle>
                             <div className="text-xs text-muted-foreground text-right shrink-0 ml-2">
                                <div>{formatDate(inquiry.created_at)}</div>
                                <div className='text-gray-400'>{formatTime(inquiry.created_at)}</div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-sm text-muted-foreground">
                                Applying for: <span className="font-medium text-foreground/80">{formatApplyingFor(inquiry.applyingFor)}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <Dialog open={!!selectedInquiry} onOpenChange={(isOpen) => !isOpen && setSelectedInquiry(null)}>
                <DialogContent className="sm:max-w-3xl bg-card/80 backdrop-blur-xl p-0">
                    <DialogHeader className="p-6 pb-4">
                        <DialogTitle className="text-2xl">Admission Inquiry</DialogTitle>
                        <DialogDescription>
                            Submitted by {selectedInquiry?.firstName} {selectedInquiry?.lastName} on {formatDate(selectedInquiry?.created_at)}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedInquiry && (
                        <div className="custom-scrollbar grid gap-8 py-4 px-6 text-sm max-h-[75vh] overflow-y-auto">
                            <DetailSection icon={User} title="Personal Information">
                                <DetailItem label="Full Name" value={`${selectedInquiry.firstName} ${selectedInquiry.lastName}`} />
                                <DetailItem label="Date of Birth" value={selectedInquiry.dob} />
                                <DetailItem label="Gender" value={selectedInquiry.gender} />
                                <DetailItem label="Nationality" value={selectedInquiry.nationality} />
                                <DetailItem label="Citizenship No." value={selectedInquiry.citizenshipNo} />
                            </DetailSection>

                            <DetailSection icon={Phone} title="Contact Information">
                                <DetailItem label="Email" value={selectedInquiry.email} />
                                <DetailItem label="Phone" value={selectedInquiry.phone} />
                                <DetailItem label="Alternate Phone" value={selectedInquiry.alternatePhone} />
                                <DetailItem label="Address" value={`${selectedInquiry.permanentAddress}, ${selectedInquiry.district}, ${selectedInquiry.province}`} />
                            </DetailSection>

                            <DetailSection icon={GraduationCap} title="Academic Information">
                                <DetailItem label="Applying For" value={formatApplyingFor(selectedInquiry.applyingFor)} />
                                <DetailItem label="Previous School" value={selectedInquiry.previousSchool} />
                                <DetailItem label="Last Class Completed" value={selectedInquiry.lastClassCompleted} />
                                <DetailItem label="GPA / Percentage" value={selectedInquiry.gpa} />
                                <DetailItem label="Achievements" value={selectedInquiry.achievements} />
                            </DetailSection>
                            
                            <DetailSection icon={Users2} title="Parent/Guardian Information">
                                <h5 className="font-semibold text-foreground/90 text-md">Father's Details</h5>
                                <div className="border-l-2 border-border/30 pl-4 space-y-3">
                                  <DetailItem label="Name" value={selectedInquiry.fatherName} />
                                  <DetailItem label="Phone" value={selectedInquiry.fatherPhone} />
                                  <DetailItem label="Occupation" value={selectedInquiry.fatherOccupation} />
                                  <DetailItem label="Email" value={selectedInquiry.fatherEmail} />
                                </div>

                                <h5 className="font-semibold text-foreground/90 text-md pt-4 mt-4 border-t border-border/50">Mother's Details</h5>
                                 <div className="border-l-2 border-border/30 pl-4 space-y-3">
                                    <DetailItem label="Name" value={selectedInquiry.motherName} />
                                    <DetailItem label="Phone" value={selectedInquiry.motherPhone} />
                                    <DetailItem label="Occupation" value={selectedInquiry.motherOccupation} />
                                    <DetailItem label="Email" value={selectedInquiry.motherEmail} />
                                </div>

                                {selectedInquiry.guardianName && (
                                    <>
                                    <h5 className="font-semibold text-foreground/90 text-md pt-4 mt-4 border-t border-border/50">Guardian's Details</h5>
                                     <div className="border-l-2 border-border/30 pl-4 space-y-3">
                                        <DetailItem label="Name" value={selectedInquiry.guardianName} />
                                        <DetailItem label="Relationship" value={selectedInquiry.guardianRelationship} />
                                        <DetailItem label="Phone" value={selectedInquiry.guardianPhone} />
                                        <DetailItem label="Email" value={selectedInquiry.guardianEmail} />
                                     </div>
                                    </>
                                )}
                            </DetailSection>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

const ContactTab = ({ messages }: { messages: Message[] }) => {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    if (!messages || messages.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4">
                <Inbox className="h-12 w-12" />
                <h3 className="text-lg font-semibold">No Messages Yet</h3>
                <p>New contact messages will appear here as they are submitted.</p>
            </div>
        );
    }
    
    return (
        <>
            <div className="border-b border-border/50 pb-4 mb-6">
                <h3 className="text-lg font-semibold">Received Messages ({messages.length})</h3>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages.map((msg) => (
                    <Card
                        key={msg.id}
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
                        onClick={() => setSelectedMessage(msg)}
                    >
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 border-b">
                            <CardTitle className="text-base font-semibold">{msg.fullName}</CardTitle>
                            <div className="text-xs text-muted-foreground text-right shrink-0 ml-2">
                                <div>{formatDate(msg.created_at)}</div>
                                <div className='text-gray-400'>{formatTime(msg.created_at)}</div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-sm text-muted-foreground truncate" title={msg.subject}>
                                Subject: <span className="font-medium text-foreground/80">{msg.subject}</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <Dialog open={!!selectedMessage} onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}>
                <DialogContent className="sm:max-w-[600px] bg-card/80 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Contact Message</DialogTitle>
                        <DialogDescription>
                            From {selectedMessage?.fullName} on {formatDate(selectedMessage?.created_at)}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedMessage && (
                        <div className="grid gap-6 py-4 text-sm">
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <Label htmlFor="name" className="text-right text-muted-foreground">From</Label>
                                <p id="name" className="font-semibold text-foreground">{selectedMessage.fullName}</p>
                            </div>
                             <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <Label htmlFor="email" className="text-right text-muted-foreground">Email</Label>
                                <p id="email" className="text-foreground">{selectedMessage.email}</p>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <Label htmlFor="phone" className="text-right text-muted-foreground">Phone</Label>
                                <p id="phone" className="text-foreground">{selectedMessage.phone}</p>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <Label htmlFor="subject" className="text-right text-muted-foreground">Subject</Label>
                                <p id="subject" className="font-semibold text-foreground">{selectedMessage.subject}</p>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                                <Label htmlFor="message" className="text-right text-muted-foreground pt-1">Message</Label>
                                <p id="message" className="text-foreground bg-muted/50 p-4 rounded-md border whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

const AdminNavDrawer = ({ activeTab, setActiveTab, menuOpen, setMenuOpen }: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}) => {
    const menuItems = [
        { id: 'admissions', label: 'Admissions' },
        { id: 'contact', label: 'Contact Messages' },
        { id: 'notices', label: 'Notices' },
        { id: 'results', label: 'Results' },
        { id: 'push-notices', label: 'Push Notices' },
    ];

    const handleSelect = (tab: string) => {
        setActiveTab(tab);
        setMenuOpen(false);
    };

    return (
        <AnimatePresence>
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 mb-6 rounded-lg bg-card/50 backdrop-blur-xl border border-border/50">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item.id)}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2",
                                    activeTab === item.id
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- General Notices Management ---
const iconOptions = [
    { value: 'Bell', label: 'Bell', icon: Bell },
    { value: 'Calendar', label: 'Calendar', icon: Calendar },
    { value: 'FileText', label: 'File', icon: FileText },
    { value: 'Award', label: 'Award', icon: Award },
];

// --- Unified Notices Management (General + Holiday) ---
const NoticesTab = ({ notices: initialNotices }: { notices: Notice[] }) => {
    const { toast } = useToast();
    const [notices, setNotices] = useState(initialNotices);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const [formData, setFormData] = useState<Partial<Notice>>({
        title: '',
        date: new Date().toISOString().split('T')[0],
        type: 'general',
        summary: '',
        details: '',
        image_url: '',
        icon: 'Bell',
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Upload to Supabase Storage (no 1MB limit!)
        setIsUploading(true);
        try {
            const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result?.toString().split(',')[1] || '';
                    resolve(base64String);
                };
                reader.readAsDataURL(file);
            });

            const result = await uploadImageToGitHub(file.name, base64);
            
            if (result.success) {
                setFormData({ ...formData, image_url: result.url });
                toast({ title: 'Image uploaded successfully' });
            } else {
                toast({ variant: 'destructive', title: 'Upload failed', description: result.message });
            }
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            if (editingNotice?.id) {
                const updated = await updateNotice(editingNotice.id, formData);
                setNotices(notices.map(n => n.id === updated.id ? updated : n));
                toast({ title: 'Notice updated successfully' });
            } else {
                const created = await createNotice(formData as Notice);
                setNotices([created, ...notices]);
                toast({ title: 'Notice created successfully' });
            }
            setIsDialogOpen(false);
            setEditingNotice(null);
            setFormData({ title: '', date: new Date().toISOString().split('T')[0], type: 'general', summary: '', details: '', image_url: '', icon: 'Bell' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notice?')) return;
        
        try {
            await deleteNotice(id);
            setNotices(notices.filter(n => n.id !== id));
            toast({ title: 'Notice deleted successfully' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        }
    };

    const openEditDialog = (notice: Notice) => {
        setEditingNotice(notice);
        setFormData(notice);
        setIsDialogOpen(true);
    };

    const openCreateDialog = () => {
        setEditingNotice(null);
        setFormData({ title: '', date: new Date().toISOString().split('T')[0], type: 'general', summary: '', details: '', image_url: '', icon: 'Bell' });
        setIsDialogOpen(true);
    };

    const generalNotices = notices.filter(n => n.type === 'general');
    const holidayNotices = notices.filter(n => n.type === 'holiday');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notices ({notices.length})</h3>
                <Button onClick={openCreateDialog} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Notice
                </Button>
            </div>
            
            {/* General Notices Section */}
            {generalNotices.length > 0 && (
                <div>
                    <h4 className="text-md font-medium mb-3 text-muted-foreground">General Notices ({generalNotices.length})</h4>
                    <div className="grid gap-4">
                        {generalNotices.map((notice) => (
                            <Card key={notice.id} className="p-4">
                                <div className="flex gap-4">
                                    {notice.image_url && (
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={notice.image_url} alt={notice.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-lg">{notice.title}</h4>
                                                <p className="text-sm text-muted-foreground">{notice.date} • {notice.icon}</p>
                                                <p className="text-sm mt-2">{notice.summary}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => openEditDialog(notice)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(notice.id!)}>
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Holiday Notices Section */}
            {holidayNotices.length > 0 && (
                <div>
                    <h4 className="text-md font-medium mb-3 text-muted-foreground">Holiday Notices ({holidayNotices.length})</h4>
                    <div className="grid gap-4">
                        {holidayNotices.map((notice) => (
                            <Card key={notice.id} className="p-4">
                                <div className="flex gap-4">
                                    {notice.image_url && (
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={notice.image_url} alt={notice.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-lg">{notice.title}</h4>
                                                <p className="text-sm text-muted-foreground">{notice.date}</p>
                                                <p className="text-sm mt-2">{notice.summary}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => openEditDialog(notice)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(notice.id!)}>
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {notices.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No notices yet. Create your first notice!</p>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} key={editingNotice?.id || 'new'}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{editingNotice ? 'Edit Notice' : 'Create Notice'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select value={formData.type} onValueChange={(v: 'general' | 'holiday') => setFormData({...formData, type: v})}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">General Notice</SelectItem>
                                        <SelectItem value="holiday">Holiday Notice</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                        </div>
                        {formData.type === 'general' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Icon</Label>
                                    <Select value={formData.icon} onValueChange={v => setFormData({...formData, icon: v})}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {iconOptions.map(opt => (
                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label>Summary</Label>
                            <Textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Image (Optional)</Label>
                            <div className="flex gap-2">
                                <Input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                    className="flex-1"
                                />
                                {isUploading && <Loader2 className="animate-spin w-5 h-5" />}
                            </div>
                            {formData.image_url && (
                                <div className="relative w-full h-32 rounded-lg overflow-hidden mt-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain bg-muted" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Details (optional)</Label>
                            <Textarea value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} 
                                placeholder="Rich content for the notice detail view..." rows={4} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting || isUploading}>
                                {isSubmitting ? <Loader2 className="animate-spin" /> : (editingNotice ? 'Update' : 'Create')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// --- Results Management ---
const PushNoticesTab = ({ notices: initialNotices }: { notices: PushNotice[] }) => {
    const { toast } = useToast();
    const [notices, setNotices] = useState(initialNotices);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<PushNotice | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const [formData, setFormData] = useState<Partial<PushNotice>>({
        title: '',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
        link: '',
        is_active: true,
        display_until: null,
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // No 1MB limit - using Supabase Storage!
        setIsUploading(true);
        try {
            const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result?.toString().split(',')[1] || '';
                    resolve(base64String);
                };
                reader.readAsDataURL(file);
            });

            const result = await uploadImageToGitHub(file.name, base64);
            
            if (result.success) {
                setFormData({ ...formData, image_url: result.url });
                toast({ title: 'Image uploaded successfully' });
            } else {
                toast({ variant: 'destructive', title: 'Upload failed', description: result.message });
            }
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Clean up empty strings to undefined for date fields
            const cleanedData = {
                ...formData,
                display_until: formData.display_until || undefined,
            };
            
            if (editingNotice?.id) {
                const updated = await updatePushNotice(editingNotice.id, cleanedData);
                setNotices(notices.map(n => n.id === updated.id ? updated : n));
                toast({ title: 'Push notice updated successfully' });
            } else {
                const created = await createPushNotice(cleanedData as PushNotice);
                setNotices([created, ...notices]);
                toast({ title: 'Push notice created successfully' });
            }
            setIsDialogOpen(false);
            setEditingNotice(null);
            setFormData({ title: '', date: new Date().toISOString().split('T')[0], image_url: '', link: '', is_active: true, display_until: null });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this push notice?')) return;
        
        try {
            await deletePushNotice(id);
            setNotices(notices.filter(n => n.id !== id));
            toast({ title: 'Push notice deleted successfully' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        }
    };

    const toggleActive = async (notice: PushNotice) => {
        try {
            const updated = await updatePushNotice(notice.id!, { is_active: !notice.is_active });
            setNotices(notices.map(n => n.id === updated.id ? updated : n));
            toast({ title: `Notice ${updated.is_active ? 'activated' : 'deactivated'}` });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        }
    };

    const openEditDialog = (notice: PushNotice) => {
        setEditingNotice(notice);
        setFormData(notice);
        setIsDialogOpen(true);
    };

    const openCreateDialog = () => {
        setEditingNotice(null);
        setFormData({ title: '', date: new Date().toISOString().split('T')[0], image_url: '', link: '', is_active: true, display_until: null });
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Push Notices ({notices.length})</h3>
                <Button onClick={openCreateDialog} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Notice
                </Button>
            </div>
            
            <div className="grid gap-4">
                {notices.map((notice) => (
                    <Card key={notice.id} className={cn("p-4", !notice.is_active && "opacity-60")}>
                        <div className="flex gap-4">
                            {notice.image_url && (
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={notice.image_url} alt={notice.title} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-lg">{notice.title}</h4>
                                        <p className="text-sm text-muted-foreground">Date: {notice.date}</p>
                                        {notice.display_until && (
                                            <p className="text-xs text-muted-foreground">Display until: {notice.display_until}</p>
                                        )}
                                        {notice.link && (
                                            <a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline break-all">
                                                {notice.link}
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant={notice.is_active ? "default" : "outline"} 
                                            size="sm"
                                            onClick={() => toggleActive(notice)}
                                        >
                                            {notice.is_active ? 'Active' : 'Inactive'}
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(notice)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(notice.id!)}>
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} key={editingNotice?.id || 'new'}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{editingNotice ? 'Edit Push Notice' : 'Create Push Notice'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input 
                                value={formData.title} 
                                onChange={e => setFormData({...formData, title: e.target.value})} 
                                placeholder="Urgent: School Closure Notice"
                                required 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Notice Date</Label>
                                <Input 
                                    type="date" 
                                    value={formData.date} 
                                    onChange={e => setFormData({...formData, date: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Display Until (Optional)</Label>
                                <Input 
                                    type="date" 
                                    value={formData.display_until || ''} 
                                    onChange={e => setFormData({...formData, display_until: e.target.value || null})} 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <div className="flex gap-2">
                                <Input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                    className="flex-1"
                                />
                                {isUploading && <Loader2 className="animate-spin w-5 h-5" />}
                            </div>
                            {formData.image_url && (
                                <div className="relative w-full h-32 rounded-lg overflow-hidden mt-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain bg-muted" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Link (Optional)</Label>
                            <Input 
                                type="url"
                                value={formData.link} 
                                onChange={e => setFormData({...formData, link: e.target.value})}
                                placeholder="https://example.com/full-notice"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="is_active"
                                checked={formData.is_active} 
                                onChange={e => setFormData({...formData, is_active: e.target.checked})}
                                className="rounded border-gray-300"
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">Active (show on homepage)</Label>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting || isUploading}>
                                {isSubmitting ? <Loader2 className="animate-spin" /> : (editingNotice ? 'Update' : 'Create')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const ResultsTab = ({ results: initialResults }: { results: Result[] }) => {
    const { toast } = useToast();
    const [results, setResults] = useState(initialResults);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingResult, setEditingResult] = useState<Result | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [importPreview, setImportPreview] = useState<{ success: number; failed: number; errors: string[] } | null>(null);
    
    const [formData, setFormData] = useState<Partial<Result>>({
        StudentName: '',
        SymbolNo: '',
        DOB: '',
        Grade: '',
        GPA: 0,
        Remarks: '',
    });

    const filteredResults = results.filter(r => 
        r.StudentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.SymbolNo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        setImportPreview(null);
        
        try {
            const text = await file.text();
            const result = await importResultsFromCSV(text);
            setImportPreview(result);
            
            if (result.success > 0) {
                toast({ title: `Imported ${result.success} results successfully` });
                // Refresh results
                const response = await fetch('/api/results');
                if (response.ok) {
                    const newResults = await response.json();
                    setResults(newResults);
                }
            }
            
            if (result.failed > 0) {
                toast({ variant: 'destructive', title: `${result.failed} rows failed to import` });
            }
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Import failed', description: error.message });
        } finally {
            setIsImporting(false);
            e.target.value = ''; // Reset input
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Import createResult, updateResult, deleteResult dynamically
            const { createResult, updateResult } = await import('./actions');
            if (editingResult?.id) {
                const updated = await updateResult(editingResult.id, formData);
                setResults(results.map(r => r.id === updated.id ? updated : r));
                toast({ title: 'Result updated successfully' });
            } else {
                const created = await createResult(formData as Result);
                setResults([created, ...results]);
                toast({ title: 'Result created successfully' });
            }
            setIsDialogOpen(false);
            setEditingResult(null);
            setFormData({ StudentName: '', SymbolNo: '', DOB: '', Grade: '', GPA: 0, Remarks: '' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this result?')) return;
        
        try {
            const { deleteResult } = await import('./actions');
            await deleteResult(id);
            setResults(results.filter(r => r.id !== id));
            toast({ title: 'Result deleted successfully' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        }
    };

    const openEditDialog = (result: Result) => {
        setEditingResult(result);
        setFormData(result);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by name or symbol no..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Input 
                                type="file" 
                                accept=".csv,.txt"
                                onChange={handleFileUpload}
                                disabled={isImporting}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <Button variant="outline" className="gap-2" disabled={isImporting}>
                                {isImporting ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                Import CSV
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    <p className="font-medium">Expected columns:</p>
                    <p>Student Name, Symbol No, Date of Birth, GPA, Grade, Remarks</p>
                    <p className="text-xs mt-1 italic">Note: First row (header) will be automatically skipped during import</p>
                </div>

                {importPreview && (
                    <div className={`p-3 rounded-lg ${importPreview.failed > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
                        <p className="font-medium">Import Results:</p>
                        <p className="text-sm">✓ Success: {importPreview.success} | ✗ Failed: {importPreview.failed}</p>
                        {importPreview.errors.length > 0 && (
                            <details className="mt-2">
                                <summary className="text-sm cursor-pointer">View errors ({importPreview.errors.length})</summary>
                                <ul className="text-xs mt-2 space-y-1 max-h-32 overflow-y-auto">
                                    {importPreview.errors.map((err, i) => (
                                        <li key={i} className="text-red-600">• {err}</li>
                                    ))}
                                </ul>
                            </details>
                        )}
                    </div>
                )}
            </div>
            
            <h3 className="text-lg font-semibold">Results ({filteredResults.length})</h3>
            
            <div className="grid gap-4 max-h-[600px] overflow-y-auto">
                {filteredResults.map((result) => (
                    <Card key={result.id} className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">Student</p>
                                    <p className="font-medium">{result.StudentName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Symbol No</p>
                                    <p className="font-medium">{result.SymbolNo}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">DOB</p>
                                    <p className="font-medium">{result.DOB}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">GPA</p>
                                    <p className="font-medium">{result.GPA}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Grade</p>
                                    <p className="font-medium">{result.Grade}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <Button variant="ghost" size="icon" onClick={() => openEditDialog(result)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(result.id!)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                        {result.Remarks && (
                            <p className="text-sm text-muted-foreground mt-2">Remarks: {result.Remarks}</p>
                        )}
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingResult ? 'Edit Result' : 'Add Result'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Student Name</Label>
                                <Input value={formData.StudentName} onChange={e => setFormData({...formData, StudentName: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Symbol No</Label>
                                <Input value={formData.SymbolNo} onChange={e => setFormData({...formData, SymbolNo: e.target.value})} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Date of Birth</Label>
                                <Input value={formData.DOB} onChange={e => setFormData({...formData, DOB: e.target.value})} placeholder="YYYY-MM-DD" required />
                            </div>
                            <div className="space-y-2">
                                <Label>GPA</Label>
                                <Input type="number" step="0.01" min="0" max="4" 
                                    value={formData.GPA} onChange={e => setFormData({...formData, GPA: parseFloat(e.target.value)})} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Grade</Label>
                                <Input value={formData.Grade} onChange={e => setFormData({...formData, Grade: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Remarks (Optional)</Label>
                                <Input value={formData.Remarks} onChange={e => setFormData({...formData, Remarks: e.target.value})} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin" /> : (editingResult ? 'Update' : 'Create')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default function AdminView({ 
    initialInquiries,
    initialMessages,
    initialNotices,
    initialResults,
    initialPushNotices,
}: { 
    initialInquiries: Inquiry[];
    initialMessages: Message[];
    initialNotices: Notice[];
    initialResults: Result[];
    initialPushNotices: PushNotice[];
}) {
    const [activeTab, setActiveTab] = useState("admissions");
    const [menuOpen, setMenuOpen] = useState(true);
    
    const tabDescriptions: { [key: string]: string } = {
        admissions: 'View all submitted admission inquiries.',
        contact: 'View all submitted contact form messages.',
        'notices': 'Manage general and holiday notices.',
        results: 'Manage student examination results.',
        'push-notices': 'Manage homepage popup announcements.',
    };

    return (
        <div className="container mx-auto px-4">
            <Card className="testimonial-card">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                            <CardDescription>
                                {tabDescriptions[activeTab]}
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            aria-label="Toggle navigation menu"
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <AdminNavDrawer
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                    />

                    {activeTab === 'admissions' && <AdmissionsTab inquiries={initialInquiries} />}
                    {activeTab === 'contact' && <ContactTab messages={initialMessages} />}
                    {activeTab === 'notices' && <NoticesTab notices={initialNotices} />}
                    {activeTab === 'results' && <ResultsTab results={initialResults} />}
                    {activeTab === 'push-notices' && <PushNoticesTab notices={initialPushNotices} />}
                </CardContent>
            </Card>
        </div>
    );
}
