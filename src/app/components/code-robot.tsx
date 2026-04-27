'use client';

import Script from 'next/script';
import { Suspense, useEffect, useState } from 'react';

// This is needed for TypeScript to recognize the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { url: string; }, HTMLElement>;
    }
  }
}

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
    </div>
  );
}

export default function CodeRobot() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="w-full h-full">
            <Script type="module" strategy="lazyOnload" src="https://unpkg.com/@splinetool/viewer@1.12.79/build/spline-viewer.js" />
            <Suspense fallback={<Loader />}>
                {isClient ? <spline-viewer url="https://prod.spline.design/BqIZ1SU2c7e7hfyL/scene.splinecode" /> : <Loader />}
            </Suspense>
        </div>
    );
}
