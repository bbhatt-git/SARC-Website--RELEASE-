'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import PageHeader from '@/app/components/page-header';
import { Search, Home, Image as ImageIcon, Mail, type LucideIcon, ShieldCheck } from 'lucide-react';

type SearchResult = {
  label: string;
  href: string;
  description: string;
  category: string;
  icon: LucideIcon;
};

// Flatten NAV_LINKS to a single array of searchable pages
const allPages: SearchResult[] = NAV_LINKS.flatMap(link => {
  // If the link has children (e.g., 'About', 'Academics'), map over them
  if (link.children) {
    return link.children.map(child => ({
      label: child.label,
      href: child.href,
      description: child.description,
      category: link.label,
      icon: child.icon,
    }));
  }

  // Handle standalone, top-level links
  if (link.href === '/') {
    return [{ label: link.label, href: link.href, description: 'The main homepage of SARC Education Foundation.', category: 'Main', icon: Home }];
  }
   if (link.href === '/results') {
    return [{ label: link.label, href: link.href, description: 'Check your examination results.', category: 'Main', icon: ShieldCheck }];
  }
  if (link.href === '/gallery') {
    return [{ label: link.label, href: link.href, description: 'Explore moments of learning, discovery, and community.', category: 'Main', icon: ImageIcon }];
  }
  if (link.href === '/contact') {
    return [{ label: link.label, href: link.href, description: 'Get in touch with us, find our location, and send a message.', category: 'Main', icon: Mail }];
  }
  
  // Return an empty array for links that shouldn't be in search results (if any)
  return [];
});


function SearchComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredResults = allPages.filter(page =>
        page.label.toLowerCase().includes(lowerCaseQuery) ||
        (page.description && page.description.toLowerCase().includes(lowerCaseQuery)) ||
        page.category.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <PageHeader title="Search Results" subtitle={query ? `For "${query}"` : "Enter a search term"} />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {query && results.length > 0 ? (
            <div className="space-y-6">
                <p className="text-muted-foreground">{results.length} result(s) found</p>
                {results.map(result => (
                    <Link href={result.href} key={result.href} passHref className='no-underline'>
                        <div className="testimonial-card p-6 flex items-start gap-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand/50">
                            <div className="bg-brand-light text-brand p-4 rounded-xl mt-1">
                                <result.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-brand uppercase tracking-wider">{result.category}</p>
                                <h3 className="text-xl font-bold text-foreground mt-1">{result.label}</h3>
                                <p className="text-neutral-text-muted mt-2">{result.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-16 px-6 testimonial-card flex flex-col items-center gap-4">
                <div className="bg-brand-light rounded-full p-5 border-4 border-brand/20">
                    <Search className="h-16 w-16 text-brand" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mt-4">
                    {query ? 'No Results Found' : 'Search SARC'}
                </h3>
                <p className="max-w-md text-neutral-text-muted">
                    {query ? `Sorry, we couldn't find any pages matching your search for "${query}". Try a different keyword.` : 'Use the search bar in the navigation to find information on our site.'}
                </p>
            </div>
        )}
      </div>
    </div>
  );
}

export default function SearchView() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchComponent />
        </Suspense>
    )
}
