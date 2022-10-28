import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
/**
 * Database Table configuration Module for User Remido.
 * @module dbConfigUserRemido
 * @see module:routes
 */



const tableName = Macfacil.MacFacilTable.IUserRedeemed;
export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.IUserRedeemed,  
  relationships:{
   'ttes_user_remido': {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    id_user: Joi.string().required(),// varying(60) COLLATE pg_catalog."default" NOT NULL,
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    forever: Joi.boolean().required(), // smallint NOT NULL,
    description: Joi.string().optional(), // COLLATE pg_catalog."default",
    rem_mens: Joi.boolean().required(), //NOT NULL,
    rem_cap: Joi.boolean().required(), //NOT NULL,
    rem_mut: Joi.boolean().required(), //NOT NULL,
  }),
  edit_payload: Joi.object({
    id_user: Joi.string().optional(), // varying(60) COLLATE pg_catalog."default" NOT NULL,
    start_date: Joi.string().optional(), 
    end_date: Joi.string().optional(), 
    forever: Joi.boolean().optional(),  // smallint NOT NULL,
    description: Joi.string().optional(), // COLLATE pg_catalog."default",
    rem_mens: Joi.boolean().optional(),  //NOT NULL,
    rem_cap: Joi.boolean().optional(), //NOT NULL,
    rem_mut: Joi.boolean().optional(),  //NOT NULL,
 }),
  default_payload: Joi.object({
    id_user: Joi.string().optional(), // varying(60) COLLATE pg_catalog."default" NOT NULL,
    start_date: Joi.string().optional(), 
    end_date: Joi.string().optional(), 
    forever: Joi.boolean().optional(),  // smallint NOT NULL,
    description: Joi.string().optional(), // COLLATE pg_catalog."default",
    rem_mens: Joi.boolean().optional(),  //NOT NULL,
    rem_cap: Joi.boolean().optional(), //NOT NULL,
    rem_mut: Joi.boolean().optional(),  //NOT NULL,
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
      foreignKey : 'id_user',
      primaryKey : 'id',
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