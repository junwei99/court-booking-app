/*
  @name insertBookings
  @param bookingList -> ((bookingStartDate, bookingEndDate, eventUnitId)...)
*/
INSERT INTO bookings (booking_start_date, booking_end_date, event_unit_id) VALUES :bookingList RETURNING id;