-- ============================================================================
-- SARC Website Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- REQUIRED ENVIRONMENT VARIABLES (Add to your .env file)
-- ============================================================================
--
-- SUPABASE (Required for all features)
--   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
--   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
--   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (for admin operations)
--
-- GITHUB (Required for Push Notice image uploads)
--   GITHUB_REPO_OWNER=your-github-username          (e.g., "bbhatt")
--   GITHUB_REPO_NAME=your-repo-name               (e.g., "sarc-website-assets")
--   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx           (Personal Access Token with 'repo' scope)
--   GITHUB_CDN_DOMAIN=https://raw.githubusercontent.com/{owner}/{repo}/main  (optional, uses raw GitHub CDN by default)
--
-- GITHUB TOKEN SETUP:
--   1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
--   2. Click "Generate new token (classic)"
--   3. Select scopes: 'repo' (full control of private repositories)
--   4. Create a public repository (e.g., "sarc-website-assets") to store images
--   5. Copy the token to your .env file as GITHUB_TOKEN
--
-- ============================================================================

-- ============================================================================
-- 1. NOTICES (Single type - no categories)
-- ============================================================================
CREATE TABLE IF NOT EXISTS notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Notices are viewable by everyone" 
    ON notices FOR SELECT USING (true);

-- Only authenticated users can modify
CREATE POLICY "Only authenticated users can insert notices" 
    ON notices FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Only authenticated users can update notices" 
    ON notices FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete notices" 
    ON notices FOR DELETE TO authenticated USING (true);

-- ============================================================================
-- 3. RESULTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "StudentName" TEXT NOT NULL,
    "SymbolNo" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "Grade" TEXT NOT NULL,
    "GPA" NUMERIC(3,2) NOT NULL CHECK ("GPA" >= 0 AND "GPA" <= 4),
    "Remarks" TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookup by SymbolNo (case-insensitive)
CREATE INDEX IF NOT EXISTS idx_results_symbolno ON results (LOWER("SymbolNo"));

-- Enable RLS
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Public can read (needed for result checking)
CREATE POLICY "Results are viewable by everyone" 
    ON results FOR SELECT USING (true);

-- Only authenticated users can modify
CREATE POLICY "Only authenticated users can insert results" 
    ON results FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Only authenticated users can update results" 
    ON results FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete results" 
    ON results FOR DELETE TO authenticated USING (true);

-- ============================================================================
-- 4. PUSH NOTICES / HOMEPAGE POPUPS
-- ============================================================================
CREATE TABLE IF NOT EXISTS push_notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE push_notices ENABLE ROW LEVEL SECURITY;

-- Public can read active notices
CREATE POLICY "Push notices are viewable by everyone" 
    ON push_notices FOR SELECT USING (true);

-- Only authenticated users can modify
CREATE POLICY "Only authenticated users can insert push notices" 
    ON push_notices FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Only authenticated users can update push notices" 
    ON push_notices FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete push notices" 
    ON push_notices FOR DELETE TO authenticated USING (true);

-- ============================================================================
-- 5. ADMISSION INQUIRIES (If not already exists)
-- ============================================================================
CREATE TABLE IF NOT EXISTS admission_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dob TEXT,
    gender TEXT,
    nationality TEXT,
    citizenship_no TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    alternate_phone TEXT,
    permanent_address TEXT,
    district TEXT,
    province TEXT,
    applying_for TEXT,
    previous_school TEXT,
    last_class_completed TEXT,
    gpa TEXT,
    achievements TEXT,
    father_name TEXT,
    father_phone TEXT,
    father_occupation TEXT,
    father_email TEXT,
    mother_name TEXT,
    mother_phone TEXT,
    mother_occupation TEXT,
    mother_email TEXT,
    guardian_name TEXT,
    guardian_phone TEXT,
    guardian_relationship TEXT,
    guardian_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admission_inquiries ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read
CREATE POLICY "Only authenticated users can view inquiries" 
    ON admission_inquiries FOR SELECT TO authenticated USING (true);

-- Public can submit (insert only)
CREATE POLICY "Public can submit admission inquiries" 
    ON admission_inquiries FOR INSERT TO anon WITH CHECK (true);

-- ============================================================================
-- 6. CONTACT MESSAGES (If not already exists)
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read
CREATE POLICY "Only authenticated users can view messages" 
    ON contact_messages FOR SELECT TO authenticated USING (true);

-- Public can submit (insert only)
CREATE POLICY "Public can submit contact messages" 
    ON contact_messages FOR INSERT TO anon WITH CHECK (true);

-- ============================================================================
-- SAMPLE DATA (Optional - Uncomment to insert test data)
-- ============================================================================

-- -- Insert sample general notice
-- INSERT INTO notices (title, date, type, summary, icon, details) VALUES
-- ('Welcome to New Academic Year 2025', '2025-04-15', 'general', 'We are excited to welcome all students to the new academic year. Classes begin on April 20th.', 'Bell', 'Detailed information about the new academic year...');

-- -- Insert sample holiday
-- INSERT INTO notices (title, date, type, summary, details) VALUES
-- ('Dashain Festival', '2025-10-02', 'holiday', 'School will remain closed from Oct 2-10 for Dashain celebrations. Happy holidays!', 'All school activities will be suspended during this period.');

-- -- Insert sample result
-- INSERT INTO results ("StudentName", "SymbolNo", "DOB", "Grade", "GPA", "Remarks") VALUES
-- ('Ram Sharma', 'SARC2025001', '2007-05-15', 'A+', 3.85, 'Excellent performance in all subjects');

-- -- Insert sample push notice (will show on homepage)
-- INSERT INTO push_notices (title, date, image_url, link, is_active, display_until) VALUES
-- ('Admissions Open for 2025!', '2025-04-20', 'https://placehold.co/600x400/3b82f6/ffffff?text=Admissions+Open', '/admissions', true, '2025-05-30');

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant all on tables to authenticated (admin users)
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant select to anon (public visitors)
GRANT SELECT ON notices TO anon;
GRANT SELECT ON results TO anon;
GRANT SELECT ON push_notices TO anon;

-- Grant insert to anon for form submissions
GRANT INSERT ON admission_inquiries TO anon;
GRANT INSERT ON contact_messages TO anon;

