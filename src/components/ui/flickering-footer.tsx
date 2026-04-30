"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ClassValue, clsx } from "clsx";
import * as Color from "color-bits";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;

  try {
    // Handle CSS variables
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      return Color.formatRGBA(Color.parse(computedColor));
    }

    return Color.formatRGBA(Color.parse(cssColor));
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

// Helper function to add opacity to an RGB color string
export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

export const Icons = {
  logo: ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} className="object-contain" />
      <div className="flex flex-col items-start justify-center" style={{ lineHeight: 0.8 }}>
        <span className="font-semibold text-brand text-base tracking-tight whitespace-nowrap text-neutral-text">SARC EDU.</span>
        <span className="font-bold text-foreground tracking-[0.1em] text-[9px] uppercase whitespace-nowrap text-neutral-text">FOUNDATION</span>
      </div>
    </div>
  ),
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);
    updateMatches();
    media.addEventListener("change", updateMatches);
    return () => media.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  text?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => getRGBA(color), [color]);
  const maskBufferRef = useRef<{ data: Uint8ClampedArray; width: number; height: number } | null>(null);

  const createMask = useCallback(
    (width: number, height: number, dpr: number) => {
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return null;

      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = "white";
        maskCtx.textAlign = "center";
        maskCtx.textBaseline = "middle";

        // Calculate dynamic font size to fit exactly 95% of the width
        const targetWidth = (width / dpr) * 0.95;
        const testFontSize = 100;
        maskCtx.font = `900 ${testFontSize}px sans-serif`;
        const textMetrics = maskCtx.measureText(text);
        
        // Scale font size based on the ratio of target width to measured width
        let finalFontSize = testFontSize * (targetWidth / textMetrics.width);
        
        // Ensure the text doesn't overflow the height (keeping a 10% padding vertically)
        const targetHeight = (height / dpr) * 0.9;
        if (finalFontSize > targetHeight) {
          finalFontSize = targetHeight;
        }

        maskCtx.font = `900 ${finalFontSize}px sans-serif`;
        maskCtx.fillText(text, width / (2 * dpr), height / (2 * dpr));
        maskCtx.restore();
      }

      const data = maskCtx.getImageData(0, 0, width, height).data;
      maskBufferRef.current = { data, width, height };
      return maskCanvas;
    },
    [text, fontSize],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      const mask = maskBufferRef.current;
      if (!mask) return;

      const { data, width: mw } = mask;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const sw = squareSize * dpr;
          const sh = squareSize * dpr;

          let hasText = false;
          if (text) {
            const cx = Math.floor(x + sw / 2);
            const cy = Math.floor(y + sh / 2);
            if (cx >= 0 && cx < mw && cy >= 0 && cy < mask.height) {
              const idx = (cy * mw + cx) * 4 + 3;
              if (data[idx] > 0) hasText = true;
            }
          }

          const opacity = squares[i * rows + j];
          const finalOpacity = hasText ? Math.min(1, opacity * 3 + 0.4) : opacity;

          ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
          ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(sw), Math.floor(sh));
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      createMask(canvas.width, canvas.height, dpr);
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity, createMask],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0 });
    intersectionObserver.observe(canvas);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={cn(`h-full w-full ${className}`)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none" style={{ width: canvasSize.width, height: canvasSize.height }} />
    </div>
  );
};

export const siteConfig = {
  hero: {
    description: "SARC Education Foundation is committed to providing quality education and fostering innovation through our diverse academic programs and modern facilities.",
    cta: {
      primary: { text: "Apply Now", href: "/admissions" },
    },
  },
  footerLinks: [
    {
      title: "About SARC",
      links: [
        { id: 1, title: "Our Story", url: "/about/us" },
        { id: 2, title: "Our Team", url: "/about/staffs" },
        { id: 3, title: "Our Founder", url: "/about/founder" },
        { id: 4, title: "Gallery", url: "/gallery" },
      ],
    },
    {
      title: "Academics",
      links: [
        { id: 5, title: "Programs", url: "/academics/programs" },
        { id: 6, title: "Facilities", url: "/academics/services" },
        { id: 7, title: "Alumni", url: "/academics/achievements" },
        { id: 8, title: "Notice Board", url: "/notice" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { id: 9, title: "Results", url: "/results" },
        { id: 10, title: "Contact Us", url: "/contact" },
        { id: 11, title: "Careers", url: "#" },
        { id: 12, title: "Apply Now", url: "/admissions" },
      ],
    },
  ],
};

export const FlickeringFooter = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const responsiveText = isDesktop 
    ? "SARC EDUCATION FOUNDATION" 
    : isLaptop 
      ? "SARC EDU. FOUNDATION" 
      : isTablet 
        ? "SARC EDU." 
        : "SARC";

  const responsiveFontSize = isDesktop 
    ? 120 
    : isLaptop 
      ? 100 
      : isTablet 
        ? 80 
        : 120;

  return (
    <footer id="footer" className="w-full pb-0 bg-neutral-bg border-t border-neutral-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div className="flex flex-col items-start justify-start gap-y-6 max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="size-10" />
            </Link>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed">
              {siteConfig.hero.description}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand transition-colors p-2 rounded-full hover:bg-brand/10">
                <Facebook className="size-5" />
              </a>
              <a href="https://instagram.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand transition-colors p-2 rounded-full hover:bg-brand/10">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand transition-colors p-2 rounded-full hover:bg-brand/10">
                <Twitter className="size-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 md:w-2/3">
            {siteConfig.footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-3">
                <li className="mb-2 text-sm font-bold text-foreground uppercase tracking-wider">
                  {column.title}
                </li>
                {column.links.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px] text-muted-foreground hover:text-brand transition-colors"
                  >
                    <Link href={link.url}>{link.title}</Link>
                    <div className="flex size-4 items-center justify-center border border-neutral-border rounded translate-x-[-4px] transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 group-hover:border-brand/30">
                      <ChevronRightIcon className="h-3 w-3 text-brand" />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-32 md:h-56 relative mt-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-neutral-bg/20 to-neutral-bg z-10" />
        <div className="absolute inset-0 opacity-100 dark:opacity-40">
          <FlickeringGrid
            text={responsiveText}
            fontSize={responsiveFontSize}
            className="h-full w-full"
            squareSize={3}
            gridGap={4}
            color="var(--brand)"
            maxOpacity={0.4}
            flickerChance={0.08}
          />
        </div>
      </div>
      
      <div className="border-t border-neutral-border/30 py-8 bg-neutral-surface/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground/60">
          <p>© {new Date().getFullYear()} SARC Education Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-brand transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
