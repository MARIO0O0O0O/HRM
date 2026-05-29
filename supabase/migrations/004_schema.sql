CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text,
  excerpt text,
  category text,
  tags text[],
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES profiles(id),
  scheduled_at timestamptz,
  status text DEFAULT 'pending',
  notes text
);

CREATE TABLE ai_interactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  prompt_hash text,
  response_length int,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- blog_posts policies: public can read published posts
CREATE POLICY "public read published" ON blog_posts
  FOR SELECT USING (published = true);

-- blog_posts admin policy: owner can manage everything
CREATE POLICY "admin manage blog" ON blog_posts
  FOR ALL USING (auth.jwt() ->> 'email' = 'mario_espindola@outlook.com');

-- appointments policies: users can manage their own appointments only
CREATE POLICY "own appointments" ON appointments
  FOR ALL USING (auth.uid() = client_id);

-- ai_interactions policies: admin only for viewing interactions
CREATE POLICY "admin view interactions" ON ai_interactions
  FOR SELECT USING (auth.jwt() ->> 'email' = 'mario_espindola@outlook.com');
