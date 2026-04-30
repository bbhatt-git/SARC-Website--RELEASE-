'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { type PushNotice } from '@/app/admin/actions';

interface PushNoticeModalProps {
  notices: PushNotice[];
}

export function PushNoticeModal({ notices }: PushNoticeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const hasShownModal = useRef(false);

  // Filter active notices
  const activeNotices = notices.filter(notice => notice.is_active);

  const currentNotice = activeNotices[currentIndex];

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
    }
    return () => document.documentElement.classList.remove('modal-open');
  }, [isOpen]);

  useEffect(() => {
    // Show modal only once if there are active notices
    if (activeNotices.length > 0 && !hasShownModal.current) {
      hasShownModal.current = true;
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500); // Show after 0.5 seconds
      return () => clearTimeout(timer);
    }
  }, [activeNotices]);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentIndex < activeNotices.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (activeNotices.length === 0 || !currentNotice) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="!w-[95vw] md:!w-auto !max-w-[95vw] md:!max-w-fit !p-0 !bg-transparent !border-0 !shadow-none !gap-0 !outline-none !ring-0 [&>button:last-child]:hidden">
        <DialogClose className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-[60] h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all hover:bg-black/80 hover:scale-110 active:scale-95 group">
          <X className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90 duration-300" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <VisuallyHidden>
          <DialogTitle>Push Notice</DialogTitle>
        </VisuallyHidden>

        {/* Navigation arrows */}
        {activeNotices.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === activeNotices.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image only - no text, no buttons */}
        {currentNotice.image_url && (
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentNotice.image_url}
              alt="Push notice"
              className="w-full object-contain max-h-[85vh]"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
