import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
/**
 * Database Table configuration Module for Treasury Data.
 * @module dbTreasuryData
 * @see module:routes
 */



const tableName = Macfacil.MacFacilTable.ITesData;

export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ITesData,  
  relationships:{
    'tusuario': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
    'ttes_category': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
    'ttes_balance': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
    'tproject': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
    //'tuser_refund': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
   
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    amount1: Joi.number().precision(2).min(0).required(),
    description: Joi.string().required(),
    id_user: Joi.string().required(),
    id_product: Joi.number().integer().required(),
    id_category: Joi.number().integer().required(),
    id_balance: Joi.number().integer().required(),
    date: Joi.string().required(),
    id_project: Joi.number().integer().required(),
    id_user_refund: Joi.string().optional()
  }),
  edit_payload: Joi.object({
    amount1: Joi.number().precision(2).min(0).optional(),
    description: Joi.string().optional(),
    id_user: Joi.string().optional(),
    id_product: Joi.number().integer().optional(),
    id_category: Joi.number().integer().optional(),
    id_balance: Joi.number().integer().optional(),
    date: Joi.string().optional(),
    id_project: Joi.number().integer().optional(),
    id_user_refund: Joi.string().optional()
  }),
  default_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    amount1: Joi.number().precision(2).min(0).required(),
    description: Joi.string().optional(),
    id_user: Joi.string().optional(),
    id_product: Joi.number().integer().optional(),
    id_category: Joi.number().integer().optional(),
    id_balance: Joi.number().integer().optional(),
    date: Joi.string().optional(),
    id_project: Joi.number().integer().optional(),
    id_user_refund: Joi.string().optional()
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
      primaryKey : 'id',
      users: {
        the_R_tableType:{thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.ITesData,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IUser,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_user'
      },
      tescategories: {
        the_R_tableType:{thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.ITesData,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.ITesCategory,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_category'
      },
      balances: {
        the_R_tableType:{thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.ITesData,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.ITesBalance,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_balance'
      },
      projects: {
        the_R_tableType:{thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.ITesData,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IProject,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_project'
      }
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_user',
      primaryKey : 'id',
    }

 }

 export default data