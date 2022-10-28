/**
 * Database Table configuration Module for Users Roles.
 * @module dbConfigUserRoles
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";



const tableName = Macfacil.MacFacilTable.ICompany
export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ICompany,  
  relationships:{
    'tcommon_lookup': {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
   // 'tcompany_role': {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
   // 'ttemples': {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},

  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    name: Joi.string().required(),
    address: Joi.string().optional(), //used only in PHP
    fiscal_id: Joi.string().optional(),
    country: Joi.string().optional(), //used only in PHP
    website: Joi.string().optional(),
    comments: Joi.string().optional(),
    id_company_role: Joi.number().integer().optional(), //used only in PHP
    id_parent: Joi.number().integer().optional(),
    manager: Joi.string().optional(),
    last_update: Joi.string().optional(),
    id_rite_ct: Joi.number().integer().required(),
    foundation_date: Joi.string().optional(),
    id_meeting_day_ct: Joi.number().integer().optional(),
    id_frequency_ct: Joi.number().integer().optional(),
    id_company_role_ct: Joi.number().integer().required(),
    number: Joi.number().integer().optional(),
    meeting_custom: Joi.string().optional(),
    id_temple: Joi.number().integer().optional()
  }),
  edit_payload: Joi.object({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    fiscal_id: Joi.string().optional(),
    country: Joi.string().optional(),
    website: Joi.string().optional(),
    comments: Joi.string().optional(),
    id_company_role: Joi.number().integer().optional(),
    id_parent: Joi.number().integer().optional(),
    manager: Joi.string().optional(),
    last_update: Joi.string().optional(),
    id_rite_ct: Joi.number().integer().optional(),
    foundation_date: Joi.string().optional(),
    id_meeting_day_ct: Joi.number().integer().optional(),
    id_frequency_ct: Joi.number().integer().optional(),
    id_company_role_ct: Joi.number().integer().optional(),
    number: Joi.number().integer().optional(),
    meeting_custom: Joi.string().optional(),
    id_temple: Joi.number().integer().optional()
     }),
  default_payload: Joi.object({
         
    id: Joi.number().integer().min(-1).max(-1).optional(),
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    fiscal_id: Joi.string().optional(),
    country: Joi.string().optional(),
    website: Joi.string().optional(),
    comments: Joi.string().optional(),
    id_company_role: Joi.number().integer().optional(),
    id_parent: Joi.number().integer().optional(),
    manager: Joi.string().optional(),
    last_update: Joi.string().optional(),
    id_rite_ct: Joi.number().integer().optional(),
    foundation_date: Joi.string().optional(),
    id_meeting_day_ct: Joi.number().integer().optional(),
    id_frequency_ct: Joi.number().integer().optional(),
    id_company_role_ct: Joi.number().integer().optional(),
    number: Joi.number().integer().optional(),
    meeting_custom: Joi.string().optional(),
    id_temple: Joi.number().integer().optional()
  })
}
 
const data: TableDefinition_t =  {
  restEndPoint: fieldSchemas.restEndPoint,  
  relationships:fieldSchemas.relationships,
    insert_payload:fieldSchemas.insert_payload,
    edit_payload:fieldSchemas.edit_payload,
    default_payload:fieldSchemas.default_payload,rafael:{
      dbSchema : dbSchemas.RAFAEL,
      tableName : tableName,
      name : dbSchemas.RAFAEL+'.'+tableName,
      foreignKey : 'id_company',
      primaryKey : 'id',
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_company',
      primaryKey : 'id',
    }

 }

 export default data