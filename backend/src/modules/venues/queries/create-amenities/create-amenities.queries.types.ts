/** Types generated for queries found in "src/modules/venues/queries/create-amenities/create-amenities.queries.ts" */

/** 'InsertAmenitiesSql' parameters type */
export interface IInsertAmenitiesSqlParams {
  amenityList: readonly ({
    name: string | null | void
  })[];
}

/** 'InsertAmenitiesSql' return type */
export type IInsertAmenitiesSqlResult = void;

/** 'InsertAmenitiesSql' query type */
export interface IInsertAmenitiesSqlQuery {
  params: IInsertAmenitiesSqlParams;
  result: IInsertAmenitiesSqlResult;
}

