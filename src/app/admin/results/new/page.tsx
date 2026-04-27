import type { Metadata } from 'next';
import ResultEditor from './editor';

export const metadata: Metadata = {
  title: 'Add Result',
  description: 'Add a single student result',
};

export default function NewResultPage() {
  return <ResultEditor />;
}
