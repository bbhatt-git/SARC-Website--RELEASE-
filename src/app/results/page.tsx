import type { Metadata } from 'next';
import ResultsView from './view';

export const metadata: Metadata = {
  title: 'Results',
  description: 'Check your examination results from SARC Education Foundation.',
};

export default function ResultsPage() {
  return <ResultsView />;
}
