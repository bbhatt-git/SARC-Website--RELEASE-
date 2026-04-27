'use client';

export function BackgroundController() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="relative h-full w-full bg-background">
        <div className="absolute h-full w-full mix-blend-multiply dark:mix-blend-color-dodge">
          <div
            className="animate-blob absolute -top-1/4 -left-1/4 h-2/3 w-2/3 rounded-full bg-emerald-300 opacity-40 filter blur-3xl"
            style={{ animationDuration: '30s' }}
          ></div>
          <div
            className="animate-blob absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-green-300 opacity-40 filter blur-3xl"
            style={{ animationDelay: '5s', animationDuration: '35s' }}
          ></div>
          <div
            className="animate-blob absolute -bottom-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-teal-300 opacity-40 filter blur-3xl"
            style={{ animationDelay: '10s', animationDuration: '40s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
