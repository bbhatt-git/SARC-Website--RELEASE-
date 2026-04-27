import type { Metadata } from 'next';
import GeneralNoticeView from './view';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'General Notices',
  description: 'Stay updated with the latest announcements, news, and general notices from SARC Education Foundation.',
};

export default async function GeneralNoticePage() {
  const supabase = await createClient();
  const { data: notices, error } = await supabase
    .from('notices')
    .select('*')
    .eq('type', 'general')
    .order('date', { ascending: false });

  if (error) {
    console.error("Error fetching general notices:", error.message);
    return <GeneralNoticeView initialNotices={[]} />;
  }

  // Ensure data is a plain object before passing to client component
  const generalNotices = JSON.parse(JSON.stringify(notices || []));
  return <GeneralNoticeView initialNotices={generalNotices} />;
}
