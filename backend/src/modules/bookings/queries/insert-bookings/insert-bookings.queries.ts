/** Types generated for queries found in "src/modules/bookings/queries/insert-bookings/insert-bookings.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertBookings' parameters type */
export interface IInsertBookingsParams {
  bookingList: readonly ({
    bookingStartDate: Date | null | void,
    bookingEndDate: Date | null | void,
    eventUnitId: number | null | void,
    guestFirstName: string | null | void,
    guestLastName: string | null | void,
    guestEmail: string | null | void
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

const insertBookingsIR: any = {"usedParamSet":{"bookingList":true},"params":[{"name":"bookingList","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"bookingStartDate","required":false},{"name":"bookingEndDate","required":false},{"name":"eventUnitId","required":false},{"name":"guestFirstName","required":false},{"name":"guestLastName","required":false},{"name":"guestEmail","required":false}]},"locs":[{"a":130,"b":141}]}],"statement":"INSERT INTO bookings (booking_start_date, booking_end_date, event_unit_id, guest_first_name, guest_last_name, guest_email) VALUES :bookingList RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bookings (booking_start_date, booking_end_date, event_unit_id, guest_first_name, guest_last_name, guest_email) VALUES :bookingList RETURNING id
 * ```
 */
export const insertBookings = new PreparedQuery<IInsertBookingsParams,IInsertBookingsResult>(insertBookingsIR);


