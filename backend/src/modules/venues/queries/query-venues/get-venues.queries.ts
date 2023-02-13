/** Types generated for queries found in "src/modules/venues/queries/query-venues/get-venues.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type stringArray = (string)[];

/** 'QueryVenues' parameters type */
export type IQueryVenuesParams = void;

/** 'QueryVenues' return type */
export interface IQueryVenuesResult {
  address: string;
  description: string;
  event_categories: stringArray | null;
  id: number;
  images: stringArray;
  location_id: number | null;
  location_name: string;
  max_price: number;
  min_price: number;
  phone_num: string;
  social_media: Json | null;
  title: string;
  website: string;
}

/** 'QueryVenues' query type */
export interface IQueryVenuesQuery {
  params: IQueryVenuesParams;
  result: IQueryVenuesResult;
}

const queryVenuesIR: any = {"usedParamSet":{},"params":[],"statement":"WITH event_categories AS (\n    SELECT venue_id, array_agg(name) AS names\n    FROM venue_event_categories vec\n    JOIN event_categories ec ON vec.event_category_id = ec.id\n    GROUP BY venue_id\n)\nSELECT v.*, ec.names AS event_categories, loc.name AS location_name\nFROM venue v\nLEFT JOIN event_categories ec ON v.id = ec.venue_id\nLEFT JOIN location loc ON v.location_id = loc.id"};

/**
 * Query generated from SQL:
 * ```
 * WITH event_categories AS (
 *     SELECT venue_id, array_agg(name) AS names
 *     FROM venue_event_categories vec
 *     JOIN event_categories ec ON vec.event_category_id = ec.id
 *     GROUP BY venue_id
 * )
 * SELECT v.*, ec.names AS event_categories, loc.name AS location_name
 * FROM venue v
 * LEFT JOIN event_categories ec ON v.id = ec.venue_id
 * LEFT JOIN location loc ON v.location_id = loc.id
 * ```
 */
export const queryVenues = new PreparedQuery<IQueryVenuesParams,IQueryVenuesResult>(queryVenuesIR);


