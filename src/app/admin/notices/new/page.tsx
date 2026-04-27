import type { Metadata } from 'next';
import NoticeEditor from './editor';

export const metadata: Metadata = {
  title: 'Create Notice',
  description: 'Create a new notice',
};

export default function NewNoticePage() {
  return <NoticeEditor />;
}
