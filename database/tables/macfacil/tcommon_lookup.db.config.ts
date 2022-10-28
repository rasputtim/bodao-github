/**
 * Database Table configuration Module for Common Lookup.
 * @module dbConfigCommonLookup
 * @see module:routes
 */

import Joi from "joi";
import * as dbTypes from "./databaseTableTypes.js";

import * as MacFacil from "./macfacil.model.js";

 const tableName = MacFacil.MacFacilTable.ICommonLookup;
 
//SHAL HANDLE userstatus routes


 export const fieldSchemas:dbTypes.tableSchemas_t = {
  restEndPoint:  MacFacil.MacFacilEndPoint.ICommonLookup,
  commonLookupEndPoint:[ MacFacil.MacFacilEndPoint.CUserStatus, MacFacil.MacFacilEndPoint.CUserRelationship, MacFacil.MacFacilEndPoint.CUserGrade],
  relationships:{
    'tusuario': {thisTableClass:dbTypes.tableClass.N_TABLE, relationshipWithObjKey:dbTypes.relationshipType.ONE_to_N},
    'tcompany': {thisTableClass:dbTypes.tableClass.N_TABLE, relationshipWithObjKey:dbTypes.relationshipType.ONE_to_N},
    'taddress': {thisTableClass:dbTypes.tableClass.N_TABLE, relationshipWithObjKey:dbTypes.relationshipType.ONE_to_N},
    'ttelephone':{thisTableClass:dbTypes.tableClass.N_TABLE, relationshipWithObjKey:dbTypes.relationshipType.ONE_to_N},
    'tattachment':{thisTableClass:dbTypes.tableClass.N_TABLE, relationshipWithObjKey:dbTypes.relationshipType.ONE_to_N}
  },
  insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    table: Joi.string().required().valid('taddress','ttelephone','tusuario','tusuario_contact','tagenda','tattachment','tvisitor','tcompany'),
    name: Joi.string().required(),
    column: Joi.string().required().valid('address_context', 'address_type', 'payment_method', 'telephone_type', 'tes_category', 
    'tes_user_category', 'id_grade_ct', 'user_profile', 'id_relationship_ct', 
    'user_role', 'id_relationship_ct','download_type','download_category','company_role','telephone_context'),
    description: Joi.string().required(),
    created_by: Joi.string().required(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().required(),
    last_update_date: Joi.string().optional()
    
  }),
  edit_payload: Joi.object({
    table: Joi.string().optional().valid('taddress','ttelephone','tusuario','tusuario_contact','tagenda','tattachment','tvisitor','tcompany'),
    name: Joi.string().optional(),
    column: Joi.string().optional().valid('address_context', 'address_type', 'payment_method', 'telephone_type', 'tes_category', 
    'tes_user_category', 'id_grade_ct', 'user_profile', 'id_relationship_ct', 
    'user_role', 'id_relationship_ct','download_type','download_category','company_role','telephone_context'),
    description: Joi.string().optional(),
    created_by: Joi.string().optional(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().optional(),
    last_update_date: Joi.string().optional()
     }),
  default_payload: Joi.object({
         
    id: Joi.number().integer().min(-1).max(-1).optional(),
    table: Joi.string().required().valid('taddress','ttelephone','tusuario','tusuario_contact','tagenda','tattachment','tvisitor','tcompany'),
    name: Joi.string().required(),
    column: Joi.string().required().valid('address_context', 'address_type', 'payment_method', 'telephone_type', 'tes_category', 
    'tes_user_category', 'id_grade_ct', 'user_profile', 'id_relationship_ct', 
    'user_role', 'id_relationship_ct','download_type','download_category','company_role','telephone_context'),
    description: Joi.string().required(),
    created_by: Joi.string().required(),
    creation_date: Joi.string().optional(),
    last_updated_by: Joi.string().required(),
    last_update_date: Joi.string().optional()
  })
}

 const data: dbTypes.TableDefinition_t =  {
    commonLookupEndPoint:fieldSchemas.commonLookupEndPoint,
    restEndPoint:fieldSchemas.restEndPoint,
    relationships:fieldSchemas.relationships,
    insert_payload:fieldSchemas.insert_payload,
    edit_payload:fieldSchemas.edit_payload,
    default_payload:fieldSchemas.default_payload,
    rafael:{
      dbSchema : dbTypes.dbSchemas.RAFAEL,
      tableName : tableName,
      name : dbTypes.dbSchemas.RAFAEL+'.'+tableName,
      primaryKey : 'id',
      userstatus: {
        the_R_tableType: {thisTableClass:dbTypes.tableClass.COMMON_LOOKUP, relationshipWithObjKey:dbTypes.relationshipType.NO_RELATIONSHIP},
        tabela: MacFacil.MacFacilTable.IUser,
        coluna: 'id_status_ct'
      },
      userrelationships:{
        the_R_tableType: {thisTableClass:dbTypes.tableClass.COMMON_LOOKUP, relationshipWithObjKey:dbTypes.relationshipType.NO_RELATIONSHIP},
        tabela: MacFacil.MacFacilTable.IUserContact,
        coluna: 'id_relationship_ct'
      },
      usergrades:{
        the_R_tableType: {thisTableClass:dbTypes.tableClass.COMMON_LOOKUP, relationshipWithObjKey:dbTypes.relationshipType.NO_RELATIONSHIP},
        tabela: MacFacil.MacFacilTable.IUser,
        coluna: 'id_degree_ct'
      }
    },
    fratleste:{
      dbSchema : dbTypes.dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbTypes.dbSchemas.FRATLESTE+'.'+tableName,
      primaryKey : 'id',
    }

 };

 export default data