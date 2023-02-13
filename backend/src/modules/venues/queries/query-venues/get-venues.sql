/* @name queryVenues */
WITH event_categories AS (
    SELECT venue_id, array_agg(name) AS names
    FROM venue_event_categories vec
    JOIN event_categories ec ON vec.event_category_id = ec.id
    GROUP BY venue_id
)
SELECT v.*, ec.names AS event_categories, loc.name AS location_name
FROM venue v
LEFT JOIN event_categories ec ON v.id = ec.venue_id
LEFT JOIN location loc ON v.location_id = loc.id;