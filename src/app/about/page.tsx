import type { Metadata } from 'next';
import AboutView from './view';

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover SARC Education Foundation - our story, founder, facilities, innovation, and alumni network.',
};

export default function AboutPage() {
  return <AboutView />;
}
