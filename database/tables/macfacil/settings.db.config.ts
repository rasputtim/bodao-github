/**
 * Database Table configuration Module for Settings.
 * @module dbConfigSettings
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";

const tableName = Macfacil.MacFacilTable.ISetting;

export const fieldSchemas:tableSchemas_t = {
  restEndPoint:Macfacil.MacFacilEndPoint.ISetting,  
  relationships:{'tconfig':{thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.NO_RELATIONSHIP}},
  insert_payload: Joi.object({
    id_config: Joi.number().integer().min(-1).max(-1).optional(),
    token: Joi.string().required(),
    value: Joi.string().optional()
  }),
  edit_payload: Joi.object({
    token: Joi.string().optional(),
    value: Joi.string().optional()   
  }),
  default_payload: Joi.object({    
    token: Joi.string().required(),
    value: Joi.string().optional()
  })
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
    name : dbSchemas.RAFAEL + '.' + tableName,
    primaryKey : 'id_config',
  },
  fratleste:{
    dbSchema : dbSchemas.FRATLESTE,
    tableName : tableName,
    name : dbSchemas.FRATLESTE+'.'+tableName,
    primaryKey : 'id_config',
  }

 }

 export default data