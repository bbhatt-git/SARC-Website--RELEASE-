import type { Metadata } from 'next';
import PushNoticeEditor from './editor';

interface EditPushNoticePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Edit Push Notice',
  description: 'Edit an existing push notice',
};

export default async function EditPushNoticePage({ params }: EditPushNoticePageProps) {
  const { id } = await params;
  return <PushNoticeEditor noticeId={id} />;
}
