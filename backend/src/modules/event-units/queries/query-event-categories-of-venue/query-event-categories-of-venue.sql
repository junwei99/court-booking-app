/*
  @name queryEventCategoriesOfVenue
*/
SELECT ec.*
FROM event_categories ec
INNER JOIN venue_event_categories vec ON ec.id = vec.event_category_id
WHERE vec.venue_id = :venueId;
