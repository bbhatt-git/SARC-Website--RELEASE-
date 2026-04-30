"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { TESTIMONIALS } from "@/lib/constants";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

export default function EmptyTestimonial() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % TESTIMONIALS.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }
  };

  const closeModal = () => setSelectedIdx(null);

  const pageVariants = {
    spring: { type: "spring" as const, duration: 0.6 },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-24 px-4">
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-[56px] md:leading-[1.1] mb-4">
          Wall of{" "}
          <motion.span
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative cursor-default inline-flex items-center gap-2 px-4 py-1 rounded-2xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 hover:border-primary/20 transition-colors duration-300"
          >
            Love
            <motion.span
              animate={
                isHovered
                  ? {
                      scale: [1, 1.1, 1],
                    }
                  : { scale: 1 }
              }
              transition={{
                duration: 0.7,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              💖
            </motion.span>
          </motion.span>
        </h2>
        <p className="text-neutral-text-muted text-lg max-w-[600px] mx-auto">
          Hear from students, parents, and faculty who have experienced the SARC difference.
        </p>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-80 h-52 relative group cursor-pointer mb-12"
      >
        <div
          className="folder-back relative w-[87.5%] mx-auto h-full flex justify-center rounded-xl overflow-visible"
          style={{
            background: "#EBEBEB",
            border: "1px solid #D1D1D1",
          }}
        >
          {[
            {
              initial: { rotate: -3, x: -38, y: 2 },
              open: { rotate: -8, x: -70, y: -75 },
              transition: {
                type: "spring" as const,
                bounce: 0.15,
                stiffness: 160,
                damping: 22,
              },
              className: "z-10",
              testimonial: TESTIMONIALS[0]
            },
            {
              initial: { rotate: 0, x: 0, y: 0 },
              open: { rotate: 1, x: 2, y: -95 },
              transition: {
                type: "spring" as const,
                duration: 0.55,
                bounce: 0.12,
                stiffness: 190,
                damping: 24,
              },
              className: "z-20",
              testimonial: TESTIMONIALS[1]
            },
            {
              initial: { rotate: 3.5, x: 42, y: 1 },
              open: { rotate: 9, x: 75, y: -80 },
              transition: {
                type: "spring" as const,
                duration: 0.58,
                bounce: 0.17,
                stiffness: 170,
                damping: 21,
              },
              className: "z-10",
              testimonial: TESTIMONIALS[2]
            },
          ].map((page, i) => (
            <motion.div
              key={i}
              initial={page.initial}
              animate={isOpen ? page.open : page.initial}
              transition={page.transition}
              className={`absolute top-2 w-40 h-44 rounded-xl shadow-lg ${page.className} cursor-pointer hover:ring-2 hover:ring-primary/50 transition-shadow`}
              onClick={(e) => {
                if (isOpen) {
                  e.stopPropagation();
                  setSelectedIdx(i);
                }
              }}
            >
              <Page data={page.testimonial} />
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ rotateX: isOpen ? -35 : 0 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="absolute inset-x-0 -bottom-px z-30 h-44 rounded-3xl origin-bottom flex justify-center items-center overflow-visible"
        >
          <div className="relative w-full h-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 235 121"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M104.615 0.350494L33.1297 0.838776C32.7542 0.841362 32.3825 0.881463 32.032 0.918854C31.6754 0.956907 31.3392 0.992086 31.0057 0.992096H31.0047C30.6871 0.99235 30.3673 0.962051 30.0272 0.929596C29.6927 0.897686 29.3384 0.863802 28.9803 0.866119L13.2693 0.967682H13.2527L13.2352 0.969635C13.1239 0.981406 13.0121 0.986674 12.9002 0.986237H9.91388C8.33299 0.958599 6.76052 1.22345 5.27423 1.76651H5.27325C4.33579 2.11246 3.48761 2.66213 2.7879 3.37393L2.49689 3.68839L2.492 3.69424C1.62667 4.73882 1.00023 5.96217 0.656067 7.27725C0.653324 7.28773 0.654065 7.29886 0.652161 7.30948C0.3098 8.62705 0.257231 10.0048 0.499817 11.3446L12.2147 114.399L12.2156 114.411L12.2176 114.423C12.6046 116.568 13.7287 118.508 15.3934 119.902C17.058 121.297 19.1572 122.056 21.3231 122.049V122.05H215.379C217.76 122.02 220.064 121.192 221.926 119.698V119.697C223.657 118.384 224.857 116.485 225.305 114.35L225.307 114.339L235.914 53.3798L235.968 53.1093L235.97 53.0985L235.971 53.0888C236.134 51.8978 236.044 50.685 235.705 49.5321C235.307 48.1669 234.63 46.9005 233.717 45.8144L233.383 45.4296C232.58 44.5553 231.614 43.8449 230.539 43.3398C229.311 42.7628 227.971 42.4685 226.616 42.4774H146.746C144.063 42.4705 141.423 41.8004 139.056 40.5263C136.691 39.2522 134.671 37.4127 133.175 35.1689L113.548 5.05948L113.544 5.05362L113.539 5.04776C112.545 3.65165 111.238 2.51062 109.722 1.72061C108.266 0.886502 106.627 0.422235 104.952 0.365143V0.364166L104.633 0.350494H104.615Z"
                fill="#F2F2F2"
                stroke="#D1D1D1"
                strokeWidth="1.5"
                className="dark:fill-neutral-800 dark:stroke-neutral-700"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
              <div className="flex gap-11 mb-2.5">
                <div className="w-2.5 h-2.5 bg-neutral-600/40 rounded-full" />
                <div className="w-2.5 h-2.5 bg-neutral-600/40 rounded-full" />
              </div>
              <div className="w-9 h-1 bg-neutral-600/40 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-xl text-foreground tracking-tight">
          Read our success stories <br />
          <span className="text-muted-foreground text-lg">
            See what our students and alumni have to say
          </span>
        </p>
        <div className="flex flex-col items-center gap-4 !bg-transparent">
          <Link
            href="/admissions"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-dashed border-muted-foreground/30 bg-background hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground transition-transform duration-300">
              <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={3} />
            </div>
            <span className="text-md font-medium text-foreground group-hover:text-primary transition-colors">
              Join Our Community
            </span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-card border border-border rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col items-center text-center mx-4 md:mx-12"
            >
              <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground bg-muted/50 rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>

              {TESTIMONIALS[selectedIdx].image && (
                 <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8">
                   <Image src={TESTIMONIALS[selectedIdx].image} alt={TESTIMONIALS[selectedIdx].author} fill className="rounded-full object-cover border-4 border-muted/50 shadow-sm" />
                 </div>
              )}
              
              <p className="text-lg md:text-2xl font-medium leading-relaxed text-foreground mb-6 md:mb-8">
                "{TESTIMONIALS[selectedIdx].text}"
              </p>

              <div>
                <h4 className="text-lg font-bold text-foreground">{TESTIMONIALS[selectedIdx].author}</h4>
                <p className="text-sm text-primary font-medium">{TESTIMONIALS[selectedIdx].role}</p>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6">
                <button onClick={handlePrev} className="p-3 bg-card border border-border shadow-lg rounded-full hover:bg-muted text-foreground transition-transform hover:scale-110 active:scale-95">
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6">
                <button onClick={handleNext} className="p-3 bg-card border border-border shadow-lg rounded-full hover:bg-muted text-foreground transition-transform hover:scale-110 active:scale-95">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Page = ({ data }: { data: any }) => (
  <div className="w-full h-full bg-gradient-to-b from-white to-[#F5F5F7] dark:from-neutral-800 dark:to-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-3 shadow-sm flex flex-col justify-between overflow-hidden">
    <div className="flex flex-col gap-1.5 relative">
      <p className="text-[10px] leading-[1.3] text-foreground/80 italic font-medium line-clamp-5">"{data.text}"</p>
    </div>
    <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
      <p className="text-[11px] font-bold text-foreground truncate">{data.author}</p>
      <p className="text-[9px] text-muted-foreground truncate">{data.role}</p>
    </div>
  </div>
);
