/*
  Warnings:

  - Added the required column `booking_id` to the `booking_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking_items" ADD COLUMN     "booking_id" VARCHAR NOT NULL;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
