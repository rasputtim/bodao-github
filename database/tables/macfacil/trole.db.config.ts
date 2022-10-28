/**
 * Database Table configuration Module for Users Roles.
 * @module dbConfigUserRoles
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";




const tableName = Macfacil.MacFacilTable.IUserRole;

export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.IUserRole,
  relationships:{
    'tusuario': {thisTableClass:tableClass.N_TABLE,relationshipWithObjKey:relationshipType.ONE_to_N},
    'trole_people_project': {thisTableClass:tableClass.M_TABLE,relationshipWithObjKey:relationshipType.M_to_M}
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    name: Joi.string().required(),
    description: Joi.string().optional(),
    cost: Joi.number().integer().optional(),
  }),
  edit_payload: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    cost: Joi.number().integer().optional(),
  }),
  default_payload: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    cost: Joi.number().integer().optional(),
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
      name : dbSchemas.RAFAEL+'.'+tableName,
      primaryKey : 'id',
      users:{
        the_R_tableType:{thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IUser,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IUserRole,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_role'
      },
      rolepeopleprojects:{
        the_R_tableType: {thisTableClass:tableClass.M_TABLE, relationshipWithObjKey:relationshipType.M_to_M},
        the_R_tableName: Macfacil.MacFacilTable.IUserRole, /**the name of the related table with M or N Records */
        the_J_tableName: Macfacil.MacFacilTable.IRolePeopleProject, /** the junction table */
        the_J_FK_to_R_table: 'id_role', /** the key to get access to the related table in the relationship table */
        the_J_primKey: 'id',
        the_R_primKey: 'id' 
      }
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      primaryKey : 'id',
    }

 }

 export default data