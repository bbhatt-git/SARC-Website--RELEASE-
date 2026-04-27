'use server';

import { createClient } from '@/lib/supabase/server';

export type Result = {
  StudentName: string;
  SymbolNo: string;
  DOB: string; // YYYY-MM-DD
  Grade: string;
  GPA: number;
  Remarks: string;
};

function normalizeDate(dob: string): string {
  if (!dob) return '';
  // Remove all non-digit characters
  const digitsOnly = dob.replace(/\D/g, '');
  
  // Check if it's in YYYYMMDD format
  if (digitsOnly.length === 8) {
    const year = digitsOnly.substring(0, 4);
    const month = digitsOnly.substring(4, 6);
    const day = digitsOnly.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  
  // Assume it's already in a delimited format like YYYY-MM-DD or YYYY/MM/DD
  // Just replace slashes with dashes for consistency
  return String(dob).replace(/\//g, '-');
}

export async function checkResult(symbolNo: string, dob: string): Promise<Result | null> {
  const supabase = createClient();
  const normalizedDob = normalizeDate(dob);

  // First, find the student by symbol number. Case-insensitive search.
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .ilike('SymbolNo', symbolNo.trim())
    .single();

  if (error || !data) {
    console.error('Supabase error or no data found for symbol no:', error?.message);
    return null;
  }
  
  // After finding a record, verify the Date of Birth.
  if (normalizeDate(String(data.DOB)) === normalizedDob) {
    return {
      StudentName: String(data.StudentName),
      SymbolNo: String(data.SymbolNo),
      DOB: String(data.DOB),
      Grade: String(data.Grade),
      GPA: Number(data.GPA),
      Remarks: String(data.Remarks),
    };
  }
  
  // If DOB doesn't match, return null
  return null;
}
