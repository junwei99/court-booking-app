/** Types generated for queries found in "src/modules/venues/queries/create-amenities/create-amenity-list.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertAmenityList' parameters type */
export interface IInsertAmenityListParams {
  amenityList: readonly ({
    name: string | null | void
  })[];
}

/** 'InsertAmenityList' return type */
export interface IInsertAmenityListResult {
  id: number;
}

/** 'InsertAmenityList' query type */
export interface IInsertAmenityListQuery {
  params: IInsertAmenityListParams;
  result: IInsertAmenityListResult;
}

const insertAmenityListIR: any = {"usedParamSet":{"amenityList":true},"params":[{"name":"amenityList","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"name","required":false}]},"locs":[{"a":34,"b":45}]}],"statement":"INSERT INTO amenity (name) VALUES :amenityList RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO amenity (name) VALUES :amenityList RETURNING id
 * ```
 */
export const insertAmenityList = new PreparedQuery<IInsertAmenityListParams,IInsertAmenityListResult>(insertAmenityListIR);


