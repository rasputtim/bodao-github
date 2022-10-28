/**
 * Database Table configuration Module for Languages.
 * @module dbConfigLanguages
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";



const tableName = Macfacil.MacFacilTable.ILanguage;

const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.ILanguage,  
  relationships:{'tlanguage': {thisTableClass:tableClass.ONE_TABLE, relationshipWithObjKey:relationshipType.NO_RELATIONSHIP}},
  insert_payload: Joi.object( {
    id_language: Joi.string().required(),
    name: Joi.string().required()
  }),
  edit_payload: Joi.object( {
    id_language: Joi.string().optional(),
    name: Joi.string().optional()
  }),
  default_payload: Joi.object({
    id_language: Joi.string().optional(),
    name: Joi.string().optional()
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
      primaryKey : 'id_language',
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      primaryKey : 'id_language',
    }

 }

 export default data