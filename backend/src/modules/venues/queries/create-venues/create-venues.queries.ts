/** Types generated for queries found in "src/modules/venues/queries/create-venues/create-venues.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type numberArray = (number)[];

export type stringArray = (string)[];

/** 'InsertVenue' parameters type */
export interface IInsertVenueParams {
  address?: string | null | void;
  amenityIdList?: numberArray | null | void;
  description?: string | null | void;
  eventCategoryIdList?: numberArray | null | void;
  images?: stringArray | null | void;
  maxPrice?: number | null | void;
  minPrice?: number | null | void;
  phoneNum?: string | null | void;
  socialMedia?: Json | null | void;
  title?: string | null | void;
  website?: string | null | void;
}

/** 'InsertVenue' return type */
export type IInsertVenueResult = void;

/** 'InsertVenue' query type */
export interface IInsertVenueQuery {
  params: IInsertVenueParams;
  result: IInsertVenueResult;
}

const insertVenueIR: any = {"usedParamSet":{"title":true,"address":true,"description":true,"minPrice":true,"maxPrice":true,"phoneNum":true,"website":true,"images":true,"socialMedia":true,"amenityIdList":true,"eventCategoryIdList":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":150,"b":155}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":158,"b":165}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":168,"b":179}]},{"name":"minPrice","required":false,"transform":{"type":"scalar"},"locs":[{"a":182,"b":190}]},{"name":"maxPrice","required":false,"transform":{"type":"scalar"},"locs":[{"a":193,"b":201}]},{"name":"phoneNum","required":false,"transform":{"type":"scalar"},"locs":[{"a":204,"b":212}]},{"name":"website","required":false,"transform":{"type":"scalar"},"locs":[{"a":215,"b":222}]},{"name":"images","required":false,"transform":{"type":"scalar"},"locs":[{"a":225,"b":231}]},{"name":"socialMedia","required":false,"transform":{"type":"scalar"},"locs":[{"a":234,"b":245}]},{"name":"amenityIdList","required":false,"transform":{"type":"scalar"},"locs":[{"a":432,"b":445}]},{"name":"eventCategoryIdList","required":false,"transform":{"type":"scalar"},"locs":[{"a":618,"b":637}]}],"statement":"WITH inserted_venue AS (\n  INSERT INTO venue (title, address, description, min_price, max_price, phone_num, website, images, social_media )\n  VALUES (:title, :address, :description, :minPrice, :maxPrice, :phoneNum, :website, :images, :socialMedia)\n  RETURNING id\n),\ninserted_amenities AS (\n    INSERT INTO venue_amenities (amenity_id, venue_id)\n    SELECT amenity_id, inserted_venue.id\n    FROM inserted_venue\n    CROSS JOIN UNNEST(:amenityIdList::int[]) AS amenity_id\n)\nINSERT INTO venue_event_categories (event_category_id, venue_id)\nSELECT event_category_id, inserted_venue.id\nFROM inserted_venue\nCROSS JOIN UNNEST(:eventCategoryIdList::int[]) AS event_category_id"};

/**
 * Query generated from SQL:
 * ```
 * WITH inserted_venue AS (
 *   INSERT INTO venue (title, address, description, min_price, max_price, phone_num, website, images, social_media )
 *   VALUES (:title, :address, :description, :minPrice, :maxPrice, :phoneNum, :website, :images, :socialMedia)
 *   RETURNING id
 * ),
 * inserted_amenities AS (
 *     INSERT INTO venue_amenities (amenity_id, venue_id)
 *     SELECT amenity_id, inserted_venue.id
 *     FROM inserted_venue
 *     CROSS JOIN UNNEST(:amenityIdList::int[]) AS amenity_id
 * )
 * INSERT INTO venue_event_categories (event_category_id, venue_id)
 * SELECT event_category_id, inserted_venue.id
 * FROM inserted_venue
 * CROSS JOIN UNNEST(:eventCategoryIdList::int[]) AS event_category_id
 * ```
 */
export const insertVenue = new PreparedQuery<IInsertVenueParams,IInsertVenueResult>(insertVenueIR);


