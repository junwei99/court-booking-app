/*
  @name queryAvailableEventUnitsToBook
*/
SELECT eu.id, eu.name, eu.price, eu.venue_id, eu.event_category_id, ec.name as event_category_name
FROM event_units eu
LEFT JOIN event_categories as ec ON eu.event_category_id = ec.id
WHERE NOT EXISTS (
    SELECT b.event_unit_id
    FROM booking_items b
    WHERE eu.id = b.event_unit_id
        AND (
            (b.booking_start_date <= :bookingStartDatetime AND b.booking_end_date >= :bookingStartDatetime)
            OR (b.booking_start_date >= :bookingStartDatetime AND b.booking_start_date <= :bookingEndDatetime)
        )
) AND (eu.event_category_id = :eventCategoryId AND eu.venue_id = :venueId);