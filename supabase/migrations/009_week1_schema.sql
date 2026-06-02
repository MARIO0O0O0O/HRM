-- Week 1: Supabase Schema, RLS, Indexes, Cron Jobs, and Functions

-- 1. Create content_categories table
CREATE TABLE IF NOT EXISTS content_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create content_articles table
CREATE TABLE IF NOT EXISTS content_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    short_id TEXT UNIQUE, -- e.g., hashid generated on insert via trigger/application
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    body_mdx TEXT NOT NULL,
    category_id UUID REFERENCES content_categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
    publish_at TIMESTAMP WITH TIME ZONE,
    cover_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    reading_time_minutes INTEGER DEFAULT 5,
    featured BOOLEAN DEFAULT false,
    ai_assisted BOOLEAN DEFAULT false,
    needs_review BOOLEAN DEFAULT false,
    embedding vector(1536), -- requires pgvector
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create waitlist table (if not exists from Phase 2B)
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    spoke TEXT NOT NULL,
    exported BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create referral_clicks table
CREATE TABLE IF NOT EXISTS referral_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_slug TEXT NOT NULL,
    referrer_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create email_subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    source_tag TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create site_settings table (singleton config)
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1), -- Ensure only one row
    site_name TEXT NOT NULL DEFAULT 'BizHR',
    tagline TEXT,
    contact_email TEXT,
    booking_url TEXT,
    author_bio TEXT,
    payment_venmo TEXT,
    payment_zelle TEXT,
    payment_cashapp TEXT,
    analytics_ga4_id TEXT,
    analytics_gsc_url TEXT,
    analytics_gbp_id TEXT,
    legal_privacy_date DATE,
    legal_terms_date DATE,
    legal_disclaimer_override TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initialize site_settings singleton
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 7. Create analytics_cache table
CREATE TABLE IF NOT EXISTS analytics_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL CHECK (provider IN ('ga4', 'gsc', 'gbp')),
    data_jsonb JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_cache ENABLE ROW LEVEL SECURITY;

-- Public can read published articles and categories
CREATE POLICY "Public can view published articles" 
ON content_articles FOR SELECT 
USING (status = 'published');

CREATE POLICY "Public can view categories" 
ON content_categories FOR SELECT 
USING (true);

-- Public can insert into waitlist and email_subscribers (but not read)
CREATE POLICY "Public can insert into waitlist" 
ON waitlist FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can insert into email_subscribers" 
ON email_subscribers FOR INSERT 
WITH CHECK (true);

-- Public can read site_settings
CREATE POLICY "Public can read site settings" 
ON site_settings FOR SELECT 
USING (true);

-- Public can insert referral clicks
CREATE POLICY "Public can log referral clicks" 
ON referral_clicks FOR INSERT 
WITH CHECK (true);

-- Admins (authenticated service role or specific admin user logic) bypass RLS
-- (Note: By default, the service_role key bypasses RLS entirely. 
-- If using authenticated users for admin, add policies matching auth.uid() to admin roles).

-- ==========================================
-- INDEXES (pg_trgm & pgvector)
-- ==========================================

-- pg_trgm indexes for fuzzy search on articles
CREATE INDEX IF NOT EXISTS content_articles_title_trgm_idx ON content_articles USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS content_articles_body_trgm_idx ON content_articles USING gin (body_mdx gin_trgm_ops);

-- pgvector index for similarity search
-- Note: ivfflat index requires vectors to be populated or sufficient rows.
-- If the table is empty, this index might fail or be ineffective until populated.
-- It's safer to create it or rebuild it once data exists.
CREATE INDEX IF NOT EXISTS content_articles_embedding_idx ON content_articles USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ==========================================
-- STORAGE BUCKETS
-- ==========================================

-- Create buckets (requires executing against storage schema or via dashboard)
INSERT INTO storage.buckets (id, name, public) VALUES ('article-covers', 'article-covers', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('tool-outputs', 'tool-outputs', false) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-videos', 'hero-videos', true) ON CONFLICT DO NOTHING;

-- Storage RLS (Allow public read for public buckets)
CREATE POLICY "Public can read article covers" ON storage.objects FOR SELECT USING (bucket_id = 'article-covers');
CREATE POLICY "Public can read hero videos" ON storage.objects FOR SELECT USING (bucket_id = 'hero-videos');

-- ==========================================
-- RPC FUNCTIONS
-- ==========================================

-- Fuzzy Search Function (pg_trgm)
CREATE OR REPLACE FUNCTION search_articles(search_query TEXT)
RETURNS SETOF content_articles
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM content_articles
  WHERE status = 'published'
    AND (title ILIKE '%' || search_query || '%' OR body_mdx ILIKE '%' || search_query || '%')
  ORDER BY GREATEST(similarity(title, search_query), similarity(body_mdx, search_query)) DESC
  LIMIT 10;
$$;

-- Vector Similarity Search Function (pgvector)
CREATE OR REPLACE FUNCTION match_articles(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  exclude_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  slug text,
  title text,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    id,
    slug,
    title,
    1 - (content_articles.embedding <=> query_embedding) AS similarity
  FROM content_articles
  WHERE status = 'published'
    AND (exclude_id IS NULL OR id != exclude_id)
    AND 1 - (content_articles.embedding <=> query_embedding) > match_threshold
  ORDER BY content_articles.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- ==========================================
-- CRON JOBS (pg_cron)
-- ==========================================

-- 1. Publish scheduled articles every 5 minutes
SELECT cron.schedule(
    'publish-scheduled-articles',
    '*/5 * * * *',
    $$ UPDATE public.content_articles SET status = 'published' WHERE status = 'scheduled' AND publish_at <= NOW(); $$
);

-- 2. Refresh analytics cache (daily at 9am UTC / 2am PT)
-- Note: In a real environment, this might call an Edge Function via pg_net. 
-- Here we just define the cron job placeholder.
SELECT cron.schedule(
    'refresh-analytics-cache',
    '0 9 * * *',
    $$ -- Replace with pg_net call to Next.js API or Supabase Edge Function to fetch new analytics
       -- e.g., SELECT net.http_post(url:='https://bizhr.org/api/analytics/refresh');
       SELECT 1; 
    $$
);

-- 3. Flag stale content (Monday at 8am PT / 15:00 UTC)
-- Assuming content is stale if older than 1 year
SELECT cron.schedule(
    'flag-stale-content',
    '0 15 * * 1',
    $$ UPDATE public.content_articles SET needs_review = true WHERE status = 'published' AND updated_at < NOW() - INTERVAL '1 year'; $$
);
