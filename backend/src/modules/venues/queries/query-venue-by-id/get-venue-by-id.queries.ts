/** Types generated for queries found in "src/modules/venues/queries/query-venue-by-id/get-venue-by-id.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type stringArray = (string)[];

/** 'QueryVenueById' parameters type */
export interface IQueryVenueByIdParams {
  venueId?: number | null | void;
}

/** 'QueryVenueById' return type */
export interface IQueryVenueByIdResult {
  address: string;
  amenities: stringArray | null;
  description: string;
  event_categories: stringArray | null;
  id: number;
  images: stringArray | null;
  location_id: number | null;
  max_price: number;
  min_price: number;
  phone_num: string;
  social_media: Json | null;
  title: string;
  website: string;
}

/** 'QueryVenueById' query type */
export interface IQueryVenueByIdQuery {
  params: IQueryVenueByIdParams;
  result: IQueryVenueByIdResult;
}

const queryVenueByIdIR: any = {"usedParamSet":{"venueId":true},"params":[{"name":"venueId","required":false,"transform":{"type":"scalar"},"locs":[{"a":536,"b":543}]}],"statement":"WITH amenities AS (\n    SELECT venue_id, array_agg(name) AS names\n    FROM venue_amenities va\n    JOIN amenity a ON va.amenity_id = a.id\n    GROUP BY venue_id\n), event_categories AS (\n    SELECT venue_id, array_agg(name) AS names\n    FROM venue_event_categories vec\n    JOIN event_categories ec ON vec.event_category_id = ec.id\n    GROUP BY venue_id\n)\nSELECT v.*, a.names AS amenities, ec.names AS event_categories\nFROM venue v\nLEFT JOIN amenities a ON v.id = a.venue_id\nLEFT JOIN event_categories ec ON v.id = ec.venue_id\nWHERE v.id = :venueId"};

/**
 * Query generated from SQL:
 * ```
 * WITH amenities AS (
 *     SELECT venue_id, array_agg(name) AS names
 *     FROM venue_amenities va
 *     JOIN amenity a ON va.amenity_id = a.id
 *     GROUP BY venue_id
 * ), event_categories AS (
 *     SELECT venue_id, array_agg(name) AS names
 *     FROM venue_event_categories vec
 *     JOIN event_categories ec ON vec.event_category_id = ec.id
 *     GROUP BY venue_id
 * )
 * SELECT v.*, a.names AS amenities, ec.names AS event_categories
 * FROM venue v
 * LEFT JOIN amenities a ON v.id = a.venue_id
 * LEFT JOIN event_categories ec ON v.id = ec.venue_id
 * WHERE v.id = :venueId
 * ```
 */
export const queryVenueById = new PreparedQuery<IQueryVenueByIdParams,IQueryVenueByIdResult>(queryVenueByIdIR);


