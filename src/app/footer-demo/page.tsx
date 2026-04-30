import { FlickeringFooter } from "@/components/ui/flickering-footer";

export default function FooterDemo() {
  return (
    <div className="min-h-screen bg-neutral-bg pt-20">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Footer Component Integration</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          This is a demonstration of the Flickering Footer component integrated with SARC's branding and dynamic grid background.
        </p>
      </div>
      
      {/* Spacer to allow scrolling down to the footer */}
      <div className="h-[50vh]" />
      
      <FlickeringFooter />
    </div>
  );
}
