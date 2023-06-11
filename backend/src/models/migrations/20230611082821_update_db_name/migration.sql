/*
  Warnings:

  - You are about to drop the column `bookingEndDate` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `bookingStartDate` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `eventUnitId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `event_units` table. All the data in the column will be lost.
  - You are about to drop the column `eventCategoryId` on the `event_units` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event_units` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `event_units` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `venue` table. All the data in the column will be lost.
  - You are about to drop the column `maxPrice` on the `venue` table. All the data in the column will be lost.
  - You are about to drop the column `minPrice` on the `venue` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNum` on the `venue` table. All the data in the column will be lost.
  - You are about to drop the column `socialMedia` on the `venue` table. All the data in the column will be lost.
  - The primary key for the `venue_amenities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amenityId` on the `venue_amenities` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `venue_amenities` table. All the data in the column will be lost.
  - The primary key for the `venue_event_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventCategoryId` on the `venue_event_categories` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `venue_event_categories` table. All the data in the column will be lost.
  - Added the required column `booking_end_date` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_start_date` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_unit_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_category_id` to the `event_units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue_id` to the `event_units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_price` to the `venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_price` to the `venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_num` to the `venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_media` to the `venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amenity_id` to the `venue_amenities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue_id` to the `venue_amenities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_category_id` to the `venue_event_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue_id` to the `venue_event_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_eventUnitId_fkey";

-- DropForeignKey
ALTER TABLE "event_units" DROP CONSTRAINT "event_units_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "event_units" DROP CONSTRAINT "event_units_venueId_fkey";

-- DropForeignKey
ALTER TABLE "venue" DROP CONSTRAINT "venue_locationId_fkey";

-- DropForeignKey
ALTER TABLE "venue_amenities" DROP CONSTRAINT "venue_amenities_amenityId_fkey";

-- DropForeignKey
ALTER TABLE "venue_amenities" DROP CONSTRAINT "venue_amenities_venueId_fkey";

-- DropForeignKey
ALTER TABLE "venue_event_categories" DROP CONSTRAINT "venue_event_categories_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "venue_event_categories" DROP CONSTRAINT "venue_event_categories_venueId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "bookingEndDate",
DROP COLUMN "bookingStartDate",
DROP COLUMN "createdAt",
DROP COLUMN "eventUnitId",
DROP COLUMN "updatedAt",
ADD COLUMN     "booking_end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "booking_start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_unit_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "event_units" DROP COLUMN "createdAt",
DROP COLUMN "eventCategoryId",
DROP COLUMN "updatedAt",
DROP COLUMN "venueId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_category_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "venue_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "venue" DROP COLUMN "locationId",
DROP COLUMN "maxPrice",
DROP COLUMN "minPrice",
DROP COLUMN "phoneNum",
DROP COLUMN "socialMedia",
ADD COLUMN     "location_id" INTEGER NOT NULL,
ADD COLUMN     "max_price" INTEGER NOT NULL,
ADD COLUMN     "min_price" INTEGER NOT NULL,
ADD COLUMN     "phone_num" TEXT NOT NULL,
ADD COLUMN     "social_media" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "venue_amenities" DROP CONSTRAINT "venue_amenities_pkey",
DROP COLUMN "amenityId",
DROP COLUMN "venueId",
ADD COLUMN     "amenity_id" INTEGER NOT NULL,
ADD COLUMN     "venue_id" INTEGER NOT NULL,
ADD CONSTRAINT "venue_amenities_pkey" PRIMARY KEY ("amenity_id", "venue_id");

-- AlterTable
ALTER TABLE "venue_event_categories" DROP CONSTRAINT "venue_event_categories_pkey",
DROP COLUMN "eventCategoryId",
DROP COLUMN "venueId",
ADD COLUMN     "event_category_id" INTEGER NOT NULL,
ADD COLUMN     "venue_id" INTEGER NOT NULL,
ADD CONSTRAINT "venue_event_categories_pkey" PRIMARY KEY ("venue_id", "event_category_id");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_unit_id_fkey" FOREIGN KEY ("event_unit_id") REFERENCES "event_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_units" ADD CONSTRAINT "event_units_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_units" ADD CONSTRAINT "event_units_event_category_id_fkey" FOREIGN KEY ("event_category_id") REFERENCES "event_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "venue_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_amenities" ADD CONSTRAINT "venue_amenities_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_amenities" ADD CONSTRAINT "venue_amenities_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_categories" ADD CONSTRAINT "venue_event_categories_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_categories" ADD CONSTRAINT "venue_event_categories_event_category_id_fkey" FOREIGN KEY ("event_category_id") REFERENCES "event_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
