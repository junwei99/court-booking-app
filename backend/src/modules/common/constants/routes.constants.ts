export const ROUTES = {
  //venues
  VENUE_LIST: "/venues",
  VENUE: "/venue",
  VENUE_BY_VENUEID: "/venue/:venueId",
  AMENITY: "/amenity",
  //event-units
  EVENT_UNITS: "/event-units",
  EVENT_CATEGORIES: "/event-categories",
  EVENT_CATEGORIES_OF_VENUE: "/event-categories-of-venue/:venueId",
  //bookings
  GET_AVAILABLE_TIMESLOTS: "/get-available-timeslots",
} as const
