/**
 * Database Table configuration Module for Tes Payment Detai.
 * @module dbConfigTesPaymentDetail
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
 
 

 const tableName = Macfacil.MacFacilTable.ITesPaymentDetail

 export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ITesPaymentDetail,  
  relationships:{
    'ttes_data': {thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_ONE},
    'ttes_user_data': {thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_ONE},
    'ttes_payment_method': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N}
   
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    method_id: Joi.number().integer().required(),
    data_id: Joi.number().integer().required(),
    data_user_id: Joi.number().integer().required(),
    number: Joi.string().optional(),
    bank: Joi.string().optional(),
    agency: Joi.string().optional(),
    account: Joi.string().optional(),
    description: Joi.string().optional(),
  }),
  edit_payload: Joi.object({
    method_id: Joi.number().integer().optional(),
    data_id: Joi.number().integer().optional(),
    data_user_id: Joi.number().integer().optional(),
    number: Joi.string().optional(),
    bank: Joi.string().optional(),
    agency: Joi.string().optional(),
    account: Joi.string().optional(),
    description: Joi.string().optional(),
  }),
  default_payload: Joi.object({
    method_id: Joi.number().integer(),
    data_id: Joi.number().integer(),
    data_user_id: Joi.number().integer(),
    number: Joi.string(),
    bank: Joi.string(),
    agency: Joi.string(),
    account: Joi.string(),
    description: Joi.string(),

  })
}

 
 const data: TableDefinition_t = {
  restEndPoint: fieldSchemas.restEndPoint,  
  relationships: fieldSchemas.relationships,
  insert_payload:fieldSchemas.insert_payload,
  edit_payload:fieldSchemas.edit_payload,
  default_payload:fieldSchemas.default_payload,
  rafael:{
    dbSchema : dbSchemas.RAFAEL,
    tableName : tableName,
    name : dbSchemas.RAFAEL+'.'+tableName,
    primaryKey : 'id',
    //type: "junction",
    /** M x N Relationships */
    paymentmethods: {
      the_R_tableType: {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
      the_R_tableName: Macfacil.MacFacilTable.ITesPaymentMethod, /**the name of the table with N Records */
      the_J_tableName: Macfacil.MacFacilTable.ITesPaymentDetail, /** the junction table */
      the_J_FK_to_R_table: 'method_id', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey: 'id' ,
      the_R_primKey: 'id' 
    },
    data: {
      the_R_tableType: {thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_ONE},
      the_R_tableName : Macfacil.MacFacilTable.ITesData, /**the name of the table with N Records */
      the_J_tableName : Macfacil.MacFacilTable.ITesPaymentDetail, /** the junction table */
      the_J_FK_to_R_table : 'data_id', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    userdata: {
      the_R_tableType: {thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_ONE},
      the_R_tableName : Macfacil.MacFacilTable.ITesUserData, /**the name of the table with N Records */
      the_J_tableName : Macfacil.MacFacilTable.ITesPaymentDetail, /** the junction table */
      the_J_FK_to_R_table : 'data_id', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    }

   },
   fratleste:{
    dbSchema : dbSchemas.FRATLESTE,
    tableName : tableName,
    name : dbSchemas.FRATLESTE+'.'+tableName,
    primaryKey : 'id',
    type: "junction",
    paymentmethods: {
      the_R_tableType: {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
      the_R_tableName: Macfacil.MacFacilTable.ITesPaymentMethod, /**the name of the table with N Records */
      the_J_tableName: Macfacil.MacFacilTable.ITesPaymentDetail, /** the junction table */
      the_J_FK_to_R_table: 'method_id', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey: 'id' ,
      the_R_primKey: 'id' 
    },
    data: {
      the_R_tableType: {thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_ONE},
      the_R_tableName : Macfacil.MacFacilTable.ITesData, /**the name of the table with N Records */
      the_J_tableName : Macfacil.MacFacilTable.ITesPaymentDetail, /** the junction table */
      the_J_FK_to_R_table : 'data_id', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    userdata: {
      the_R_tableType: {thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_ONE},
      the_R_tableName : Macfacil.MacFacilTable.ITesUserData, /**the name of the table with N Records */
      the_J_tableName : Macfacil.MacFacilTable.ITesPaymentDetail, /** the junction table */
      the_J_FK_to_R_table : 'data_id', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    }
   }
 }

 export default data