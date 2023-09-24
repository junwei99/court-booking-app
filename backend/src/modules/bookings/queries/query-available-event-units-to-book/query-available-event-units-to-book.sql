/*
  @name queryAvailableEventUnitsToBook
*/
SELECT eu.id, eu.name, eu.price, eu.venue_id, eu.event_category_id, ec.name as event_category_name, v.title as venue_title, v.address as venue_address, v.description as venue_description, v.images as venue_images, l.name as location_name
FROM event_units eu
LEFT JOIN event_categories as ec ON eu.event_category_id = ec.id
LEFT JOIN venue as v  ON v.id = :venueId
LEFT JOIN location as l ON l.id = v.location_id
WHERE NOT EXISTS (
    SELECT b.event_unit_id
    FROM booking_items b
    WHERE eu.id = b.event_unit_id
        AND (
            (b.booking_start_date <= :bookingStartDatetime AND b.booking_end_date >= :bookingStartDatetime)
            OR (b.booking_start_date >= :bookingStartDatetime AND b.booking_start_date <= :bookingEndDatetime)
        )
) AND (eu.event_category_id = :eventCategoryId AND eu.venue_id = :venueId);