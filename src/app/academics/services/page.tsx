import type { Metadata } from 'next';
import FacilitiesView from './view';

export const metadata: Metadata = {
  title: 'Facilities & Innovation',
  description: 'Explore SARC\'s modern facilities, from labs and libraries to our hands-on approach to practical learning and innovation.',
};

export default function FacilitiesPage() {
  return <FacilitiesView />;
}
