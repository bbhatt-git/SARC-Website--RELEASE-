import HomeView from './home-view';
import { createClient } from '@/lib/supabase/server';
import { PushNoticeModal } from './components/push-notice-modal';

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch active push notices
  const { data: pushNotices } = await supabase
    .from('push_notices')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <>
      <PushNoticeModal notices={pushNotices || []} />
      <HomeView />
    </>
  );
}
