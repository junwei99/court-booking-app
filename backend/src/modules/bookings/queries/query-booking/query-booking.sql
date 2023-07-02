
/* 
 @name queryBooking
*/
SELECT 
    bi.id as booking_item_id, 
    bi.event_unit_id, 
    bi.booking_start_date, 
    bi.booking_end_date, 
    bi.booking_id, 
    b.guest_first_name, 
    b.guest_last_name, 
    b.guest_email, 
    eu.price, 
    eu.venue_Id, 
    eu.event_category_id, 
    eu.name as event_unit_name, 
    v.title as venue_name
FROM booking_items as bi 
LEFT JOIN event_units as eu ON bi.event_unit_id = eu.id 
LEFT JOIN bookings as b ON bi.booking_id = b.id 
LEFT JOIN venue as v ON eu.venue_id = v.id 
WHERE booking_id = :bookingId;
