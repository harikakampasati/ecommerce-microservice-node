-- in products-list api we are using Trigram-based search
-- Performance: Trigram-based searches can be slower than simple LIKE searches, especially on large datasets. Consider creating a GIN index on the column you're searching if you're using PostgreSQL.
CREATE EXTENSION pg_trgm;
CREATE INDEX products_name_trgm_idx ON "Products" USING gin ("name" gin_trgm_ops);
SELECT * FROM "Products"
WHERE name % 'prod1 A'
ORDER BY  "createdAt" DESC;
