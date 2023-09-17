/** Types generated for queries found in "src/modules/bookings/queries/query-booking/query-booking.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'QueryBooking' parameters type */
export interface IQueryBookingParams {
  bookingId?: string | null | void;
}

/** 'QueryBooking' return type */
export interface IQueryBookingResult {
  booking_end_date: Date;
  booking_id: string;
  booking_item_id: number;
  booking_start_date: Date;
  event_category_id: number | null;
  event_unit_id: number | null;
  event_unit_name: string;
  guest_email: string | null;
  guest_first_name: string | null;
  guest_last_name: string | null;
  price: number;
  venue_id: number | null;
  venue_name: string;
}

/** 'QueryBooking' query type */
export interface IQueryBookingQuery {
  params: IQueryBookingParams;
  result: IQueryBookingResult;
}

const queryBookingIR: any = {"usedParamSet":{"bookingId":true},"params":[{"name":"bookingId","required":false,"transform":{"type":"scalar"},"locs":[{"a":519,"b":528}]}],"statement":"SELECT \n    bi.id as booking_item_id, \n    bi.event_unit_id, \n    bi.booking_start_date, \n    bi.booking_end_date, \n    bi.booking_id, \n    b.guest_first_name, \n    b.guest_last_name, \n    b.guest_email, \n    eu.price, \n    eu.venue_Id, \n    eu.event_category_id, \n    eu.name as event_unit_name, \n    v.title as venue_name\nFROM booking_items as bi \nLEFT JOIN event_units as eu ON bi.event_unit_id = eu.id \nLEFT JOIN bookings as b ON bi.booking_id = b.id \nLEFT JOIN venue as v ON eu.venue_id = v.id \nWHERE booking_id = :bookingId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     bi.id as booking_item_id, 
 *     bi.event_unit_id, 
 *     bi.booking_start_date, 
 *     bi.booking_end_date, 
 *     bi.booking_id, 
 *     b.guest_first_name, 
 *     b.guest_last_name, 
 *     b.guest_email, 
 *     eu.price, 
 *     eu.venue_Id, 
 *     eu.event_category_id, 
 *     eu.name as event_unit_name, 
 *     v.title as venue_name
 * FROM booking_items as bi 
 * LEFT JOIN event_units as eu ON bi.event_unit_id = eu.id 
 * LEFT JOIN bookings as b ON bi.booking_id = b.id 
 * LEFT JOIN venue as v ON eu.venue_id = v.id 
 * WHERE booking_id = :bookingId
 * ```
 */
export const queryBooking = new PreparedQuery<IQueryBookingParams,IQueryBookingResult>(queryBookingIR);


