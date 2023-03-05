/* @name queryVenueById */
WITH amenities AS (
    SELECT venue_id, array_agg(name) AS names
    FROM venue_amenities va
    JOIN amenity a ON va.amenity_id = a.id
    GROUP BY venue_id
), event_categories AS (
    SELECT venue_id, array_agg(name) AS names
    FROM venue_event_categories vec
    JOIN event_categories ec ON vec.event_category_id = ec.id
    GROUP BY venue_id
)
SELECT v.*, a.names AS amenities, ec.names AS event_categories
FROM venue v
LEFT JOIN amenities a ON v.id = a.venue_id
LEFT JOIN event_categories ec ON v.id = ec.venue_id
WHERE v.id = :venueId;