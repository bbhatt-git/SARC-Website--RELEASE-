'use client';
import PageHeader from '@/app/components/page-header';
import { Bell, FileText, Calendar, Award, GraduationCap, School, CalendarDays } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlateRenderer } from '@/components/editor/slate-renderer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const iconMap = { Bell, FileText, Calendar, Award, GraduationCap, School, Default: Bell };

type Notice = {
    id?: string;
    title: string;
    date: string;
    summary: string;
    type: 'general' | 'holiday';
    icon?: keyof typeof iconMap;
    details?: string;
};

const getIconColor = (iconName?: keyof typeof iconMap) => {
    switch(iconName) {
        case 'Bell': return 'bg-sky-500/10 text-sky-500';
        case 'FileText': return 'bg-amber-500/10 text-amber-500';
        case 'Calendar': return 'bg-rose-500/10 text-rose-500';
        case 'Award': return 'bg-emerald-500/10 text-emerald-500';
        default: return 'bg-sky-500/10 text-sky-500';
    }
};

interface NoticeViewProps {
    initialGeneralNotices: Notice[];
    initialHolidayNotices: Notice[];
}

export default function NoticeView({ initialGeneralNotices, initialHolidayNotices }: NoticeViewProps) {
    // Combine all notices and sort by date (newest first)
    const allNotices: Notice[] = [
        ...initialGeneralNotices.map(n => ({ ...n, type: 'general' as const })),
        ...initialHolidayNotices.map(n => ({ 
            ...n, 
            type: 'holiday' as const, 
            title: n.name || n.title,
            icon: 'Calendar' as const
        }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!allNotices || allNotices.length === 0) {
        return (
            <div>
                <PageHeader title="Notices" subtitle="Stay Informed" />
                <div className="container mx-auto px-4 py-20 max-w-4xl">
                    <div className="testimonial-card text-center p-12">
                        <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold">No Notices</h3>
                        <p className="text-neutral-text-muted mt-2">There are no notices at the moment. Please check back later.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PageHeader title="Notices" subtitle="Stay Informed" />
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="space-y-6">
                    {allNotices.map((notice, index) => {
                        const isHoliday = notice.type === 'holiday';
                        const IconComponent = isHoliday ? CalendarDays : (iconMap[notice.icon || 'Default'] || iconMap.Default);
                        
                        const noticeCard = (
                            <div className="testimonial-card p-6 w-full text-left">
                                <div className="flex items-start gap-5">
                                    <div className={cn('p-3 rounded-xl', isHoliday 
                                        ? 'bg-rose-500/10 text-rose-500' 
                                        : getIconColor(notice.icon)
                                    )}>
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn(
                                                'text-xs px-2 py-0.5 rounded font-medium',
                                                isHoliday 
                                                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' 
                                                    : 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                                            )}>
                                                {isHoliday ? 'Holiday' : 'General'}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground">{notice.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {isHoliday ? 'Date: ' : 'Published on: '}{notice.date}
                                        </p>
                                        <p className="text-neutral-text-muted mt-3">
                                            {isHoliday 
                                                ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{notice.details || ''}</ReactMarkdown>
                                                : notice.summary
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );

                        // Holiday notices show details inline, general notices can have dialog
                        if (isHoliday || !notice.details) {
                            return <div key={notice.id || index}>{noticeCard}</div>;
                        }

                        return (
                            <Dialog key={notice.id || index}>
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
                    })}
                </div>
            </div>
        </div>
    );
}
