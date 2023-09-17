-- CreateTable
CREATE TABLE "amenity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,

    CONSTRAINT "PK_a6368447a61afbf9def09fd81af" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_units" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venue_id" INTEGER,
    "event_category_id" INTEGER,

    CONSTRAINT "PK_8cd68d0b514b52c1142548f5fea" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "location_type" VARCHAR NOT NULL,

    CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "min_price" INTEGER NOT NULL,
    "max_price" INTEGER NOT NULL,
    "phone_num" VARCHAR NOT NULL,
    "website" VARCHAR NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "social_media" JSONB DEFAULT '[]',
    "location_id" INTEGER,

    CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_amenities" (
    "amenity_id" INTEGER NOT NULL,
    "venue_id" INTEGER NOT NULL,

    CONSTRAINT "PK_0bce6c38a68d1b1c4062f4f1863" PRIMARY KEY ("amenity_id","venue_id")
);

-- CreateTable
CREATE TABLE "venue_event_categories" (
    "venue_id" INTEGER NOT NULL,
    "event_category_id" INTEGER NOT NULL,

    CONSTRAINT "PK_217dbb805556e107d04a6b804a1" PRIMARY KEY ("venue_id","event_category_id")
);

-- CreateTable
CREATE TABLE "booking_items" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_unit_id" INTEGER,
    "booking_start_date" TIMESTAMPTZ(6) NOT NULL,
    "booking_end_date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_12725c60b6e328ce52061f958c" ON "venue_amenities"("amenity_id");

-- CreateIndex
CREATE INDEX "IDX_52aa3f633512f7a025e288ba8e" ON "venue_amenities"("venue_id");

-- CreateIndex
CREATE INDEX "IDX_0f9fe236e0586d9693998864c8" ON "venue_event_categories"("venue_id");

-- CreateIndex
CREATE INDEX "IDX_d0712ae4a17f24c8ffa47f31a6" ON "venue_event_categories"("event_category_id");

-- AddForeignKey
ALTER TABLE "event_units" ADD CONSTRAINT "FK_951f2415425313b016bef6b4ebb" FOREIGN KEY ("event_category_id") REFERENCES "event_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_units" ADD CONSTRAINT "FK_c7f7bd764118dd45c88a8203665" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "FK_0e415f584ec4eb5369dcd665a50" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venue_amenities" ADD CONSTRAINT "FK_12725c60b6e328ce52061f958c1" FOREIGN KEY ("amenity_id") REFERENCES "amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_amenities" ADD CONSTRAINT "FK_52aa3f633512f7a025e288ba8eb" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_categories" ADD CONSTRAINT "FK_0f9fe236e0586d9693998864c8e" FOREIGN KEY ("venue_id") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_event_categories" ADD CONSTRAINT "FK_d0712ae4a17f24c8ffa47f31a65" FOREIGN KEY ("event_category_id") REFERENCES "event_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "FK_3e628ac28c72541c6678bf9598e" FOREIGN KEY ("event_unit_id") REFERENCES "event_units"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

