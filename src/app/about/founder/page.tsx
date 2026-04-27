import type { Metadata } from 'next';
import FounderView from './view';

export const metadata: Metadata = {
  title: 'Our Founder',
  description: 'Meet the visionary founder behind SARC Education Foundation and learn about the mission to reshape education in Nepal.',
};

export default function FounderPage() {
  return <FounderView />;
}
