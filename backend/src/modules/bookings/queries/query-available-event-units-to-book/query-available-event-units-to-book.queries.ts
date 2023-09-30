/** Types generated for queries found in "src/modules/bookings/queries/query-available-event-units-to-book/query-available-event-units-to-book.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type stringArray = (string)[];

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
  location_name: string;
  name: string;
  price: number;
  venue_address: string;
  venue_description: string;
  venue_id: number | null;
  venue_images: stringArray | null;
  venue_title: string;
}

/** 'QueryAvailableEventUnitsToBook' query type */
export interface IQueryAvailableEventUnitsToBookQuery {
  params: IQueryAvailableEventUnitsToBookParams;
  result: IQueryAvailableEventUnitsToBookResult;
}

const queryAvailableEventUnitsToBookIR: any = {"usedParamSet":{"venueId":true,"bookingStartDatetime":true,"bookingEndDatetime":true,"eventCategoryId":true},"params":[{"name":"venueId","required":false,"transform":{"type":"scalar"},"locs":[{"a":355,"b":362},{"a":825,"b":832}]},{"name":"bookingStartDatetime","required":false,"transform":{"type":"scalar"},"locs":[{"a":568,"b":588},{"a":616,"b":636},{"a":679,"b":699}]},{"name":"bookingEndDatetime","required":false,"transform":{"type":"scalar"},"locs":[{"a":729,"b":747}]},{"name":"eventCategoryId","required":false,"transform":{"type":"scalar"},"locs":[{"a":790,"b":805}]}],"statement":"SELECT eu.id, eu.name, eu.price, eu.venue_id, eu.event_category_id, ec.name as event_category_name, v.title as venue_title, v.address as venue_address, v.description as venue_description, v.images as venue_images, l.name as location_name\nFROM event_units eu\nLEFT JOIN event_categories as ec ON eu.event_category_id = ec.id\nLEFT JOIN venue as v  ON v.id = :venueId\nLEFT JOIN location as l ON l.id = v.location_id\nWHERE NOT EXISTS (\n    SELECT b.event_unit_id\n    FROM booking_items b\n    WHERE eu.id = b.event_unit_id\n        AND (\n            (b.booking_start_date <= :bookingStartDatetime AND b.booking_end_date >= :bookingStartDatetime)\n            OR (b.booking_start_date >= :bookingStartDatetime AND b.booking_start_date <= :bookingEndDatetime)\n        )\n) AND (eu.event_category_id = :eventCategoryId AND eu.venue_id = :venueId)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT eu.id, eu.name, eu.price, eu.venue_id, eu.event_category_id, ec.name as event_category_name, v.title as venue_title, v.address as venue_address, v.description as venue_description, v.images as venue_images, l.name as location_name
 * FROM event_units eu
 * LEFT JOIN event_categories as ec ON eu.event_category_id = ec.id
 * LEFT JOIN venue as v  ON v.id = :venueId
 * LEFT JOIN location as l ON l.id = v.location_id
 * WHERE NOT EXISTS (
 *     SELECT b.event_unit_id
 *     FROM booking_items b
 *     WHERE eu.id = b.event_unit_id
 *         AND (
 *             (b.booking_start_date <= :bookingStartDatetime AND b.booking_end_date >= :bookingStartDatetime)
 *             OR (b.booking_start_date >= :bookingStartDatetime AND b.booking_start_date <= :bookingEndDatetime)
 *         )
 * ) AND (eu.event_category_id = :eventCategoryId AND eu.venue_id = :venueId)
 * ```
 */
export const queryAvailableEventUnitsToBook = new PreparedQuery<IQueryAvailableEventUnitsToBookParams,IQueryAvailableEventUnitsToBookResult>(queryAvailableEventUnitsToBookIR);


