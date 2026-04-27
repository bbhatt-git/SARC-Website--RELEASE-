'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  const handleCloseAll = () => {
    setIsOpen(false);
  };

  if (activeNotices.length === 0 || !currentNotice) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Navigation arrows outside the card */}
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

        {currentNotice.image_url && (
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={currentNotice.image_url} 
              alt={currentNotice.title}
              className="w-full object-contain max-h-[300px]"
            />
          </div>
        )}
        
        <div className="p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{currentNotice.date}</span>
              {activeNotices.length > 1 && (
                <span className="ml-auto text-xs bg-muted px-2 py-1 rounded">
                  {currentIndex + 1} / {activeNotices.length}
                </span>
              )}
            </div>
            <DialogTitle className="text-xl font-semibold leading-tight">
              {currentNotice.title}
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-3 mt-6">
            {currentNotice.link && (
              <Button 
                asChild 
                className="flex-1 gap-2"
                onClick={handleDismiss}
              >
                <a href={currentNotice.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Learn More
                </a>
              </Button>
            )}
            <Button 
              variant={currentNotice.link ? "outline" : "default"}
              className={currentNotice.link ? "flex-1" : "w-full"}
              onClick={handleDismiss}
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Small floating indicator for new notices
export function PushNoticeIndicator({ notices }: PushNoticeModalProps) {
  const [hasUnread, setHasUnread] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const activeNotices = notices.filter(notice => notice.is_active);
    setHasUnread(activeNotices.length > 0);
  }, [notices]);

  if (!hasUnread || isDismissed) return null;

  return (
    <button
      onClick={() => setIsDismissed(true)}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all animate-in slide-in-from-bottom-5"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      <span className="text-sm font-medium">New Notice</span>
    </button>
  );
}
