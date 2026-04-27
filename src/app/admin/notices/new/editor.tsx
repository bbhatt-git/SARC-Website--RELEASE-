'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    type: 'general',
    summary: '',
    details: '',
    image_url: '',
    icon: 'Bell',
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

            {/* Date and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="space-y-3">
                <Label htmlFor="type" className="text-base font-semibold">Type *</Label>
                <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Notice</SelectItem>
                    <SelectItem value="holiday">Holiday Notice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-3">
              <Label htmlFor="summary" className="text-base font-semibold">Summary *</Label>
              <Textarea 
                id="summary"
                value={formData.summary}
                onChange={e => setFormData({...formData, summary: e.target.value})}
                placeholder="Brief summary of the notice"
                rows={3}
                required
                className="text-base resize-none"
              />
            </div>

            {/* Details */}
            <div className="space-y-3">
              <Label htmlFor="details" className="text-base font-semibold">Details (Optional)</Label>
              <Textarea 
                id="details"
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
                placeholder="Full details of the notice (supports markdown)"
                rows={6}
                className="text-base resize-none"
              />
            </div>

            {/* Icon */}
            <div className="space-y-3">
              <Label htmlFor="icon" className="text-base font-semibold">Icon (for General notices)</Label>
              <Select value={formData.icon} onValueChange={v => setFormData({...formData, icon: v})}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bell">🔔 Bell</SelectItem>
                  <SelectItem value="Calendar">📅 Calendar</SelectItem>
                  <SelectItem value="FileText">📄 File Text</SelectItem>
                  <SelectItem value="Award">🏆 Award</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Image (Optional)</Label>
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
