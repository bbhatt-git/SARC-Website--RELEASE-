import type { Metadata } from 'next';
import ContactView from './view';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SARC Education Foundation. Find our address, phone number, email, and a contact form to send us a message.',
};

export default function ContactPage() {
  return <ContactView />;
}
