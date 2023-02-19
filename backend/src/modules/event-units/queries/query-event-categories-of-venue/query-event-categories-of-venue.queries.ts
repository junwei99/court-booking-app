/** Types generated for queries found in "src/modules/event-units/queries/query-event-categories-of-venue/query-event-categories-of-venue.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'QueryEventCategoriesOfVenue' parameters type */
export interface IQueryEventCategoriesOfVenueParams {
  venueId?: number | null | void;
}

/** 'QueryEventCategoriesOfVenue' return type */
export interface IQueryEventCategoriesOfVenueResult {
  id: number;
  name: string;
  type: string;
}

/** 'QueryEventCategoriesOfVenue' query type */
export interface IQueryEventCategoriesOfVenueQuery {
  params: IQueryEventCategoriesOfVenueParams;
  result: IQueryEventCategoriesOfVenueResult;
}

const queryEventCategoriesOfVenueIR: any = {"usedParamSet":{"venueId":true},"params":[{"name":"venueId","required":false,"transform":{"type":"scalar"},"locs":[{"a":129,"b":136}]}],"statement":"SELECT ec.*\nFROM event_categories ec\nINNER JOIN venue_event_categories vec ON ec.id = vec.event_category_id\nWHERE vec.venue_id = :venueId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT ec.*
 * FROM event_categories ec
 * INNER JOIN venue_event_categories vec ON ec.id = vec.event_category_id
 * WHERE vec.venue_id = :venueId
 * ```
 */
export const queryEventCategoriesOfVenue = new PreparedQuery<IQueryEventCategoriesOfVenueParams,IQueryEventCategoriesOfVenueResult>(queryEventCategoriesOfVenueIR);


