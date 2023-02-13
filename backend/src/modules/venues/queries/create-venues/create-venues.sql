/* @name insertVenue */
WITH inserted_venue AS (
  INSERT INTO venue (title, address, description, min_price, max_price, phone_num, website, images, social_media )
  VALUES (:title, :address, :description, :minPrice, :maxPrice, :phoneNum, :website, :images, :socialMedia)
  RETURNING id
),
inserted_amenities AS (
    INSERT INTO venue_amenities (amenity_id, venue_id)
    SELECT amenity_id, inserted_venue.id
    FROM inserted_venue
    CROSS JOIN UNNEST(:amenityIdList::int[]) AS amenity_id
)
INSERT INTO venue_event_categories (event_category_id, venue_id)
SELECT event_category_id, inserted_venue.id
FROM inserted_venue
CROSS JOIN UNNEST(:eventCategoryIdList::int[]) AS event_category_id;