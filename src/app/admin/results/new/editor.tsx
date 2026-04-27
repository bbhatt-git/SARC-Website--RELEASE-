'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { createResult } from '../../actions';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResultEditor() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    StudentName: '',
    SymbolNo: '',
    DOB: '',
    GPA: '',
    Grade: '',
    Remarks: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createResult(formData as any);
      toast({ title: 'Result added successfully' });
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
            <h1 className="text-3xl font-bold tracking-tight">Add Single Result</h1>
            <p className="text-muted-foreground mt-1">Add a student result manually</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Name */}
            <div className="space-y-3">
              <Label htmlFor="StudentName" className="text-base font-semibold">Student Name *</Label>
              <Input 
                id="StudentName"
                value={formData.StudentName}
                onChange={e => setFormData({...formData, StudentName: e.target.value})}
                placeholder="Enter student name"
                required
                className="h-12 text-base"
              />
            </div>

            {/* Symbol No and DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="SymbolNo" className="text-base font-semibold">Symbol No *</Label>
                <Input 
                  id="SymbolNo"
                  value={formData.SymbolNo}
                  onChange={e => setFormData({...formData, SymbolNo: e.target.value})}
                  placeholder="e.g., SARC2025001"
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="DOB" className="text-base font-semibold">Date of Birth *</Label>
                <Input 
                  id="DOB"
                  type="date"
                  value={formData.DOB}
                  onChange={e => setFormData({...formData, DOB: e.target.value})}
                  required
                  className="h-12 text-base"
                />
              </div>
            </div>

            {/* GPA and Grade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="GPA" className="text-base font-semibold">GPA *</Label>
                <Input 
                  id="GPA"
                  type="number"
                  step="0.01"
                  value={formData.GPA}
                  onChange={e => setFormData({...formData, GPA: e.target.value})}
                  placeholder="e.g., 3.85"
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="Grade" className="text-base font-semibold">Grade *</Label>
                <Input 
                  id="Grade"
                  value={formData.Grade}
                  onChange={e => setFormData({...formData, Grade: e.target.value})}
                  placeholder="e.g., A+"
                  required
                  className="h-12 text-base"
                />
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-3">
              <Label htmlFor="Remarks" className="text-base font-semibold">Remarks (Optional)</Label>
              <Input 
                id="Remarks"
                value={formData.Remarks}
                onChange={e => setFormData({...formData, Remarks: e.target.value})}
                placeholder="Optional remarks"
                className="h-12 text-base"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button type="submit" disabled={isSubmitting} className="flex-1 h-12 text-base font-semibold">
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : 'Add Result'}
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
