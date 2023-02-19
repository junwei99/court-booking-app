/*
  @name insertEventCategories
  @param eventCategoryList -> ((name, type)...)
*/
INSERT INTO event_categories (name, type) 
VALUES :eventCategoryList RETURNING id;