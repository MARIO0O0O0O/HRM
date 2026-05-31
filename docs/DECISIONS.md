# Architecture & Implementation Decisions

## Week 1: Supabase Extensions & Schema

1. **Extensions Setup (`006_extensions.sql`)**
   - Created a dedicated migration for enabling `pgvector`, `pg_trgm`, `pg_cron`, `pg_net`, `pgmq`, and `pg_hashids` to ensure they are active before the schema relies on them.

2. **`short_id` generation in `content_articles`**
   - While `pg_hashids` is enabled, the actual hashing function requires an explicit salt/setup which varies. I have removed the `DEFAULT` clause for `short_id` in the SQL schema. The `short_id` will need to be generated at the application/API layer before inserting, or a specific trigger using `pg_hashids` must be written later once the salt is confirmed.

3. **Analytics Cache Cron Job**
   - The cron job `refresh-analytics-cache` uses `pg_net` to trigger a POST request to a Supabase Edge Function (`/functions/v1/refresh-analytics`). A placeholder `YOUR_SERVICE_ROLE_KEY` is currently in the SQL, which will need to be updated with the actual service role key in the live environment or handled via vault secrets.

4. **Storage Buckets**
   - Inserted `article-covers`, `tool-outputs`, and `hero-videos` into `storage.buckets` and marked them as `public = true`.

5. **`waitlist` table**
   - Assumed structure from typical waitlists (`email`, `spoke` for product/service origin, `exported` flag).

6. **RLS Policies**
   - `content_articles`: Public can `SELECT` where `status = 'published'`. Authenticated users (admin) have full access.
   - `waitlist` & `email_subscribers`: Public can `INSERT`. Authenticated users have full access.

7. **Vector dimensions**
   - Assumed 1536 dimensions for `VECTOR(1536)` as this aligns with the standard OpenAI `text-embedding-3-small` or `text-embedding-ada-002` models commonly used.
