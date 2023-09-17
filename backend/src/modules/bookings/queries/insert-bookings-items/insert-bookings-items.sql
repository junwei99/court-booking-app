/*
  @name insertBookingItems
  @param bookingItemList -> ((bookingStartDate, bookingEndDate, eventUnitId, bookingId)...)
*/
INSERT INTO booking_items (booking_start_date, booking_end_date, event_unit_id, booking_id) VALUES :bookingItemList RETURNING id;