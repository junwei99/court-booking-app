/** Types generated for queries found in "src/modules/bookings/queries/query-available-event-units-to-book/query-available-event-units-to-book.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'QueryAvailableEventUnitsToBook' parameters type */
export interface IQueryAvailableEventUnitsToBookParams {
  bookingEndDatetime?: Date | null | void;
  bookingStartDatetime?: Date | null | void;
  eventCategoryId?: number | null | void;
  venueId?: number | null | void;
}

/** 'QueryAvailableEventUnitsToBook' return type */
export interface IQueryAvailableEventUnitsToBookResult {
  event_category_id: number | null;
  event_category_name: string;
  id: number;
  name: string;
  price: number;
  venue_id: number | null;
}

/** 'QueryAvailableEventUnitsToBook' query type */
export interface IQueryAvailableEventUnitsToBookQuery {
  params: IQueryAvailableEventUnitsToBookParams;
  result: IQueryAvailableEventUnitsToBookResult;
}

const queryAvailableEventUnitsToBookIR: any = {"usedParamSet":{"bookingStartDatetime":true,"bookingEndDatetime":true,"eventCategoryId":true,"venueId":true},"params":[{"name":"bookingStartDatetime","required":false,"transform":{"type":"scalar"},"locs":[{"a":335,"b":355},{"a":383,"b":403},{"a":446,"b":466}]},{"name":"bookingEndDatetime","required":false,"transform":{"type":"scalar"},"locs":[{"a":496,"b":514}]},{"name":"eventCategoryId","required":false,"transform":{"type":"scalar"},"locs":[{"a":557,"b":572}]},{"name":"venueId","required":false,"transform":{"type":"scalar"},"locs":[{"a":592,"b":599}]}],"statement":"SELECT eu.id, eu.name, eu.price, eu.venue_id, eu.event_category_id, ec.name as event_category_name\nFROM event_units eu\nLEFT JOIN event_categories as ec ON eu.event_category_id = ec.id\nWHERE NOT EXISTS (\n    SELECT b.event_unit_id\n    FROM bookings b\n    WHERE eu.id = b.event_unit_id\n        AND (\n            (b.booking_start_date <= :bookingStartDatetime AND b.booking_end_date >= :bookingStartDatetime)\n            OR (b.booking_start_date >= :bookingStartDatetime AND b.booking_start_date <= :bookingEndDatetime)\n        )\n) AND (eu.event_category_id = :eventCategoryId AND eu.venue_id = :venueId)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT eu.id, eu.name, eu.price, eu.venue_id, eu.event_category_id, ec.name as event_category_name
 * FROM event_units eu
 * LEFT JOIN event_categories as ec ON eu.event_category_id = ec.id
 * WHERE NOT EXISTS (
 *     SELECT b.event_unit_id
 *     FROM bookings b
 *     WHERE eu.id = b.event_unit_id
 *         AND (
 *             (b.booking_start_date <= :bookingStartDatetime AND b.booking_end_date >= :bookingStartDatetime)
 *             OR (b.booking_start_date >= :bookingStartDatetime AND b.booking_start_date <= :bookingEndDatetime)
 *         )
 * ) AND (eu.event_category_id = :eventCategoryId AND eu.venue_id = :venueId)
 * ```
 */
export const queryAvailableEventUnitsToBook = new PreparedQuery<IQueryAvailableEventUnitsToBookParams,IQueryAvailableEventUnitsToBookResult>(queryAvailableEventUnitsToBookIR);


