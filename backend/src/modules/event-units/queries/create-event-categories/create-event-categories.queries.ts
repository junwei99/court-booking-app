/** Types generated for queries found in "src/modules/event-units/queries/create-event-categories/create-event-categories.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertEventCategories' parameters type */
export interface IInsertEventCategoriesParams {
  eventCategoryList: readonly ({
    name: string | null | void,
    type: string | null | void
  })[];
}

/** 'InsertEventCategories' return type */
export interface IInsertEventCategoriesResult {
  id: number;
}

/** 'InsertEventCategories' query type */
export interface IInsertEventCategoriesQuery {
  params: IInsertEventCategoriesParams;
  result: IInsertEventCategoriesResult;
}

const insertEventCategoriesIR: any = {"usedParamSet":{"eventCategoryList":true},"params":[{"name":"eventCategoryList","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"name","required":false},{"name":"type","required":false}]},"locs":[{"a":50,"b":67}]}],"statement":"INSERT INTO event_categories (name, type) \nVALUES :eventCategoryList RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO event_categories (name, type) 
 * VALUES :eventCategoryList RETURNING id
 * ```
 */
export const insertEventCategories = new PreparedQuery<IInsertEventCategoriesParams,IInsertEventCategoriesResult>(insertEventCategoriesIR);


