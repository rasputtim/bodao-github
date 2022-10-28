import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { httpMethods_t } from "REST/types/restTypes";
import * as MacFacil from "./macfacil.model";



type tableName = string
type routeName = string

/**
 * ONE Table is the one referenced by the N table. it has not the foreigh key 
 * N Table is the table that references a table and has the many end point and the foreign key
 * M table is the one referenced by the Junction table in a many to many link
 * JUNCTION TABLE is the table that references de M tales and has the foreign keys in a many to many relationship
 */
export const tableClass = {
  ONE: 0,
  ONE_TABLE:1, 
  N_TABLE: 2,  
  M_TABLE:3,   
  JUNCTION:4,
  COMMON_LOOKUP:4   
} as const;



export type tableClass_t = typeof tableClass[keyof typeof tableClass];

export const relationshipType = {
  ONE_to_ONE: 0,
  ONE_to_N:1,  
  M_to_M: 2, 
  NO_RELATIONSHIP:3
} as const;

export type relationshipType_t = typeof relationshipType[keyof typeof relationshipType];


export type tableType_t = {
  thisTableClass: tableClass_t,
  relationshipWithObjKey: relationshipType_t
}

export type ttes_user_data = {
  startbalance?:object;
  balances?:object;
  extracts?:object;
  userextracts?:object;
}

export type commonLookupEndPoint_t = {the_R_tableType:tableType_t,tabela: MacFacil.MacFacilTable_t; coluna: string; } 



/**
 * @param Relationships key=the_related_table_name value={thisTableClass, thisTableRaltionship with the related one}
 */
export type tableSchemas_t = {
  commonLookupEndPoint?:  MacFacil.MacFacilEndPoint_t[],
  restEndPoint:  MacFacil.MacFacilEndPoint_t ,
  insert_payload:Joi.Schema;
  default_payload?:Joi.Schema;
  edit_payload:Joi.Schema;
  relationships:Partial<Record<MacFacil.MacFacilTable_t,tableType_t>>
  
}

//====== ONE Table ============
// is a isolated table, not used in any kind of relationship
export type main_Table_t =  {
  dbSchema: string; 
  tableName: string; 
  name: string; 
  primaryKey: string; 
  foreignKey?:string;
} 



//==============================

//====== ONE to N Relationship =======
// 1->N  has two tables
// The One Table, the id of the one table is used as
// foreign key in the N table


/**
 * Also used on One To One Relationship
 */
export type One_to_N_Relationship_t = {
  the_R_tableType:tableType_t,
  the_R_tableName: string;
  the_R_primkey?:string;
  the_One_table: string;
  the_One_primKey: string;
  the_R_FK_to_One_Table: string;
  }

  



  
//Junction to Related Relationship
//The Junction id the Junction Table
//Related can be both, the M or N table side of the relationship
export type J_to_R_Relationship_t = { 
  the_R_tableType:tableType_t,
  the_R_tableName: string; /**the name of the related table with M or N Records */
  the_J_tableName: string; /** the junction table */
  the_J_FK_to_R_table: string; /** the key to get access to the related table in the relationship table */
  the_J_primKey: string;
  the_R_primKey: string; 
}

/**
   * Also used in One to Oe Relationship
   */
 export type One_with_One_to_N_Table_t = {
  dbSchema: string;
  tableName: string;
  name: string;
  primaryKey: string;
  //foreignKey: string;
  [index: routeName]:One_to_N_Relationship_t | J_to_R_Relationship_t | commonLookupEndPoint_t |string ;
  
 }

//with relationships
//export type TableDefinition_t = Record<tableName, main_Table_t | ttes_user_data> | tableSchemas_t
//export type Record_M_to_N_ConfTable_t = Record<tableName,J_to_R_Relationship_t> | tableSchemas_t
export type TableDefinition_t = Record<tableName,One_with_One_to_N_Table_t > |  Record<tableName,ttes_user_data> | tableSchemas_t

export const dbSchemas = {
  RAFAEL: 'rafaelloduca',  
  FRATLESTE: 'fratleste', 
} as const;

export type dbSchemas_t = typeof dbSchemas[keyof typeof dbSchemas];


export type MacFacilServerRouteComplete = {
  [index in MacFacil.MacFacilEndPoint_t]: ServerRoute[]
};

export type MacFacilServerRoute = Partial<MacFacilServerRouteComplete>

/**
 * schema used in the route 
 */
export const routeSchemas = {
  RAFAEL: 'rafael',  
  FRATLESTE: 'fratleste', 
} as const;

export type routeSchemas_t = typeof routeSchemas[keyof typeof routeSchemas];



export type routeRequest_t = {
  method: httpMethods_t,
  endpoint: MacFacil.MacFacilEndPoint_t,
  routeSchema: routeSchemas_t,
  query: object,
}