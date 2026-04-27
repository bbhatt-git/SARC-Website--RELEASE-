'use client';
import PageHeader from '@/app/components/page-header';
import { Timeline } from '@/app/components/timeline';
import { CalendarDays } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Holiday = {
    name: string;
    date: string;
    details: string;
};

interface HolidayNoticeViewProps {
  initialHolidays: Holiday[];
}

export default function HolidayNoticeView({ initialHolidays }: HolidayNoticeViewProps) {

    const timelineData = (initialHolidays || []).map(holiday => ({
        title: holiday.date,
        content: (
            <div className="testimonial-card p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                <div className="flex items-start gap-4">
                    <div className="bg-rose-100 dark:bg-rose-900/50 p-3 rounded-full mt-1">
                        <CalendarDays className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{holiday.name}</h3>
                         <div className="text-sm text-muted-foreground mt-1 [&_p]:my-1">
                             <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {holiday.details || ''}
                            </ReactMarkdown>
                         </div>
                    </div>
                </div>
            </div>
        )
    }));

    return (
        <div>
            <PageHeader title="Holiday Notices" subtitle="Academic Calendar & Breaks" />
            <div className="container mx-auto px-4 py-20">
                {(initialHolidays && initialHolidays.length > 0) ? (
                    <Timeline data={timelineData} titleClassName="!text-xl !font-semibold !text-rose-500 dark:!text-rose-400" />
                ) : (
                    <div className="testimonial-card text-center p-12 max-w-lg mx-auto">
                        <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold">No Holiday Notices</h3>
                        <p className="text-neutral-text-muted mt-2">The academic calendar for holidays has not been published yet. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
