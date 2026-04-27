'use client';
import PageHeader from '@/app/components/page-header';
import { Bell, FileText, Calendar, Award, GraduationCap, School } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SlateRenderer } from '@/components/editor/slate-renderer';


const iconMap = {
    Bell,
    FileText,
    Calendar,
    Award,
    GraduationCap,
    School,
    Default: Bell
};

type Notice = {
    title: string;
    date: string;
    summary: string;
    icon: keyof typeof iconMap;
    details?: string;
};

interface GeneralNoticeViewProps {
    initialNotices: Notice[];
}

export default function GeneralNoticeView({ initialNotices }: GeneralNoticeViewProps) {
    const getIconColor = (iconName: keyof typeof iconMap) => {
        switch(iconName) {
            case 'Bell': return 'bg-sky-500/10 text-sky-500';
            case 'FileText': return 'bg-amber-500/10 text-amber-500';
            case 'Calendar': return 'bg-rose-500/10 text-rose-500';
            case 'Award': return 'bg-emerald-500/10 text-emerald-500';
            default: return 'bg-sky-500/10 text-sky-500';
        }
    }

    return (
        <div>
            <PageHeader title="General Notices" subtitle="Stay Informed" />
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="space-y-6">
                    {initialNotices && initialNotices.length > 0 ? (
                        initialNotices.map((notice, index) => {
                            const IconComponent = iconMap[notice.icon] || iconMap.Default;
                            
                            const noticeCard = (
                                <div
                                    className="testimonial-card p-6 w-full text-left"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={cn('p-3 rounded-xl', getIconColor(notice.icon))}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-foreground">{notice.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">Published on: {notice.date}</p>
                                            <p className="text-neutral-text-muted mt-3">{notice.summary}</p>
                                        </div>
                                    </div>
                                </div>
                            );

                            if (!notice.details) {
                                return <div key={index}>{noticeCard}</div>;
                            }

                            return (
                                <Dialog key={index}>
                                    <DialogTrigger asChild>
                                        <div className="cursor-pointer transition-all duration-300 hover:-translate-y-1">
                                            {noticeCard}
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[625px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-foreground">{notice.title}</DialogTitle>
                                            <DialogDescription className="text-sm text-muted-foreground pt-2">
                                                Published on: {notice.date}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 text-foreground/90 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                            <SlateRenderer content={notice.details} />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            );
                        })
                    ) : (
                        <div className="testimonial-card text-center p-12">
                             <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold">No General Notices</h3>
                            <p className="text-neutral-text-muted mt-2">There are no general notices at the moment. Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
