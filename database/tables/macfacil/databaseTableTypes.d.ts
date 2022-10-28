import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { httpMethods_t } from "REST/types/restTypes";
import * as MacFacil from "./macfacil.model";
declare type tableName = string;
declare type routeName = string;
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
export declare type tableClass_t = typeof tableClass[keyof typeof tableClass];
export declare const relationshipType: {
    readonly ONE_to_ONE: 0;
    readonly ONE_to_N: 1;
    readonly M_to_M: 2;
    readonly NO_RELATIONSHIP: 3;
};
export declare type relationshipType_t = typeof relationshipType[keyof typeof relationshipType];
export declare type tableType_t = {
    thisTableClass: tableClass_t;
    relationshipWithObjKey: relationshipType_t;
};
export declare type ttes_user_data = {
    startbalance?: object;
    balances?: object;
    extracts?: object;
    userextracts?: object;
};
export declare type commonLookupEndPoint_t = {
    the_R_tableType: tableType_t;
    tabela: MacFacil.MacFacilTable_t;
    coluna: string;
};
/**
 * @param Relationships key=the_related_table_name value={thisTableClass, thisTableRaltionship with the related one}
 */
export declare type tableSchemas_t = {
    commonLookupEndPoint?: MacFacil.MacFacilEndPoint_t[];
    restEndPoint: MacFacil.MacFacilEndPoint_t;
    insert_payload: Joi.Schema;
    default_payload?: Joi.Schema;
    edit_payload: Joi.Schema;
    relationships: Partial<Record<MacFacil.MacFacilTable_t, tableType_t>>;
};
export declare type main_Table_t = {
    dbSchema: string;
    tableName: string;
    name: string;
    primaryKey: string;
    foreignKey?: string;
};
/**
 * Also used on One To One Relationship
 */
export declare type One_to_N_Relationship_t = {
    the_R_tableType: tableType_t;
    the_R_tableName: string;
    the_R_primkey?: string;
    the_One_table: string;
    the_One_primKey: string;
    the_R_FK_to_One_Table: string;
};
export declare type J_to_R_Relationship_t = {
    the_R_tableType: tableType_t;
    the_R_tableName: string; /**the name of the related table with M or N Records */
    the_J_tableName: string; /** the junction table */
    the_J_FK_to_R_table: string; /** the key to get access to the related table in the relationship table */
    the_J_primKey: string;
    the_R_primKey: string;
};
/**
   * Also used in One to Oe Relationship
   */
export declare type One_with_One_to_N_Table_t = {
    dbSchema: string;
    tableName: string;
    name: string;
    primaryKey: string;
    [index: routeName]: One_to_N_Relationship_t | J_to_R_Relationship_t | commonLookupEndPoint_t | string;
};
export declare type TableDefinition_t = Record<tableName, One_with_One_to_N_Table_t> | Record<tableName, ttes_user_data> | tableSchemas_t;
export declare const dbSchemas: {
    readonly RAFAEL: "rafaelloduca";
    readonly FRATLESTE: "fratleste";
};
export declare type dbSchemas_t = typeof dbSchemas[keyof typeof dbSchemas];
export declare type MacFacilServerRouteComplete = {
    [index in MacFacil.MacFacilEndPoint_t]: ServerRoute[];
};
export declare type MacFacilServerRoute = Partial<MacFacilServerRouteComplete>;
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
    endpoint: MacFacil.MacFacilEndPoint_t;
    routeSchema: routeSchemas_t;
    query: object;
};
export {};
//# sourceMappingURL=databaseTableTypes.d.ts.map