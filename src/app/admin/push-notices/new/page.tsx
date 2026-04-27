import type { Metadata } from 'next';
import PushNoticeEditor from './editor';

export const metadata: Metadata = {
  title: 'Create Push Notice',
  description: 'Create a new push notice',
};

export default function NewPushNoticePage() {
  return <PushNoticeEditor />;
}
