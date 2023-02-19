/** Types generated for queries found in "src/modules/event-units/queries/create-event-units/create-event-units.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertEventUnits' parameters type */
export interface IInsertEventUnitsParams {
  eventUnitList: readonly ({
    name: string | null | void,
    price: number | null | void,
    venue_id: number | null | void,
    event_category_id: number | null | void
  })[];
}

/** 'InsertEventUnits' return type */
export interface IInsertEventUnitsResult {
  id: number;
}

/** 'InsertEventUnits' query type */
export interface IInsertEventUnitsQuery {
  params: IInsertEventUnitsParams;
  result: IInsertEventUnitsResult;
}

const insertEventUnitsIR: any = {"usedParamSet":{"eventUnitList":true},"params":[{"name":"eventUnitList","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"name","required":false},{"name":"price","required":false},{"name":"venue_id","required":false},{"name":"event_category_id","required":false}]},"locs":[{"a":74,"b":87}]}],"statement":"INSERT INTO event_units (name, price, venue_id, event_category_id) VALUES :eventUnitList RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO event_units (name, price, venue_id, event_category_id) VALUES :eventUnitList RETURNING id
 * ```
 */
export const insertEventUnits = new PreparedQuery<IInsertEventUnitsParams,IInsertEventUnitsResult>(insertEventUnitsIR);


