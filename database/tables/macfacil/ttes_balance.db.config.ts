/**
 * Database Table configuration Module for Treasury Balance.
 * @module dbConfigTesBalance
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";

const tableName = Macfacil.MacFacilTable.ITesBalance;

export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ITesBalance,  
  relationships:{
    'ttes_bal_view': {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N}
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    id_project: Joi.number().integer().min(-1).required(),
    year: Joi.string().required(),
    month: Joi.number().integer().required(),
    description: Joi.string().required()
  }),
  edit_payload: Joi.object({
    id_project: Joi.number().integer().min(-1).optional(),
    year: Joi.string().optional(),
    month: Joi.number().integer().optional(),
    description: Joi.string().optional()
  }),
  default_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    id_project: Joi.number().integer().min(-1).optional(),
    year: Joi.string().optional(),
    month: Joi.number().integer().optional(),
    description: Joi.string().optional()
  })
}

 
const data: TableDefinition_t =   {
  restEndPoint: fieldSchemas.restEndPoint,  
  relationships: fieldSchemas.relationships,
  insert_payload:fieldSchemas.insert_payload,
  edit_payload:fieldSchemas.edit_payload,
  default_payload:fieldSchemas.default_payload,
  rafael:{
      dbSchema : dbSchemas.RAFAEL,
      tableName : tableName,
      name : dbSchemas.RAFAEL+'.'+tableName,
      foreignKey : 'id_balance',
      primaryKey : 'id',
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_balance',
      primaryKey : 'id',
    }

 }

 export default data