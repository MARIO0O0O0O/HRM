-- Allow anyone to insert appointments so anonymous visitors can request consultation bookings
CREATE POLICY "anyone can insert appointments" ON appointments
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view/manage their own appointments
-- (This policy is already in 004_schema.sql, but we ensure it remains robust)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
