'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
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
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-transparent border-0 shadow-none">
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
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentNotice.image_url}
              alt="Push notice"
              className="w-full object-contain max-h-[80vh]"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
