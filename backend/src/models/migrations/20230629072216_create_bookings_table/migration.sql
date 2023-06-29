-- CreateTable
CREATE TABLE "bookings" (
    "id" VARCHAR NOT NULL,
    "guest_first_name" VARCHAR,
    "guest_last_name" VARCHAR,
    "guest_email" VARCHAR,
    "total_amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venue_id" INTEGER NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
