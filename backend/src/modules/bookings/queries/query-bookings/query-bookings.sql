/*
  @name queryBookings
*/
SELECT booking_items.id, booking_items.booking_start_date, booking_items.booking_end_date, 
event_units.id as event_units_id, event_units.name as event_unit_name, event_units.price as event_unit_price, 
event_units.venue_id as venue_id, event_units.event_category_id as event_category_id
FROM booking_items LEFT JOIN event_units ON event_units.id = booking_items.event_unit_id 
WHERE event_units.venue_id = :venueId 
AND event_units.event_category_id = :eventCategoryId;