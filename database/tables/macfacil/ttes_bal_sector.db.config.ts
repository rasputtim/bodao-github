/**
 * Database Table configuration Module for Treasury Balance Sector.
 * @module dbConfigTesBalSector
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";



const tableName = Macfacil.MacFacilTable.ITesBalSector;
export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ITesBalSector,  
  relationships:{
    'tes_bal_view_data': {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M}
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    is_debit: Joi.boolean().required(),
    is_balance: Joi.boolean().required(),
    is_hospitalary: Joi.boolean() .required(),
    id_division: Joi.number().integer().min(-1).required()
  }),
  edit_payload: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    is_debit: Joi.boolean().optional(),
    is_balance: Joi.boolean().optional(), 
    is_hospitalary: Joi.boolean().optional(), 
    id_division: Joi.number().integer().min(-1)
  }),
  default_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    is_debit: Joi.boolean().optional(),
    is_balance: Joi.boolean().optional(), 
    is_hospitalary: Joi.boolean().optional(), 
    id_division: Joi.number().integer().min(-1)
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
      foreignKey : 'id_balsector',
      primaryKey : 'id',
      tesbalviewdata:{
        the_R_tableType:{thisTableClass:tableClass.JUNCTION, relationshipWithObjKey:relationshipType.M_to_M},
        the_R_tableName: Macfacil.MacFacilTable.ITesBalViewData,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.ITesBalSector,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_sector' 
      }
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_balsector',
      primaryKey : 'id',
    }

 }

 export default data