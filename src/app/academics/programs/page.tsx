import type { Metadata } from 'next';
import ProgramsView from './view';

export const metadata: Metadata = {
  title: 'Academic Programs',
  description: "Explore SARC's academic programs, from our foundational School Program (ECD-10) to specialized +2 streams in Science and Management. Learn about our modern teaching approach and subject combinations.",
};

export default function ProgramsPage() {
  return <ProgramsView />;
}
