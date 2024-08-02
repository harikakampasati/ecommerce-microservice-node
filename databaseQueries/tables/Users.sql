-- -------------------------------------------------------------
-- TablePlus 6.0.6(558)
--
-- https://tableplus.com/
--
-- Database: ecommerce_db
-- Generation Time: 2024-08-02 09:11:26.3940
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Users_id_seq";

-- Table Definition
CREATE TABLE "public"."Users" (
    "id" int4 NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "name" varchar(255) NOT NULL,
    "mobileNumber" varchar(15) NOT NULL,
    "otp" varchar(6),
    "otpExpiry" timestamp,
    "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- Indices
CREATE UNIQUE INDEX "Users_mobileNumber_key" ON public."Users" USING btree ("mobileNumber");

INSERT INTO "public"."Users" ("id", "name", "mobileNumber", "otp", "otpExpiry", "createdAt", "updatedAt") VALUES
(1, 'Harika', '7780120268', '647624', '2024-08-02 02:22:45.879', '2024-08-01 10:23:24.356727', '2024-08-02 02:17:45.88'),
(2, 'Posi', '8185821023', '668029', '2024-08-01 07:52:56.736', '2024-08-01 10:23:44.811635', '2024-08-01 07:47:56.738'),
(3, 'Alice Johnson', '1234567890', '123456', '2024-08-01 17:07:53.21598', '2024-08-01 17:02:53.21598', '2024-08-01 17:02:53.21598'),
(4, 'Bob Smith', '0987654321', '654321', '2024-08-01 17:07:53.21598', '2024-08-01 17:02:53.21598', '2024-08-01 17:02:53.21598'),
(5, 'Charlie Brown', '5555555555', '789012', '2024-08-01 17:07:53.21598', '2024-08-01 17:02:53.21598', '2024-08-01 17:02:53.21598'),
(6, 'Diana Prince', '6666666666', '345678', '2024-08-01 17:07:53.21598', '2024-08-01 17:02:53.21598', '2024-08-01 17:02:53.21598'),
(7, 'Eva Green', '7777777777', '901234', '2024-08-01 17:07:53.21598', '2024-08-01 17:02:53.21598', '2024-08-01 17:02:53.21598');
