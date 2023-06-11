/*
  Warnings:

  - You are about to drop the `Amenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventUnit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenueAmenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenueEventCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_eventUnitId_fkey";

-- DropForeignKey
ALTER TABLE "EventUnit" DROP CONSTRAINT "EventUnit_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "EventUnit" DROP CONSTRAINT "EventUnit_venueId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_locationId_fkey";

-- DropForeignKey
ALTER TABLE "VenueAmenity" DROP CONSTRAINT "VenueAmenity_amenityId_fkey";

-- DropForeignKey
ALTER TABLE "VenueAmenity" DROP CONSTRAINT "VenueAmenity_venueId_fkey";

-- DropForeignKey
ALTER TABLE "VenueEventCategory" DROP CONSTRAINT "VenueEventCategory_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "VenueEventCategory" DROP CONSTRAINT "VenueEventCategory_venueId_fkey";

-- DropTable
DROP TABLE "Amenity";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "EventCategory";

-- DropTable
DROP TABLE "EventUnit";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Venue";

-- DropTable
DROP TABLE "VenueAmenity";

-- DropTable
DROP TABLE "VenueEventCategory";

-- CreateTable
CREATE TABLE "amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventUnitId" INTEGER NOT NULL,
    "bookingStartDate" TIMESTAMP(3) NOT NULL,
    "bookingEndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "event_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venueId" INTEGER NOT NULL,
    "eventCategoryId" INTEGER NOT NULL,

    CONSTRAINT "event_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minPrice" INTEGER NOT NULL,
    "maxPrice" INTEGER NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "images" TEXT[],
    "socialMedia" JSONB NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_amenity" (
    "amenityId" INTEGER NOT NULL,
    "venueId" INTEGER NOT NULL,

    CONSTRAINT "venue_amenity_pkey" PRIMARY KEY ("amenityId","venueId")
);

-- CreateTable
CREATE TABLE "venue_event_category" (
    "venueId" INTEGER NOT NULL,
    "eventCategoryId" INTEGER NOT NULL,

    CONSTRAINT "venue_event_category_pkey" PRIMARY KEY ("venueId","eventCategoryId")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_eventUnitId_fkey" FOREIGN KEY ("eventUnitId") REFERENCES "event_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_unit" ADD CONSTRAINT "event_unit_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_unit" ADD CONSTRAINT "event_unit_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "venue_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_amenity" ADD CONSTRAINT "venue_amenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_amenity" ADD CONSTRAINT "venue_amenity_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_category" ADD CONSTRAINT "venue_event_category_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_category" ADD CONSTRAINT "venue_event_category_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
