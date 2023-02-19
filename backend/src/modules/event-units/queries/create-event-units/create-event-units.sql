/*
  @name insertEventUnits
  @param eventUnitList -> ((name, price, venue_id, event_category_id)...)
*/
INSERT INTO event_units (name, price, venue_id, event_category_id) VALUES :eventUnitList RETURNING id;