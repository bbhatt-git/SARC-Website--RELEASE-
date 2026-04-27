import type { Metadata } from 'next';
import ProfileView from './view';

export const metadata: Metadata = {
    title: 'User Profile',
    description: 'Manage your profile settings.',
};

export default function ProfilePage() {
  return <ProfileView />;
}
