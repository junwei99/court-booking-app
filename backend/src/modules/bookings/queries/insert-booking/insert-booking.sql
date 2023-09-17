/*
  @name insertBookings
  @param bookingList -> ((id, guestFirstName, guestLastName, guestEmail)...)
*/
INSERT INTO bookings (id, guest_first_name, guest_last_name, guest_email) VALUES :bookingList RETURNING id;