/**
 * Database Table configuration Module for Attendance.
 * @module dbConfigAttendance
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";

 const tableName = Macfacil.MacFacilTable.IAttendance;
 
 export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.IAttendance,  
  relationships:{
    'tusuario':{thisTableClass:tableClass.JUNCTION, relationshipWithObjKey:relationshipType.M_to_M},
    'tusuario_contact':{thisTableClass:tableClass.JUNCTION, relationshipWithObjKey:relationshipType.M_to_M},
    'tcompany':{thisTableClass:tableClass.JUNCTION, relationshipWithObjKey:relationshipType.M_to_M},
    'tvisitor':{thisTableClass:tableClass.JUNCTION, relationshipWithObjKey:relationshipType.M_to_M}
  },
  insert_payload: Joi.object({
    id: Joi.number().min(-1).max(-1).integer().optional(),
    id_contact: Joi.string().required(),
    id_agenda: Joi.number().integer().min(-1).required(),
    attended: Joi.boolean().required(),
    id_type_ct: Joi.number().integer().min(-1).required()
  }),
  edit_payload: Joi.object({
    id_contact: Joi.string().optional(),
    id_agenda: Joi.number().integer().min(-1).optional(),
    attended: Joi.boolean().optional(),
    id_type_ct: Joi.number().integer().min(-1).optional()
  }),
  default_payload: Joi.object()
}
 
 const data: TableDefinition_t =  {
  restEndPoint: fieldSchemas.restEndPoint,  
  relationships:fieldSchemas.relationships,
  insert_payload:fieldSchemas.insert_payload,
  edit_payload:fieldSchemas.edit_payload,
  default_payload:fieldSchemas.default_payload,
   rafael:{
    dbSchema : dbSchemas.RAFAEL,
    tableName : tableName,
    name : dbSchemas.RAFAEL+'.'+tableName,
    primaryKey : 'id',
    //type: "junction",
    //The field id_type_ct determine if the relayionship with with table
    // tusuario, tusuario_contact, tcompany or tvisitor
    /**  M x N Relationships */
    agendas: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tagenda', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_agenda', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    users: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tusuario', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_contact', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    }
    ,
    usercontacts: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tusuario_contact', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_contact', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    visitors: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tvisitor', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_contact', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    companies: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tcompany', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_contact', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    }
   },
   fratleste:{
    dbSchema : dbSchemas.RAFAEL,
    tableName : tableName,
    name : dbSchemas.RAFAEL+'.'+tableName,
    primaryKey : 'id',
    type: "junction",
    /**  M x N Relationships */
    agendas: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tagenda', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_agenda', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    users: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tusuario', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_user', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    }
    ,
    visitors: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tvisitor', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_contact', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    companies: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tcompany', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattendance', /** the junction table */
      the_J_FK_to_R_table : 'id_contact', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    }
   }
 }

 export default data