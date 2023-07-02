/** Types generated for queries found in "src/modules/bookings/queries/insert-booking/insert-booking.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertBookings' parameters type */
export interface IInsertBookingsParams {
  bookingList: readonly ({
    id: string | null | void,
    guestFirstName: string | null | void,
    guestLastName: string | null | void,
    guestEmail: string | null | void
  })[];
}

/** 'InsertBookings' return type */
export interface IInsertBookingsResult {
  id: string;
}

/** 'InsertBookings' query type */
export interface IInsertBookingsQuery {
  params: IInsertBookingsParams;
  result: IInsertBookingsResult;
}

const insertBookingsIR: any = {"usedParamSet":{"bookingList":true},"params":[{"name":"bookingList","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":false},{"name":"guestFirstName","required":false},{"name":"guestLastName","required":false},{"name":"guestEmail","required":false}]},"locs":[{"a":81,"b":92}]}],"statement":"INSERT INTO bookings (id, guest_first_name, guest_last_name, guest_email) VALUES :bookingList RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bookings (id, guest_first_name, guest_last_name, guest_email) VALUES :bookingList RETURNING id
 * ```
 */
export const insertBookings = new PreparedQuery<IInsertBookingsParams,IInsertBookingsResult>(insertBookingsIR);


