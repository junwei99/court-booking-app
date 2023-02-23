/** Types generated for queries found in "src/modules/bookings/queries/query-bookings/query-bookings.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'QueryBookings' parameters type */
export interface IQueryBookingsParams {
  eventCategoryId?: number | null | void;
  venueId?: number | null | void;
}

/** 'QueryBookings' return type */
export interface IQueryBookingsResult {
  booking_start_date: Date;
  event_category_id: number | null;
  event_unit_name: string;
  event_unit_price: number;
  event_units_id: number;
  id: number;
  venue_id: number | null;
}

/** 'QueryBookings' query type */
export interface IQueryBookingsQuery {
  params: IQueryBookingsParams;
  result: IQueryBookingsResult;
}

const queryBookingsIR: any = {"usedParamSet":{"venueId":true,"eventCategoryId":true},"params":[{"name":"venueId","required":false,"transform":{"type":"scalar"},"locs":[{"a":355,"b":362}]},{"name":"eventCategoryId","required":false,"transform":{"type":"scalar"},"locs":[{"a":401,"b":416}]}],"statement":"SELECT bookings.id, bookings.booking_start_date, \nevent_units.id as event_units_id, event_units.name as event_unit_name, event_units.price as event_unit_price, \nevent_units.venue_id as venue_id, event_units.event_category_id as event_category_id\nFROM bookings LEFT JOIN event_units ON event_units.id = bookings.event_unit_id \nWHERE event_units.venue_id = :venueId \nAND event_units.event_category_id = :eventCategoryId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT bookings.id, bookings.booking_start_date, 
 * event_units.id as event_units_id, event_units.name as event_unit_name, event_units.price as event_unit_price, 
 * event_units.venue_id as venue_id, event_units.event_category_id as event_category_id
 * FROM bookings LEFT JOIN event_units ON event_units.id = bookings.event_unit_id 
 * WHERE event_units.venue_id = :venueId 
 * AND event_units.event_category_id = :eventCategoryId
 * ```
 */
export const queryBookings = new PreparedQuery<IQueryBookingsParams,IQueryBookingsResult>(queryBookingsIR);


