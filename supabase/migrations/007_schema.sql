-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.content_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.content_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    short_id TEXT UNIQUE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.content_categories(id),
    body_mdx TEXT NOT NULL,
    embedding extensions.VECTOR(1536),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    cover_url TEXT,
    ai_assisted BOOLEAN DEFAULT FALSE,
    author_id UUID REFERENCES auth.users(id),
    tags TEXT[],
    scheduled_for TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    spoke TEXT,
    exported BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.referral_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product TEXT NOT NULL,
    affiliate_id TEXT,
    click_time TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.email_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    source_tag TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.analytics_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cache_key TEXT UNIQUE NOT NULL,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS content_articles_title_trgm_idx ON public.content_articles USING GIN (title extensions.gin_trgm_ops);
CREATE INDEX IF NOT EXISTS content_articles_body_trgm_idx ON public.content_articles USING GIN (body_mdx extensions.gin_trgm_ops);
CREATE INDEX IF NOT EXISTS content_articles_embedding_idx ON public.content_articles USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- 3. RLS Policies
ALTER TABLE public.content_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- content_articles: public can read published articles, auth users can do everything
CREATE POLICY "Public can read published articles" ON public.content_articles
    FOR SELECT USING (status = 'published');
CREATE POLICY "Admin can manage articles" ON public.content_articles
    FOR ALL USING (auth.role() = 'authenticated');

-- waitlist: public can insert, admin can manage
CREATE POLICY "Public can insert to waitlist" ON public.waitlist
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can manage waitlist" ON public.waitlist
    FOR ALL USING (auth.role() = 'authenticated');

-- email_subscribers: public can insert, admin can manage
CREATE POLICY "Public can insert to email_subscribers" ON public.email_subscribers
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can manage email_subscribers" ON public.email_subscribers
    FOR ALL USING (auth.role() = 'authenticated');

-- 4. Storage Buckets (requires inserting into storage.buckets if using local migration or Dashboard)
INSERT INTO storage.buckets (id, name, public) VALUES ('article-covers', 'article-covers', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('tool-outputs', 'tool-outputs', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-videos', 'hero-videos', true) ON CONFLICT (id) DO NOTHING;

-- 5. Functions
CREATE OR REPLACE FUNCTION match_articles(query_embedding vector(1536), match_threshold float, match_count int)
RETURNS TABLE (id uuid, title text, slug text, similarity float)
LANGUAGE sql STABLE
AS $$
  SELECT
    id, title, slug,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.content_articles
  WHERE 1 - (embedding <=> query_embedding) > match_threshold AND status = 'published'
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION search_articles(search_query text)
RETURNS TABLE (id uuid, title text, slug text, similarity real)
LANGUAGE sql STABLE
AS $$
  SELECT
    id, title, slug,
    word_similarity(search_query, title || ' ' || body_mdx) AS similarity
  FROM public.content_articles
  WHERE search_query <% (title || ' ' || body_mdx) AND status = 'published'
  ORDER BY similarity DESC
  LIMIT 10;
$$;

-- 6. Cron Jobs (pg_cron)
SELECT cron.schedule('publish-scheduled-articles', '*/5 * * * *', $$
    UPDATE public.content_articles 
    SET status = 'published' 
    WHERE status = 'scheduled' AND scheduled_for <= NOW();
$$);

SELECT cron.schedule('refresh-analytics-cache', '0 9 * * *', $$
    -- Placeholder for an API call to Edge Function using pg_net
    SELECT net.http_post(
      url:='https://zteebziywhoglccgdxxn.supabase.co/functions/v1/refresh-analytics',
      headers:='{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
    );
$$);

SELECT cron.schedule('flag-stale-content', '0 15 * * 1', $$
    UPDATE public.content_articles
    SET tags = array_append(tags, 'stale')
    WHERE updated_at < NOW() - INTERVAL '180 days' AND NOT ('stale' = ANY(tags));
$$);
