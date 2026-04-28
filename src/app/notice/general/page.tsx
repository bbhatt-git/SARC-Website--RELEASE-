import type { Metadata } from 'next';
import GeneralNoticeView from './view';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Notices',
  description: 'Stay updated with the latest announcements from SARC Education Foundation.',
};

export default async function GeneralNoticePage() {
  const supabase = await createClient();
  const { data: notices, error } = await supabase
    .from('notices')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error("Error fetching notices:", error.message);
    return <GeneralNoticeView notices={[]} />;
  }

  // Ensure data is a plain object before passing to client component
  const safeNotices = JSON.parse(JSON.stringify(notices || []));
  return <GeneralNoticeView notices={safeNotices} />;
}
