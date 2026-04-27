import type { Metadata } from 'next';
import AdmissionsView from './view';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Start your journey at SARC. Find information about our admission process and apply online for our academic programs.',
};

export default function AdmissionsPage() {
  return <AdmissionsView />;
}
