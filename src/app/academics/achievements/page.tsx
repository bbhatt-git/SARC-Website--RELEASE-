import type { Metadata } from 'next';
import AchievementsView from './view';

export const metadata: Metadata = {
  title: 'Alumni Network',
  description: 'Explore the success stories of SARC alumni and see how they are making an impact across the globe. Connect with our growing network of innovators and leaders.',
};

export default function AchievementsPage() {
  return <AchievementsView />;
}
