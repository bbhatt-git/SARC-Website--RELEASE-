import type { Metadata } from 'next';
import NoticeEditor from './editor';

interface EditNoticePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Edit Notice',
  description: 'Edit an existing notice',
};

export default async function EditNoticePage({ params }: EditNoticePageProps) {
  const { id } = await params;
  return <NoticeEditor noticeId={id} />;
}
