'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { createNotice, uploadImageToGitHub } from '../../actions';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NoticeEditor() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    image_url: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const result = await uploadImageToGitHub(file.name, base64);

      if (result.success) {
        setFormData({ ...formData, image_url: result.url });
        toast({ title: 'Image uploaded successfully' });
      } else {
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: result.message
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload error',
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createNotice(formData as any);
      toast({ title: 'Notice created successfully' });
      router.push('/admin');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild className="hover:bg-muted">
            <Link href="/admin">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Notice</h1>
            <p className="text-muted-foreground mt-1">Fill in the details below to create a new notice</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base font-semibold">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter notice title"
                required
                className="h-12 text-base"
              />
            </div>

            {/* Date */}
            <div className="space-y-3">
              <Label htmlFor="date" className="text-base font-semibold">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required
                className="h-12 text-base"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="description" className="text-base font-semibold">Description (Optional if image is uploaded)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Enter notice description..."
                rows={4}
                className="text-base resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Image Upload (Optional if description is provided)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="flex gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="flex-1"
                  />
                  {isUploading && <Loader2 className="animate-spin w-5 h-5 text-muted-foreground" />}
                </div>
                {formData.image_url && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mt-4 border border-border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button type="submit" disabled={isSubmitting || isUploading || (!formData.description && !formData.image_url)} className="flex-1 h-12 text-base font-semibold">
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : 'Create Notice'}
              </Button>
              <Button type="button" variant="outline" asChild className="flex-1 h-12 text-base font-semibold">
                <Link href="/admin">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
