/*
  @name insertBookings
  @param bookingList -> ((id, totalAmount, guestFirstName, guestLastName, guestEmail,venueId)...)
*/
INSERT INTO bookings (id, total_amount, guest_first_name, guest_last_name, guest_email, venue_id) VALUES :bookingList RETURNING id;