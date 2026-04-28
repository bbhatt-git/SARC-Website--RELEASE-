'use client';
import PageHeader from '@/app/components/page-header';
import { Bell } from 'lucide-react';

type Notice = {
    id?: string;
    title: string;
    date: string;
    description?: string;
    image_url?: string;
};

interface GeneralNoticeViewProps {
    notices: Notice[];
}

export default function GeneralNoticeView({ notices }: GeneralNoticeViewProps) {
    return (
        <div>
            <PageHeader title="Notices" subtitle="Stay Informed" />
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="space-y-6">
                    {notices && notices.length > 0 ? (
                        notices.map((notice, index) => (
                            <div key={notice.id || index} className="testimonial-card p-6 w-full text-left">
                                <div className="flex items-start gap-5">
                                    {notice.image_url && (
                                        <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={notice.image_url} alt={notice.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-foreground">{notice.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {notice.date}
                                        </p>
                                        {notice.description && (
                                            <p className="text-neutral-text-muted mt-3">{notice.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="testimonial-card text-center p-12">
                             <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold">No Notices</h3>
                            <p className="text-neutral-text-muted mt-2">There are no notices at the moment. Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
