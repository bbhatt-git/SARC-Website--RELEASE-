'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type ExcelFileType = 'notice' | 'results';

// ============================================================================
// UNIFIED NOTICES CRUD (General + Holiday merged)
// ============================================================================

export type Notice = {
  id?: string;
  title: string;
  date: string;
  type: 'general' | 'holiday';
  summary: string;
  details?: string;
  image_url?: string;
  icon?: string;
  created_at?: string;
};

export async function getNotices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Notice[];
}

export async function createNotice(notice: Notice) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notices')
    .insert(notice)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  revalidatePath('/notice');
  return data;
}

export async function updateNotice(id: string, notice: Partial<Notice>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notices')
    .update(notice)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  revalidatePath('/notice');
  return data;
}

export async function deleteNotice(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('notices')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(error.message);
  revalidatePath('/notice');
}

export async function getNotice(id: string): Promise<Notice | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(error.message);
  return data;
}

// ============================================================================
// RESULTS CRUD + CSV IMPORT
// ============================================================================

export type Result = {
  id?: string;
  StudentName: string;
  SymbolNo: string;
  DOB: string;
  Grade: string;
  GPA: number;
  Remarks: string;
  created_at?: string;
};

export async function getResults() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Result[];
}

export async function createResult(result: Result) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('results')
    .insert(result)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  revalidatePath('/results');
  return data;
}

export async function updateResult(id: string, result: Partial<Result>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('results')
    .update(result)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  revalidatePath('/results');
  return data;
}

export async function deleteResult(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('results')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(error.message);
  revalidatePath('/results');
}

export async function bulkUploadResults(results: Result[]) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('results')
    .insert(results)
    .select();
  
  if (error) throw new Error(error.message);
  revalidatePath('/results');
  return data;
}

// CSV Import for Results
export async function importResultsFromCSV(csvContent: string): Promise<{ success: number; failed: number; errors: string[] }> {
  const lines = csvContent.trim().split('\n');
  const results: Result[] = [];
  const errors: string[] = [];
  let success = 0;
  let failed = 0;
  
  // Skip header row (first row)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line (handle quoted values with commas)
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    // Expected columns: Student Name, Symbol No, Date of Birth, GPA, Grade, Remarks (optional)
    if (values.length < 5) {
      errors.push(`Row ${i + 1}: Insufficient columns`);
      failed++;
      continue;
    }
    
    const [studentName, symbolNo, dob, gpaStr, grade, remarks = ''] = values;
    
    if (!studentName || !symbolNo) {
      errors.push(`Row ${i + 1}: Missing required fields`);
      failed++;
      continue;
    }
    
    const gpa = parseFloat(gpaStr);
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      errors.push(`Row ${i + 1}: Invalid GPA value "${gpaStr}"`);
      failed++;
      continue;
    }
    
    results.push({
      StudentName: studentName,
      SymbolNo: symbolNo,
      DOB: dob,
      GPA: gpa,
      Grade: grade,
      Remarks: remarks,
    });
    success++;
  }
  
  if (results.length > 0) {
    try {
      await bulkUploadResults(results);
    } catch (error: any) {
      errors.push(`Database error: ${error.message}`);
      failed += success;
      success = 0;
    }
  }
  
  return { success, failed, errors };
}

// ============================================================================
// PUSH NOTICES / ANNOUNCEMENTS CRUD
// ============================================================================

export type PushNotice = {
  id?: string;
  title: string;
  date: string;
  image_url: string;
  link: string;
  is_active: boolean;
  display_until?: string | null;
  created_at?: string;
};

export async function getPushNotices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('push_notices')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as PushNotice[];
}

export async function getActivePushNotices() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('push_notices')
    .select('*')
    .eq('is_active', true)
    .or(`display_until.is.null,display_until.gte.${today}`)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as PushNotice[];
}

export async function createPushNotice(notice: PushNotice) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('push_notices')
    .insert(notice)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  revalidatePath('/');
  return data;
}

export async function updatePushNotice(id: string, notice: Partial<PushNotice>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('push_notices')
    .update(notice)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  revalidatePath('/');
  return data;
}

export async function deletePushNotice(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('push_notices')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(error.message);
  revalidatePath('/');
}

export async function getPushNotice(id: string): Promise<PushNotice | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('push_notices')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(error.message);
  return data;
}

// ============================================================================
// GITHUB API IMAGE UPLOAD
// ============================================================================

export async function uploadImageToGitHub(
  fileName: string,
  base64Data: string
): Promise<{ success: boolean; url: string; message: string }> {
  try {
    // Get GitHub credentials from environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubPath = process.env.GITHUB_IMAGE_PATH || 'public/images';

    if (!githubToken || !githubOwner || !githubRepo) {
      return {
        success: false,
        url: '',
        message: 'GitHub credentials not configured. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables.',
      };
    }

    // Decode base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    const content = buffer.toString('base64');

    // Generate unique file path
    const timestamp = Date.now();
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${githubPath}/${timestamp}_${cleanFileName}`;

    // Upload to GitHub using API
    const response = await fetch(
      `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Upload image: ${cleanFileName}`,
          content: content,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'GitHub API error');
    }

    const result = await response.json();
    const rawUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/main/${filePath}`;

    return { success: true, url: rawUrl, message: 'Image uploaded successfully to GitHub' };
  } catch (error) {
    console.error('Error uploading to GitHub:', error);
    return {
      success: false,
      url: '',
      message: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

function getContentType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  };
  return mimeTypes[ext || ''] || 'image/jpeg';
}

export async function getExcelFileAsBase64(fileType: ExcelFileType): Promise<{ base64Data: string; sha: string; error?: string } | null> {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const path = fileType === 'notice'
    ? process.env.GITHUB_NOTICE_FILE_PATH
    : process.env.GITHUB_RESULTS_FILE_PATH;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !path || !token) {
    const errorMsg = `GitHub environment variables for ${fileType} file are not set.`;
    console.error(errorMsg);
    return { base64Data: '', sha: '', error: errorMsg };
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store', // Always fetch fresh data for the admin editor
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`File not found at ${apiUrl}. A new file will be created on first save.`);
        return { base64Data: '', sha: '' }; // No file exists yet, return empty
      }
      const errorText = await response.text();
      throw new Error(`Failed to fetch from GitHub API: ${response.statusText}. Details: ${errorText}`);
    }

    const fileData = await response.json();
    return { base64Data: fileData.content, sha: fileData.sha };
  } catch (error) {
    console.error('Error reading Excel file from GitHub:', error);
    return { base64Data: '', sha: '', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function saveExcelFile(fileType: ExcelFileType, base64Data: string, sha: string): Promise<{ success: boolean; message: string; newSha?: string; }> {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const path = fileType === 'notice'
    ? process.env.GITHUB_NOTICE_FILE_PATH
    : process.env.GITHUB_RESULTS_FILE_PATH;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !path || !token) {
    const errorMsg = `GitHub environment variables are not configured for saving ${fileType} file.`;
    console.error(errorMsg);
    return { success: false, message: errorMsg };
  }
  
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const body: { message: string; content: string; sha?: string } = {
      message: `Update ${path} from SARC website admin`,
      content: base64Data,
    };
    if (sha) {
        body.sha = sha;
    }

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API Error: ${errorData.message || 'Failed to save file'}`);
    }
    
    const responseData = await response.json();

    return { success: true, message: 'File saved to GitHub successfully!', newSha: responseData.content.sha };
  } catch (error) {
    console.error('Error saving Excel file to GitHub:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to save the file.' };
  }
}
