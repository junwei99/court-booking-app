/*
  @name insertBookings
  @param bookingList -> ((bookingStartDate, bookingEndDate, eventUnitId,  guestFirstName, guestLastName, guestEmail)...)
*/
INSERT INTO bookings (booking_start_date, booking_end_date, event_unit_id, guest_first_name, guest_last_name, guest_email) VALUES :bookingList RETURNING id;