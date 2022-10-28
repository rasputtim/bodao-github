/**
 * Database Table configuration Module for RolePeopleProject.
 * @module dbConfigRolePeopleProject
 * @see module:routes
 */

 import Joi from 'joi';
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from './databaseTableTypes.js';
import * as Macfacil from "./macfacil.model.js";

 
 

 const tableName = Macfacil.MacFacilTable.IAttachment;
 
export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.IAttachment,  
  relationships:{
    'tusuario': {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
    'tcompany': {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
    'tusuario_contact': {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M}
    //todo: add the other tables
  },
  insert_payload: Joi.object({
    id_attachment: Joi.number().integer().min(-1).max(-1).optional(),
    id:  Joi.string().optional(),
    filename: Joi.string().required(),
    description: Joi.string().required(),
    timestamp: Joi.string().optional(),
    in_trash: Joi.boolean().optional(),
    created_by: Joi.string().required(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().optional(),
    last_update_date: Joi.string().optional(),
    mime_type: Joi.string().optional(),
    original_name: Joi.string().optional(),
    path: Joi.string().optional(),
    id_incidencia: Joi.number().integer().optional(),
    id_task: Joi.number().integer().optional(),
    id_kb: Joi.number().integer().optional(),
    id_lead: Joi.number().integer().optional(),
    id_company: Joi.number().integer().optional(),
    id_todo: Joi.number().integer().optional(),
    id_usuario: Joi.string().optional(),
    id_contact: Joi.number().integer().optional(),
    id_sec: Joi.number().integer().optional(),
    id_invoice: Joi.number().integer().optional(),
    id_contract: Joi.number().integer().optional(),
    id_tes: Joi.number().integer().optional(),
    id_ag: Joi.number().integer().optional(),
    id_chan: Joi.number().integer().optional(),
    size: Joi.number().integer().min(0).optional(),
    id_type_ct: Joi.number().integer().min(0).required(),
    id_related: Joi.number().integer().min(0).required()
}),
  edit_payload: Joi.object({
    id_incidencia: Joi.number().integer().optional(),
    id_task: Joi.number().integer().optional(),
    id_kb: Joi.number().integer().optional(),
    id_lead: Joi.number().integer().optional(),
    id_company: Joi.number().integer().optional(),
    id_todo: Joi.number().integer().optional(),
    id_usuario: Joi.string().optional(),
    id_contact: Joi.number().integer().optional(),
    id_sec: Joi.number().integer().optional(),
    filename: Joi.string().optional(),
    description: Joi.string().optional(),
    size: Joi.number().integer().optional(),
    timestamp: Joi.string().optional(),
    id_invoice: Joi.number().integer().optional(),
    id_contract: Joi.number().integer().optional(),
    id_tes: Joi.number().integer().optional(),
    id_ag: Joi.number().integer().optional(),
    id_chan: Joi.number().integer().optional(),
    in_trash: Joi.boolean().optional(),
    created_by: Joi.string().optional(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().optional(),
    last_update_date: Joi.string().optional(),
    mime_type: Joi.string().optional(),
    original_name: Joi.string().optional(),
    path: Joi.string().optional(),
    id_type_ct: Joi.number().integer().optional(),
    id_related: Joi.number().integer().optional()
 }),
  default_payload: Joi.object({
         
    id_attachment: Joi.number().integer().min(-1).max(-1).optional(),
    id:  Joi.string().optional(),
    id_incidencia: Joi.number().integer().optional(),
    id_task: Joi.number().integer().optional(),
    id_kb: Joi.number().integer().optional(),
    id_lead: Joi.number().integer().optional(),
    id_company: Joi.number().integer().optional(),
    id_todo: Joi.number().integer().optional(),
    id_usuario: Joi.string().optional(),
    id_contact: Joi.number().integer().optional(),
    id_sec: Joi.number().integer().optional(),
    filename: Joi.string().optional(),
    description: Joi.string().optional(),
    size: Joi.number().integer().optional(),
    timestamp: Joi.string().optional(),
    id_invoice: Joi.number().integer().optional(),
    id_contract: Joi.number().integer().optional(),
    id_tes: Joi.number().integer().optional(),
    id_ag: Joi.number().integer().optional(),
    id_chan: Joi.number().integer().optional(),
    in_trash: Joi.boolean().optional(),
    created_by: Joi.string().optional(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().optional(),
    last_update_date: Joi.string().optional(),
    mime_type: Joi.string().optional(),
    original_name: Joi.string().optional(),
    path: Joi.string().optional(),
    id_type_ct: Joi.number().integer().optional(),
    id_related: Joi.number().integer().optional()
})
}

//Todo:
//Validate all the config
 /**  Simulate a M x N Relationship, but it is really a One to One */
 const data: TableDefinition_t = {
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
    type: "junction",
   
    /**  Simulate a M x N Relationship, but it is really a One to One */
    projects: { /** the M table */
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      
      the_R_tableName: dbSchemas.RAFAEL+'.'+'tagenda', /**the name of the table with N Records */
      the_J_tableName: dbSchemas.RAFAEL+'.'+'tattachment', /** the junction table */
      the_J_FK_to_R_table : 'id_ag', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    users: { /** the M table */
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tusuario', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattachment', /** the junction table */
      the_J_FK_to_R_table : 'id_usuario', /** the key to get adccess to the related table in the relationship table */
      the_J_primKey : 'id',
      the_R_primKey : 'id' 
    },
    roles: { /** the M table */
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      
      the_R_tableName : dbSchemas.RAFAEL+'.'+'tted_data', /**the name of the table with N Records */
      the_J_tableName : dbSchemas.RAFAEL+'.'+'tattachment', /** the junction table */
      the_J_FK_to_R_table : 'id_tes', /** the key to get adccess to the related table in the relationship table */
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
     // relatedTable1 : dbSchemas.FRATLESTE+'.'+'tusuario',
      //foreignKey1 : 'id_usuario',
      //relatedTable2 : dbSchemas.FRATLESTE+'.'+'tted_data',
      //foreignKey2 : 'id_tes',
      //relatedTable3 : dbSchemas.FRATLESTE+'.'+'tagenda',
     // foreignKey3 : 'id_ag',
     projects: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      
      the_R_tableName : dbSchemas.FRATLESTE+'.'+'tagenda', /**the name of the table with N Records */
       the_J_tableName : dbSchemas.FRATLESTE+'.'+'tattachment', /** the junction table */
       the_J_FK_to_R_table : 'id_ag', /** the key to get adccess to the related table in the relationship table */
       the_J_primKey : 'id' ,
       the_R_primKey : 'id' 
     },
     users: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      
      the_R_tableName : dbSchemas.FRATLESTE+'.'+'tusuario', /**the name of the table with N Records */
       the_J_tableName : dbSchemas.FRATLESTE+'.'+'tattachment', /** the junction table */
       the_J_FK_to_R_table : 'id_usuario', /** the key to get adccess to the related table in the relationship table */
       the_J_primKey : 'id',
       the_R_primKey : 'id' 
     },
     roles: {
      the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
      
      the_R_tableName : dbSchemas.FRATLESTE+'.'+'tted_data', /**the name of the table with N Records */
       the_J_tableName : dbSchemas.FRATLESTE+'.'+'tattachment', /** the junction table */
       the_J_FK_to_R_table : 'id_tes', /** the key to get adccess to the related table in the relationship table */
       the_J_primKey : 'id',
       the_R_primKey : 'id' 
     }
  }
}

export default data