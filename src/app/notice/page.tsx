import type { Metadata } from 'next';
import NoticeView from './view';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Notices',
  description: 'Stay updated with the latest announcements, holidays, and news from SARC Education Foundation.',
};

export default async function NoticePage() {
  const supabase = await createClient();
  
  const { data: notices, error } = await supabase
    .from('notices')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error("Error fetching notices:", error.message);
  }

  // Split by type
  const generalNotices = notices?.filter(n => n.type === 'general') || [];
  const holidayNotices = notices?.filter(n => n.type === 'holiday') || [];

  // Ensure data is plain objects
  const safeGeneralNotices = JSON.parse(JSON.stringify(generalNotices));
  const safeHolidayNotices = JSON.parse(JSON.stringify(holidayNotices));
  
  return <NoticeView initialGeneralNotices={safeGeneralNotices} initialHolidayNotices={safeHolidayNotices} />;
}
