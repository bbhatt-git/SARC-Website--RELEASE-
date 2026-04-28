'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { imageData } from '@/lib/image-data';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Camera, Share2, Facebook, Instagram, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GALLERY_CATEGORIES } from '@/lib/constants';

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="h-8 w-8"><path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z"/></svg>
);

// Component for the Lightbox
const Lightbox = ({ images, selectedIndex, onClose, onPrev, onNext }: { images: typeof imageData.gallery, selectedIndex: number, onClose: () => void, onPrev: () => void, onNext: () => void }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.classList.add('lightbox-open');
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('lightbox-open');
        };
    }, [onClose, onNext, onPrev]);

    const image = images[selectedIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div 
                layoutId={`gallery-image-${image.src}`}
                className="relative w-full h-full max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-contain"
                />
            </motion.div>

            {/* Close Button */}
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close image viewer" className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full">
                <X size={32} />
            </button>

            {/* Prev Button */}
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full">
                <ArrowLeft size={32} />
            </button>
            
            {/* Next Button */}
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full">
                <ArrowRight size={32} />
            </button>
        </motion.div>
    );
};

export default function GalleryView() {
    const allImages = imageData.gallery;
    

    // Lightbox state
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };
    
    const handleCloseLightbox = () => {
        setSelectedImageIndex(null);
    };

    const handleNext = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! + 1) % allImages.length);
    };

    const handlePrev = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! - 1 + allImages.length) % allImages.length);
    };
    
    // Category filter state
    const [activeCategory, setActiveCategory] = useState('All');
    const filteredImages = activeCategory === 'All'
        ? allImages
        : allImages.filter(img => img.category === activeCategory);

    // Social Modal state
    const [socialModalOpen, setSocialModalOpen] = useState(false);

    const socialLinks = [
        { href: "https://www.facebook.com/sarc.edu.np", label: "Facebook", icon: Facebook },
        { href: "https://instagram.com/sarc.edu.np", label: "Instagram", icon: Instagram },
        { href: "https://www.tiktok.com/@sarceducationfoun", label: "TikTok", icon: TikTokIcon },
        { href: "https://github.com/sarceducationfoundation", label: "Github", icon: Github },
    ];

    return (
        <div>
            <PageHeader
                title="Our Gallery"
                subtitle="Moments of Discovery and Community"
            />
            
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <Lightbox
                        images={allImages}
                        selectedIndex={selectedImageIndex}
                        onClose={handleCloseLightbox}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>
            
            <div className="py-12 md:py-16 space-y-16 md:space-y-20">

                {/* Section 1: Explore by Category */}
                <section className="container mx-auto px-4 md:px-6">
                    <SectionTitle
                        title="Discover by Category"
                        subtitle="Explore Our World"
                        className="mb-8 md:mb-10"
                    />
                    <div className="flex justify-center flex-wrap gap-2 mb-8 md:mb-10">
                        {GALLERY_CATEGORIES.map(category => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category)}
                                className="rounded-full text-sm"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                        {filteredImages.map(image => (
                             <div key={image.src} className="testimonial-card group overflow-hidden">
                                <div className="relative h-48 md:h-52">
                                     <Image
                                        src={image.src}
                                        alt={image.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        data-ai-hint={image.hint}
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-foreground text-sm truncate">{image.title}</h3>
                                    <p className="text-xs text-muted-foreground">{image.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Coming Soon */}
                <section className="container mx-auto px-4 md:px-6">
                     <div className="testimonial-card p-6 md:p-8 text-center relative overflow-hidden flex flex-col items-center">
                        <div className="bg-brand-light p-3 rounded-full mb-4 border border-brand/20">
                             <Camera className="w-8 h-8 text-brand" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 relative">More Photos Coming Soon!</h2>
                        <p className="text-sm md:text-base text-neutral-text-muted max-w-3xl mx-auto leading-relaxed relative">
                           We're continuously updating our gallery with new photos showcasing student projects, campus life, educational tours, and innovation labs. Check back soon for more!
                        </p>
                        <Button className="mt-6 md:mt-8" onClick={() => setSocialModalOpen(true)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Follow Us on Social Media
                        </Button>
                    </div>
                </section>

            </div>

             <Dialog open={socialModalOpen} onOpenChange={setSocialModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Follow Our Journey</DialogTitle>
                        <DialogDescription>
                            Stay connected with SARC on social media for the latest updates, events, and moments.
                        </DialogDescription>
                    </DialogHeader>
                    <TooltipProvider>
                        <div className="flex justify-around items-center py-8">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Tooltip key={social.label}>
                                        <TooltipTrigger asChild>
                                            <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${social.label}`} className="text-neutral-text-muted hover:text-brand transition-colors">
                                                {social.label === 'TikTok' ? <Icon /> : <Icon size={32} />}
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{social.href}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </TooltipProvider>
                </DialogContent>
            </Dialog>

        </div>
    );
}
