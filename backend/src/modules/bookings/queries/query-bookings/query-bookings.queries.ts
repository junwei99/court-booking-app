/** Types generated for queries found in "src/modules/bookings/queries/query-bookings/query-bookings.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'QueryBookings' parameters type */
export interface IQueryBookingsParams {
  eventCategoryId?: number | null | void;
  venueId?: number | null | void;
}

/** 'QueryBookings' return type */
export interface IQueryBookingsResult {
  booking_end_date: Date;
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

const queryBookingsIR: any = {"usedParamSet":{"venueId":true,"eventCategoryId":true},"params":[{"name":"venueId","required":false,"transform":{"type":"scalar"},"locs":[{"a":407,"b":414}]},{"name":"eventCategoryId","required":false,"transform":{"type":"scalar"},"locs":[{"a":453,"b":468}]}],"statement":"SELECT booking_items.id, booking_items.booking_start_date, booking_items.booking_end_date, \nevent_units.id as event_units_id, event_units.name as event_unit_name, event_units.price as event_unit_price, \nevent_units.venue_id as venue_id, event_units.event_category_id as event_category_id\nFROM booking_items LEFT JOIN event_units ON event_units.id = booking_items.event_unit_id \nWHERE event_units.venue_id = :venueId \nAND event_units.event_category_id = :eventCategoryId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT booking_items.id, booking_items.booking_start_date, booking_items.booking_end_date, 
 * event_units.id as event_units_id, event_units.name as event_unit_name, event_units.price as event_unit_price, 
 * event_units.venue_id as venue_id, event_units.event_category_id as event_category_id
 * FROM booking_items LEFT JOIN event_units ON event_units.id = booking_items.event_unit_id 
 * WHERE event_units.venue_id = :venueId 
 * AND event_units.event_category_id = :eventCategoryId
 * ```
 */
export const queryBookings = new PreparedQuery<IQueryBookingsParams,IQueryBookingsResult>(queryBookingsIR);


