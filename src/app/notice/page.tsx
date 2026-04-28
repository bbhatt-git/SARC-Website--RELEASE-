import type { Metadata } from 'next';
import NoticeView from './view';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Notices',
  description: 'Stay updated with the latest announcements from SARC Education Foundation.',
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

  // Ensure data is plain objects
  const safeNotices = JSON.parse(JSON.stringify(notices || []));

  return <NoticeView notices={safeNotices} />;
}
