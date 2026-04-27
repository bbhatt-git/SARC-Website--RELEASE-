import AdminView from './view';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Manage website content and settings.',
};

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch all data in parallel
  const [
    { data: inquiries, error: inquiriesError },
    { data: messages, error: messagesError },
    { data: notices, error: noticesError },
    { data: results, error: resultsError },
    { data: pushNotices, error: pushNoticesError }
  ] = await Promise.allSettled([
    supabase.from('admission_inquiries').select('*').order('created_at', { ascending: false }),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    supabase.from('notices').select('*').order('date', { ascending: false }),
    supabase.from('results').select('*').order('created_at', { ascending: false }),
    supabase.from('push_notices').select('*').order('created_at', { ascending: false })
  ]).then(results => results.map(r => r.status === 'fulfilled' ? r.value : { data: null, error: r.reason }));
  
  const error = (inquiriesError as any)?.message || (messagesError as any)?.message || (noticesError as any)?.message || 
                (resultsError as any)?.message || (pushNoticesError as any)?.message;

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8 mt-24">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Database Error</AlertTitle>
          <AlertDescription>
            {error}. This might be due to missing Supabase tables or incorrect RLS policies. Please check your Supabase project settings.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Ensure data is plain objects
  const safeInquiries = JSON.parse(JSON.stringify(inquiries || []));
  const safeMessages = JSON.parse(JSON.stringify(messages || []));
  const safeNotices = JSON.parse(JSON.stringify(notices || []));
  const safeResults = JSON.parse(JSON.stringify(results || []));
  const safePushNotices = JSON.parse(JSON.stringify(pushNotices || []));

  return (
    <AdminView 
      initialInquiries={safeInquiries} 
      initialMessages={safeMessages}
      initialNotices={safeNotices}
      initialResults={safeResults}
      initialPushNotices={safePushNotices}
    />
  );
}
