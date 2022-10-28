/**
 * Database Table configuration Module for Treasury Balance Biew.
 * @module dbConfigTesBalView
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";



const tableName = Macfacil.MacFacilTable.ITesBalView;
export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ITesBalView,  
  relationships:{
    'ttes_balance': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N}
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    description: Joi.string().optional(),
    id_project: Joi.number().integer().required(),
    id_bal_01: Joi.number().integer().required(),
    id_bal_02: Joi.number().integer().required(),
    id_bal_03: Joi.number().integer().required(),
    id_bal_04: Joi.number().integer().required(),
    id_bal_05: Joi.number().integer().required(),
    id_bal_06: Joi.number().integer().required(),
    id_bal_07: Joi.number().integer().required(),
    id_bal_08: Joi.number().integer().required(),
    id_bal_09: Joi.number().integer().required(),
    id_bal_10: Joi.number().integer().required(),
    id_bal_11: Joi.number().integer().required(),
    id_bal_12: Joi.number().integer().required(),
    id_bal_13: Joi.number().integer().required(),
    id_bal_14: Joi.number().integer().required(),
    id_bal_15: Joi.number().integer().required(),
    id_bal_16: Joi.number().integer().required(),
    id_bal_17: Joi.number().integer().required(),
    id_bal_18: Joi.number().integer().required(),
    id_bal_19: Joi.number().integer().required(),
    id_bal_20: Joi.number().integer().required(),
    id_bal_21: Joi.number().integer().required(),
    id_bal_22: Joi.number().integer().required(),
    id_bal_23: Joi.number().integer().required(),
    id_bal_24: Joi.number().integer().required(),
  }),
  edit_payload: Joi.object({
    description: Joi.string().optional(),
    id_project: Joi.number().integer().optional(),
    id_bal_01: Joi.number().integer().optional(),
    id_bal_02: Joi.number().integer().optional(),
    id_bal_03: Joi.number().integer().optional(),
    id_bal_04: Joi.number().integer().optional(),
    id_bal_05: Joi.number().integer().optional(),
    id_bal_06: Joi.number().integer().optional(),
    id_bal_07: Joi.number().integer().optional(),
    id_bal_08: Joi.number().integer().optional(),
    id_bal_09: Joi.number().integer().optional(),
    id_bal_10: Joi.number().integer().optional(),
    id_bal_11: Joi.number().integer().optional(),
    id_bal_12: Joi.number().integer().optional(),
    id_bal_13: Joi.number().integer().optional(),
    id_bal_14: Joi.number().integer().optional(),
    id_bal_15: Joi.number().integer().optional(),
    id_bal_16: Joi.number().integer().optional(),
    id_bal_17: Joi.number().integer().optional(),
    id_bal_18: Joi.number().integer().optional(),
    id_bal_19: Joi.number().integer().optional(),
    id_bal_20: Joi.number().integer().optional(),
    id_bal_21: Joi.number().integer().optional(),
    id_bal_22: Joi.number().integer().optional(),
    id_bal_23: Joi.number().integer().optional(),
    id_bal_24: Joi.number().integer().optional(),
  }),
  default_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    description: Joi.string().optional(),
    id_project: Joi.number().integer().optional(),
    id_bal_01: Joi.number().integer().optional(),
    id_bal_02: Joi.number().integer().optional(),
    id_bal_03: Joi.number().integer().optional(),
    id_bal_04: Joi.number().integer().optional(),
    id_bal_05: Joi.number().integer().optional(),
    id_bal_06: Joi.number().integer().optional(),
    id_bal_07: Joi.number().integer().optional(),
    id_bal_08: Joi.number().integer().optional(),
    id_bal_09: Joi.number().integer().optional(),
    id_bal_10: Joi.number().integer().optional(),
    id_bal_11: Joi.number().integer().optional(),
    id_bal_12: Joi.number().integer().optional(),
    id_bal_13: Joi.number().integer().optional(),
    id_bal_14: Joi.number().integer().optional(),
    id_bal_15: Joi.number().integer().optional(),
    id_bal_16: Joi.number().integer().optional(),
    id_bal_17: Joi.number().integer().optional(),
    id_bal_18: Joi.number().integer().optional(),
    id_bal_19: Joi.number().integer().optional(),
    id_bal_20: Joi.number().integer().optional(),
    id_bal_21: Joi.number().integer().optional(),
    id_bal_22: Joi.number().integer().optional(),
    id_bal_23: Joi.number().integer().optional(),
    id_bal_24: Joi.number().integer().optional(),
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
      foreignKey : 'id_balview',
      primaryKey : 'id',
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_balview',
      primaryKey : 'id',
    }

 }

 export default data