import { ServerRoute } from "@hapi/hapi";
import { httpMethods_t } from "../../../REST/types/restTypes";
import * as Bodao from "./bodao.model";
/**
 * ONE Table is the one referenced by the N table. it has not the foreigh key
 * N Table is the table that references a table and has the many end point and the foreign key
 * M table is the one referenced by the Junction table in a many to many link
 * JUNCTION TABLE is the table that references de M tales and has the foreign keys in a many to many relationship
 */
export declare const tableClass: {
    readonly ONE: 0;
    readonly ONE_TABLE: 1;
    readonly N_TABLE: 2;
    readonly M_TABLE: 3;
    readonly JUNCTION: 4;
    readonly COMMON_LOOKUP: 4;
};
export declare const dbSchemas: {
    readonly BODAO: "bodaobot";
};
export declare type dbSchemas_t = typeof dbSchemas[keyof typeof dbSchemas];
export declare type BodaoServerRouteComplete = {
    [index in Bodao.BodaoEndPoint_t]: ServerRoute[];
};
export declare type BodaoServerRoute = Partial<BodaoServerRouteComplete>;
/**
 * schema used in the route
 */
export declare const routeSchemas: {
    readonly RAFAEL: "rafael";
    readonly FRATLESTE: "fratleste";
};
export declare type routeSchemas_t = typeof routeSchemas[keyof typeof routeSchemas];
export declare type routeRequest_t = {
    method: httpMethods_t;
    endpoint: Bodao.BodaoEndPoint_t;
    routeSchema: routeSchemas_t;
    query: object;
};
//# sourceMappingURL=databaseTableTypes.d.ts.map