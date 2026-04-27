'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { getPushNotice, updatePushNotice, uploadImageToGitHub } from '../../../actions';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PushNoticeEditorProps {
  noticeId: string;
}

export default function PushNoticeEditor({ noticeId }: PushNoticeEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    image_url: '',
    link: '',
    is_active: true,
    display_until: null as string | null,
  });

  useEffect(() => {
    async function loadNotice() {
      try {
        const notice = await getPushNotice(noticeId);
        if (notice) {
          setFormData({
            title: notice.title || '',
            date: notice.date || '',
            image_url: notice.image_url || '',
            link: notice.link || '',
            is_active: notice.is_active ?? true,
            display_until: notice.display_until || null,
          });
        }
      } catch (error: any) {
        toast({ 
          variant: 'destructive', 
          title: 'Error loading push notice', 
          description: error.message 
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadNotice();
  }, [noticeId]);

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
      await updatePushNotice(noticeId, formData);
      toast({ title: 'Push notice updated successfully' });
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Edit Push Notice</h1>
            <p className="text-muted-foreground mt-1">Update the push notice details below</p>
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
                placeholder="Enter push notice title"
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

            {/* Link */}
            <div className="space-y-3">
              <Label htmlFor="link" className="text-base font-semibold">Link (Optional)</Label>
              <Input 
                id="link"
                type="url"
                value={formData.link}
                onChange={e => setFormData({...formData, link: e.target.value})}
                placeholder="https://example.com/full-notice"
                className="h-12 text-base"
              />
            </div>

            {/* Display Until */}
            <div className="space-y-3">
              <Label htmlFor="display_until" className="text-base font-semibold">Display Until (Optional)</Label>
              <Input 
                id="display_until"
                type="date"
                value={formData.display_until || ''}
                onChange={e => setFormData({...formData, display_until: e.target.value || null})}
                className="h-12 text-base"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <input 
                type="checkbox" 
                id="is_active"
                checked={formData.is_active} 
                onChange={e => setFormData({...formData, is_active: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300"
              />
              <Label htmlFor="is_active" className="cursor-pointer text-base font-medium">Active (show on homepage)</Label>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Image *</Label>
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
              <Button type="submit" disabled={isSubmitting || isUploading} className="flex-1 h-12 text-base font-semibold">
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : 'Update Push Notice'}
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
