import type { Metadata } from 'next';
import StaffsView from './view';

export const metadata: Metadata = {
  title: 'Our Dedicated Staff',
  description: 'Meet the experienced and dedicated team of educators and staff at SARC who are committed to student success.',
};

export default function StaffPage() {
  return <StaffsView />;
}
