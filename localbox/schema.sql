-- schema.sql
-- Since we might run the import many times we'll drop if exists
DROP DATABASE IF EXISTS "hackerbox-sandbox";

CREATE DATABASE "hackerbox-sandbox";

-- Make sure we're using our `hackerbox-sandbox` database
\c "hackerbox-sandbox";

-- We can create our user table
CREATE TABLE IF NOT EXISTS stories (
  title VARCHAR,
  description VARCHAR,
  url VARCHAR PRIMARY KEY,
  imageUrl VARCHAR,
  source VARCHAR
);
