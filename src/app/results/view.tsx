'use client';

import PageHeader from '@/app/components/page-header';
import { Search, Loader2, UserX, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, FormEvent } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { checkResult } from '@/app/actions';
import type { Result } from '@/app/actions';

const ResultDisplay = ({ result }: { result: Result }) => {
    const isPass = result.Grade !== 'NG';

    return (
        <div className="mt-8">
            <div className={cn(
                "testimonial-card overflow-hidden",
                "transition-all duration-500"
            )}>
                {/* Header */}
                <div className={cn(
                    "p-6",
                    isPass ? "bg-emerald-500/10" : "bg-rose-500/10"
                )}>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground">{result.StudentName}</h3>
                             <p className={cn(
                                "text-xl font-bold mt-1",
                                isPass ? "text-emerald-500 dark:text-emerald-300" : "text-rose-500 dark:text-rose-300"
                            )}>
                                {result.Remarks}
                            </p>
                        </div>
                        <div className={cn(
                            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold",
                            isPass ? "bg-emerald-500/20 text-emerald-500 dark:text-emerald-300" : "bg-rose-500/20 text-rose-500 dark:text-rose-300"
                        )}>
                            {isPass ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                            <span>{isPass ? "Graded" : "Non Graded"}</span>
                        </div>
                    </div>
                </div>
                
                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Student Info */}
                    <div className="text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                        <p><span className="font-semibold text-foreground/80">Symbol No:</span> {result.SymbolNo}</p>
                        <p><span className="font-semibold text-foreground/80">Date of Birth:</span> {result.DOB}</p>
                    </div>

                    {/* GPA and Grade */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                        <div className="rounded-xl bg-neutral-surface p-6 border border-neutral-border">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">GPA</p>
                            <p className="text-6xl font-extrabold text-foreground tracking-tight mt-2">{result.GPA.toFixed(2)}</p>
                        </div>
                        <div className="rounded-xl bg-neutral-surface p-6 border border-neutral-border">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Grade</p>
                            <p className="text-6xl font-extrabold text-foreground tracking-tight mt-2">{result.Grade}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ResultsView() {
    const [symbolNo, setSymbolNo] = useState('');
    const [dob, setDob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<Result | null>(null);

    const handleResultCheck = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);

        if (!symbolNo || !dob) {
            setError("Please enter both Symbol Number and Date of Birth.");
            setIsLoading(false);
            return;
        }

        try {
            const foundResult = await checkResult(symbolNo, dob);
            if (foundResult) {
                setResult(foundResult);
            } else {
                setError("No result found for the provided Symbol Number and Date of Birth. Please check your inputs and try again.");
            }
        } catch (e) {
            setError("An error occurred while checking your result. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <PageHeader title="Exam Results" subtitle="Check Your Performance" />
            <div className="container mx-auto px-4 py-20 max-w-2xl">
                <Card className="testimonial-card p-6 md:p-8">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle>Check Your Exam Result</CardTitle>
                        <CardDescription>Enter your symbol number and date of birth to view your result.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                         <form onSubmit={handleResultCheck} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div className="space-y-2 w-full md:col-span-1">
                                <Label htmlFor="symbolNo">Symbol Number</Label>
                                <Input
                                    id="symbolNo"
                                    value={symbolNo}
                                    onChange={(e) => setSymbolNo(e.target.value)}
                                    placeholder="e.g., 12345A"
                                    required
                                />
                            </div>
                            <div className="space-y-2 w-full md:col-span-1">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    placeholder="YYYY-MM-DD"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full md:col-span-1" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Checking...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Check Result
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6">
                            {error && (
                                <Alert variant="destructive">
                                    <UserX className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            {result && <ResultDisplay result={result} />}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
