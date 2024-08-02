-- -------------------------------------------------------------
-- TablePlus 6.0.6(558)
--
-- https://tableplus.com/
--
-- Database: ecommerce_db
-- Generation Time: 2024-08-02 09:10:30.7420
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Carts_id_seq";

-- Table Definition
CREATE TABLE "public"."Carts" (
    "id" int4 NOT NULL DEFAULT nextval('"Carts_id_seq"'::regclass),
    "userId" int4,
    "productId" int4,
    "quantity" int4 NOT NULL,
    CONSTRAINT "Carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE CASCADE,
    CONSTRAINT "Carts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Products"("id"),
    PRIMARY KEY ("id")
);

-- Indices
CREATE UNIQUE INDEX "Carts_userId_productId_key" ON public."Carts" USING btree ("userId", "productId");

INSERT INTO "public"."Carts" ("id", "userId", "productId", "quantity") VALUES
(1, 1, 1, 3),
(2, 1, 2, 6),
(3, 2, 1, 2),
(30, 2, 5, 1),
(36, 2, 2, 6);
