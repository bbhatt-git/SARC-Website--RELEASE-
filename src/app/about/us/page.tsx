import type { Metadata } from 'next';
import AboutView from './view';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover the story, vision, history, and values of SARC. Learn about our mission, our achievements, and what makes us a leading educational institution.',
};

export default function AboutUsPage() {
  return <AboutView />;
}
