/** Types generated for queries found in "src/modules/bookings/queries/insert-bookings/insert-bookings.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertBookings' parameters type */
export interface IInsertBookingsParams {
  bookingList: readonly ({
    bookingStartDate: Date | null | void,
    bookingEndDate: Date | null | void,
    eventUnitId: number | null | void
  })[];
}

/** 'InsertBookings' return type */
export interface IInsertBookingsResult {
  id: number;
}

/** 'InsertBookings' query type */
export interface IInsertBookingsQuery {
  params: IInsertBookingsParams;
  result: IInsertBookingsResult;
}

const insertBookingsIR: any = {"usedParamSet":{"bookingList":true},"params":[{"name":"bookingList","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"bookingStartDate","required":false},{"name":"bookingEndDate","required":false},{"name":"eventUnitId","required":false}]},"locs":[{"a":82,"b":93}]}],"statement":"INSERT INTO bookings (booking_start_date, booking_end_date, event_unit_id) VALUES :bookingList RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bookings (booking_start_date, booking_end_date, event_unit_id) VALUES :bookingList RETURNING id
 * ```
 */
export const insertBookings = new PreparedQuery<IInsertBookingsParams,IInsertBookingsResult>(insertBookingsIR);


