import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Holiday Notices',
  description: 'View the academic calendar and information about upcoming holidays and breaks at SARC.',
};

export default function HolidayNoticePage() {
  redirect('/notice');
}
