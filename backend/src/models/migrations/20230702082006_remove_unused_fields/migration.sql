/*
  Warnings:

  - You are about to drop the column `total_amount` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `venue_id` on the `bookings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_venue_id_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "total_amount",
DROP COLUMN "venue_id";
