
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
      <div className="testimonial-card p-8 sm:p-16 max-w-lg w-full relative overflow-hidden">
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-brand">404</h1>
        <p className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
          Page Not Found
        </p>
        <p className="mt-4 max-w-sm mx-auto text-neutral-text-muted">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild className="mt-8 rounded-full font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-105">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
