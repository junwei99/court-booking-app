/*
  Warnings:

  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_unit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `venue_amenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `venue_event_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_eventUnitId_fkey";

-- DropForeignKey
ALTER TABLE "event_unit" DROP CONSTRAINT "event_unit_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "event_unit" DROP CONSTRAINT "event_unit_venueId_fkey";

-- DropForeignKey
ALTER TABLE "venue_amenity" DROP CONSTRAINT "venue_amenity_amenityId_fkey";

-- DropForeignKey
ALTER TABLE "venue_amenity" DROP CONSTRAINT "venue_amenity_venueId_fkey";

-- DropForeignKey
ALTER TABLE "venue_event_category" DROP CONSTRAINT "venue_event_category_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "venue_event_category" DROP CONSTRAINT "venue_event_category_venueId_fkey";

-- DropTable
DROP TABLE "booking";

-- DropTable
DROP TABLE "event_category";

-- DropTable
DROP TABLE "event_unit";

-- DropTable
DROP TABLE "venue_amenity";

-- DropTable
DROP TABLE "venue_event_category";

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventUnitId" INTEGER NOT NULL,
    "bookingStartDate" TIMESTAMP(3) NOT NULL,
    "bookingEndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "event_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venueId" INTEGER NOT NULL,
    "eventCategoryId" INTEGER NOT NULL,

    CONSTRAINT "event_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_amenities" (
    "amenityId" INTEGER NOT NULL,
    "venueId" INTEGER NOT NULL,

    CONSTRAINT "venue_amenities_pkey" PRIMARY KEY ("amenityId","venueId")
);

-- CreateTable
CREATE TABLE "venue_event_categories" (
    "venueId" INTEGER NOT NULL,
    "eventCategoryId" INTEGER NOT NULL,

    CONSTRAINT "venue_event_categories_pkey" PRIMARY KEY ("venueId","eventCategoryId")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_eventUnitId_fkey" FOREIGN KEY ("eventUnitId") REFERENCES "event_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_units" ADD CONSTRAINT "event_units_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_units" ADD CONSTRAINT "event_units_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_amenities" ADD CONSTRAINT "venue_amenities_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_amenities" ADD CONSTRAINT "venue_amenities_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_categories" ADD CONSTRAINT "venue_event_categories_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_categories" ADD CONSTRAINT "venue_event_categories_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
