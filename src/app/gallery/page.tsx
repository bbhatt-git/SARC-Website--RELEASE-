import type { Metadata } from 'next';
import GalleryView from './view';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore moments of learning, discovery, and community at SARC through our photo gallery.',
};

export default function GalleryPage() {
  return <GalleryView />;
}
