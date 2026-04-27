'use client';

export default function PageHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <section className="bg-neutral-surface relative overflow-hidden pt-32 pb-20 text-center">
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-peach opacity-20 blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-accent-green opacity-20 blur-[100px]"></div>
            </div>
            <div className="container relative z-10">
                <div className="mb-4 bg-brand/10 rounded-full px-4 py-2 border border-brand/20 inline-flex items-center gap-2">
                    <p className="font-semibold uppercase tracking-wider text-brand text-xs">{subtitle}</p>
                </div>
                <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                    {title}
                </h1>
            </div>
        </section>
    );
}
