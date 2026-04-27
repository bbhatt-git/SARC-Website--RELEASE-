import type { Metadata } from 'next';
import SearchView from './view';

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Find information on the SARC Education Foundation website.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function SearchPage() {
  return <SearchView />;
}
