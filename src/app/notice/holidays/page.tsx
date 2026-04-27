import type { Metadata } from 'next';
import HolidayNoticeView from './view';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Holiday Notices',
  description: 'View the academic calendar and information about upcoming holidays and breaks at SARC.',
};

export default async function HolidayNoticePage() {
  const supabase = await createClient();
  const { data: notices, error } = await supabase
    .from('notices')
    .select('*')
    .eq('type', 'holiday')
    .order('date', { ascending: false });
  
  if (error) {
    console.error("Error fetching holiday notices:", error.message);
    return <HolidayNoticeView initialHolidays={[]} />;
  }

  // Ensure data is a plain object before passing to client component
  const holidayNotices = JSON.parse(JSON.stringify(notices || []));
  return <HolidayNoticeView initialHolidays={holidayNotices} />;
}
