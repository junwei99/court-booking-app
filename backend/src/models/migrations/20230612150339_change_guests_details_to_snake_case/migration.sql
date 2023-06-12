/*
  Warnings:

  - You are about to drop the column `guestEmail` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `guestFirstName` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `guestLastName` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "guestEmail",
DROP COLUMN "guestFirstName",
DROP COLUMN "guestLastName",
ADD COLUMN     "guest_email" VARCHAR,
ADD COLUMN     "guest_first_name" VARCHAR,
ADD COLUMN     "guest_last_name" VARCHAR;
