/**
 * Database Table configuration Module for User Relationships.
 * DEPRECATED
 * RELATIONSHIPS ARE MANAGED BY THE COMMON LOOKUP TABLE
 * @module dbConfigUserRelationships
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
 const dbSchema = 'rafaelloduca';
 
 
 const tableName = Macfacil.MacFacilTable.ICommonLookup; 
 //const tableName = 'tusuario_relationship';

 export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.CUserRelationship,  
  relationships:{
    'tusuario': { thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
  },
  insert_payload: Joi.object({
    id: Joi.number().min(-1).max(-1).integer().optional(),
    table: Joi.string().required().valid( 'tusuario'),
    column: Joi.string().required().valid( 'id_relationship_ct'),
    name: Joi.string().required(),
    description: Joi.string().required(),
    created_by: Joi.string().required(),
    creation_date: Joi.string().required(),
    last_updated_by: Joi.string().required(),
    last_update_date: Joi.string().required()
  }),
  edit_payload: Joi.object({
    table: Joi.string().optional().valid( 'tusuario'),
    name: Joi.string().optional(),
    column: Joi.string().optional().valid('id_relationship_ct'),
    description: Joi.string().optional(),
    created_by: Joi.string().optional(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().optional(),
    last_update_date: Joi.string().optional()
     }),
  default_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    table: Joi.string().required().valid( 'tusuario'),
    name: Joi.string().required(),
    column: Joi.string().required().valid('id_relationship_ct'),
    description: Joi.string().required(),
    created_by: Joi.string().required(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().required(),
    last_update_date: Joi.string().optional()
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
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      primaryKey : 'id',
    }

 };

 export default data