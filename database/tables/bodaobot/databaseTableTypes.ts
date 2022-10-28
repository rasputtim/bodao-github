import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { httpMethods_t } from "../../../REST/types/restTypes";
import * as Bodao from "./bodao.model";



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




export const dbSchemas = {
  BODAO: 'bodaobot'
} as const;

export type dbSchemas_t = typeof dbSchemas[keyof typeof dbSchemas];


export type BodaoServerRouteComplete = {
  [index in Bodao.BodaoEndPoint_t]: ServerRoute[]
};

export type BodaoServerRoute = Partial<BodaoServerRouteComplete>

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
  endpoint: Bodao.BodaoEndPoint_t,
  routeSchema: routeSchemas_t,
  query: object,
}