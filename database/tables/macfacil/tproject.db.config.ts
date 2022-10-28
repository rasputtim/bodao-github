/**
 * Database Table configuration Module for Projects.
 * @module dbConfigProjects
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";

const tableName = Macfacil.MacFacilTable.IProject;

const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.IProject,  
  relationships:{  'tusuario' : {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N}},
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    id_owner: Joi.string().required(),
    disabled: Joi.number().integer().required(),
    id_project_group: Joi.number().integer().optional(),
    cc: Joi.string().optional(),
    actual: Joi.number().integer().min(0).max(1).required(),
    
  }),
  edit_payload: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    start: Joi.string().optional(),
    end: Joi.string().optional(),
    id_owner: Joi.string().optional(),
    disabled: Joi.number().integer().optional(),
    id_project_group: Joi.number().integer().optional(),
    cc: Joi.string().optional(),
    actual: Joi.number().integer().min(0).max(1).optional()
     }),
  default_payload: Joi.object({
         
    id: Joi.number().integer().min(-1).max(-1).optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    start: Joi.string().optional(),
    end: Joi.string().optional(),
    id_owner: Joi.string().optional(),
    disabled: Joi.number().integer().optional(),
    id_project_group: Joi.number().integer().optional(),
    cc: Joi.string().optional(),
    actual: Joi.number().integer().min(0).max(1).optional()
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
      foreignKey : 'id_owner',
      primaryKey : 'id',
      users:{
        the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IUser,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IProject,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table:'id_owner'
      }
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_owner',
      primaryKey : 'id',
      users:{
        the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IUser,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IProject,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table:'id_owner'
      }
    }

 }

 export default data