-- -------------------------------------------------------------
-- TablePlus 6.0.6(558)
--
-- https://tableplus.com/
--
-- Database: ecommerce_db
-- Generation Time: 2024-08-02 09:10:48.2930
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Products_id_seq";

-- Table Definition
CREATE TABLE "public"."Products" (
    "id" int4 NOT NULL DEFAULT nextval('"Products_id_seq"'::regclass),
    "name" varchar(255) NOT NULL,
    "description" text,
    "price" float8 NOT NULL,
    "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."Products" ("id", "name", "description", "price", "createdAt", "updatedAt") VALUES
(1, 'Product A', 'Description for Product A', 29.99, '2024-08-01 17:09:08.922049', '2024-08-01 17:09:08.922049'),
(2, 'Product B', 'Description for Product B', 49.99, '2024-08-01 17:09:08.922049', '2024-08-01 17:09:08.922049'),
(3, 'Product C', 'Description for Product C', 19.99, '2024-08-01 17:09:08.922049', '2024-08-01 17:09:08.922049'),
(4, 'Product D', 'Description for Product D', 99.99, '2024-08-01 17:09:08.922049', '2024-08-01 17:09:08.922049'),
(5, 'Product E', 'Description for Product E', 14.99, '2024-08-01 17:09:08.922049', '2024-08-01 17:09:08.922049');
