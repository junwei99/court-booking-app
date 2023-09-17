/** Types generated for queries found in "src/modules/bookings/queries/insert-bookings-items/insert-bookings-items.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertBookingItems' parameters type */
export interface IInsertBookingItemsParams {
  bookingItemList: readonly ({
    bookingStartDate: Date | null | void,
    bookingEndDate: Date | null | void,
    eventUnitId: number | null | void,
    bookingId: string | null | void
  })[];
}

/** 'InsertBookingItems' return type */
export interface IInsertBookingItemsResult {
  id: number;
}

/** 'InsertBookingItems' query type */
export interface IInsertBookingItemsQuery {
  params: IInsertBookingItemsParams;
  result: IInsertBookingItemsResult;
}

const insertBookingItemsIR: any = {"usedParamSet":{"bookingItemList":true},"params":[{"name":"bookingItemList","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"bookingStartDate","required":false},{"name":"bookingEndDate","required":false},{"name":"eventUnitId","required":false},{"name":"bookingId","required":false}]},"locs":[{"a":99,"b":114}]}],"statement":"INSERT INTO booking_items (booking_start_date, booking_end_date, event_unit_id, booking_id) VALUES :bookingItemList RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO booking_items (booking_start_date, booking_end_date, event_unit_id, booking_id) VALUES :bookingItemList RETURNING id
 * ```
 */
export const insertBookingItems = new PreparedQuery<IInsertBookingItemsParams,IInsertBookingItemsResult>(insertBookingItemsIR);


