/**
 * Database Table configuration Module for Treasury Categories.
 * @module dbConfigTesCategory
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";



const tableName = Macfacil.MacFacilTable.ITesCategory;

export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ITesCategory,  
  relationships:{
    'ttes_category': {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N}
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    id_sector: Joi.number().integer().min(-1).required(),
    name: Joi.string().required(),
    code: Joi.number().integer().required(),
    description: Joi.string().required(),
    icon: Joi.string().required(),
    parent: Joi.number().integer().required(),
    valuable: Joi.boolean().required() 
  }),
  edit_payload: Joi.object({
    id_sector: Joi.number().integer().min(-1).optional(),
    name: Joi.string().optional(),
    code: Joi.number().integer().optional(),
    description: Joi.string().optional(),
    icon: Joi.string().optional(),
    parent: Joi.number().integer().optional(),
    valuable: Joi.boolean().optional() 
  }),
  default_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    id_sector: Joi.number().integer().min(-1).optional(),
    name: Joi.string().optional(),
    code: Joi.number().integer().optional(),
    description: Joi.string().optional(),
    icon: Joi.string().optional(),
    parent: Joi.number().integer().optional(),
    valuable: Joi.boolean().optional() 
  })
}

 
const data: TableDefinition_t =  {
  restEndPoint: fieldSchemas.restEndPoint,  
  relationships: fieldSchemas.relationships,
  insert_payload:fieldSchemas.insert_payload,
  edit_payload:fieldSchemas.edit_payload,
  default_payload:fieldSchemas.default_payload,
  rafael:{
      dbSchema : dbSchemas.RAFAEL,
      tableName : tableName,
      name : dbSchemas.RAFAEL+'.'+tableName,
      foreignKey : 'id_category',
      primaryKey : 'id',
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_category',
      primaryKey : 'id',
    }

 }

 export default data