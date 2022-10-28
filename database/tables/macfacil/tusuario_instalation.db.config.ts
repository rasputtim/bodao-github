/**
 * Database Table configuration Module for User Instalation.
 * @module dbConfigUserInstalation
 * @see module:routes
 */

import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
 
 

 const tableName = Macfacil.MacFacilTable.IUserInstallation;



 

 export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.IUserInstallation,  
  relationships:{
    'tusuario': { thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
    'tcompany': { thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
    },
   insert_payload: Joi.object({
    id: Joi.number().min(-1).max(-1).integer().optional(),
    id_user: Joi.string().required(),
    id_company: Joi.number().integer().min(-1).required(),
    fecha_instalation: Joi.string().required(),
    comentarios: Joi.string().optional()
  }),
  edit_payload: Joi.object({
    id: Joi.number().min(-1).max(-1).integer().optional(),
    id_user: Joi.string().optional(),
    id_company: Joi.number().integer().min(-1).optional(),
    fecha_instalation: Joi.string().optional(),
    comentarios: Joi.string().optional()
  }),
  default_payload: Joi.object()
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
    companies: {
      the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
      the_R_tableName: Macfacil.MacFacilTable.IUserInstallation,
      the_R_primkey:'id',
      the_One_table: Macfacil.MacFacilTable.IUser,
      the_One_primKey: 'id',
      the_R_FK_to_One_Table: 'id_user'
    },
    users: {
        the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IUserInstallation,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.ICompany,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_company'
    }
   },
   fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      primaryKey : 'id',
      companies: {
        the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IUserInstallation,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IUser,
        the_One_primKey: 'id',
        the_R_FK_to_One_Table: 'id_user'
      },
      users: {
          the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
          the_R_tableName: Macfacil.MacFacilTable.IUserInstallation,
          the_R_primkey:'id',
          the_One_table: Macfacil.MacFacilTable.ICompany,
          the_One_primKey: 'id',
          the_R_FK_to_One_Table: 'id_company'
      }
 }
}

export default data