/** Types generated for queries found in "src/modules/bookings/queries/query-booking/query-booking.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'QueryBooking' parameters type */
export interface IQueryBookingParams {
  bookingId?: string | null | void;
}

/** 'QueryBooking' return type */
export interface IQueryBookingResult {
  created_at: Date;
  guest_email: string | null;
  guest_first_name: string | null;
  guest_last_name: string | null;
  id: string;
  total_amount: string;
  updated_at: Date;
  venue_id: number;
}

/** 'QueryBooking' query type */
export interface IQueryBookingQuery {
  params: IQueryBookingParams;
  result: IQueryBookingResult;
}

const queryBookingIR: any = {"usedParamSet":{"bookingId":true},"params":[{"name":"bookingId","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":43}]}],"statement":"SELECT * FROM bookings WHERE id = :bookingId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bookings WHERE id = :bookingId
 * ```
 */
export const queryBooking = new PreparedQuery<IQueryBookingParams,IQueryBookingResult>(queryBookingIR);


