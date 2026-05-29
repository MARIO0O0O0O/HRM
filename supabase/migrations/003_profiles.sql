CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  company_name text,
  contact_email text,
  plan_tier text DEFAULT 'free',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own profile only" ON profiles
  FOR ALL USING (auth.uid() = id);
