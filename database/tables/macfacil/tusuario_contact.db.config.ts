import Joi from "joi";
import { dbSchemas, relationshipType, tableClass, TableDefinition_t, tableSchemas_t } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
/**
 * Database Table configuration Module for User Contacts.
 * @module dbConfigUserContacts
 * @see module:routes
 */



const tableName = Macfacil.MacFacilTable.IUserContact;
export const fieldSchemas:tableSchemas_t = {
  restEndPoint: Macfacil.MacFacilEndPoint.IUserContact,  
  relationships:{
    'tusuario': { thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
    'taddress': { thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
    'ttelephone': { thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
    'tcommon_lookup': { thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
   },
   insert_payload: Joi.object({
    id: Joi.number().integer().min(-1).max(-1).optional(),
    id_usuario: Joi.string().required(),
    id_relationship: Joi.number().integer().required(), //not used anymore in the javascript version. only used in the php version
    name: Joi.string().required(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    mobile: Joi.string().optional(),
    profissao: Joi.string().optional(),
    fecha_nascimento: Joi.string().optional(),
    fecha_casamento: Joi.string().optional(),
    direccion: Joi.string().optional(), //not used anymore in the javascript version. only used in the php version
    direccion_no: Joi.number().integer().min(0).optional(), //not used anymore in the javascript version. only used in the php version
    direccion_comp: Joi.string().optional(), //not used anymore in the javascript version. only used in the php version
    direccion_bairro: Joi.string().optional(), //not used anymore in the javascript version. only used in the php version
    direccion_mun: Joi.string().optional(), //not used anymore in the javascript version. only used in the php version
    direccion_cep: Joi.string().optional(), //not used anymore in the javascript version. only used in the php version
    direccion_UF: Joi.string().optional(), //not used anymore in the javascript version. only used in the php version
    comentarios: Joi.string().optional(),
    foto: Joi.string().optional(),
    disabled: Joi.number().required(),
    id_relationship_ct: Joi.number().integer().required()
    
  }),
  edit_payload: Joi.object({
    id_usuario: Joi.string().optional(),
    id_relationship: Joi.number().integer().min(0).optional(),  //old field in php
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    mobile: Joi.string().optional(),
    profissao: Joi.string().optional(),
    fecha_nascimento: Joi.string().optional(),
    fecha_casamento: Joi.string().optional(),
    direccion: Joi.string().optional(),
    direccion_no: Joi.number().integer().min(0).optional(),
    direccion_comp: Joi.string().optional(),
    direccion_bairro: Joi.string().optional(),
    direccion_mun: Joi.string().optional(),
    direccion_cep: Joi.string().optional(),
    direccion_UF: Joi.string().optional(),
    comentarios: Joi.string().optional(),
    foto: Joi.string().optional(),
    disabled: Joi.number().optional(),
    id_relationship_ct: Joi.number().integer().min(0).optional(),
     }),
  default_payload: Joi.object({
         
    id: Joi.number().integer().min(-1).max(-1).optional(),
    id_usuario: Joi.string().optional(),
    id_relationship: Joi.number().integer().optional(),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    mobile: Joi.string().optional(),
    profissao: Joi.string().optional(),
    fecha_nascimento: Joi.string().optional(),
    fecha_casamento: Joi.string().optional(),
    direccion: Joi.string().optional(),
    direccion_no: Joi.number().integer().min(0).optional(),
    direccion_comp: Joi.string().optional(),
    direccion_bairro: Joi.string().optional(),
    direccion_mun: Joi.string().optional(),
    direccion_cep: Joi.string().optional(),
    direccion_UF: Joi.string().optional(),
    comentarios: Joi.string().optional(),
    foto: Joi.string().optional(),
    disabled: Joi.number().optional(),
    id_relationship_ct: Joi.number().integer().min(0).optional(),
  })
}

 
const data: TableDefinition_t  =  {
  restEndPoint: fieldSchemas.restEndPoint,  
  relationships: fieldSchemas.relationships,
  insert_payload:fieldSchemas.insert_payload,
  edit_payload:fieldSchemas.edit_payload,
  default_payload:fieldSchemas.default_payload,
  rafael:{
      dbSchema : dbSchemas.RAFAEL,
      tableName : tableName,
      name : dbSchemas.RAFAEL+'.'+tableName,
      foreignKey : 'id_usuario',
      primaryKey : 'id',
      userrelationships: { //tcommon_lookup
        the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IUserContact,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.ICommonLookup,
        the_One_primKey: 'id', //table=ttes_user_contact,column=id_relationship_ct', 
        the_R_FK_to_One_Table: 'id_relationship_ct',
      },
      users: { 
        the_R_tableType: {thisTableClass:tableClass.ONE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IUserContact,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IUser,
        the_One_primKey: 'id', 
        the_R_FK_to_One_Table: 'id_usuario',
      },
      addresses:{ 
        the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.IAddress,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IUserContact,
        the_One_primKey: 'id',  
        the_R_FK_to_One_Table: 'id_contact',
      },
      telephones:{ 
        the_R_tableType: {thisTableClass:tableClass.N_TABLE, relationshipWithObjKey:relationshipType.ONE_to_N},
        the_R_tableName: Macfacil.MacFacilTable.ITelephone,
        the_R_primkey:'id',
        the_One_table: Macfacil.MacFacilTable.IUserContact,
        the_One_primKey: 'id',  
        the_R_FK_to_One_Table: 'id_contact',
      }
    },
    fratleste:{
      dbSchema : dbSchemas.FRATLESTE,
      tableName : tableName,
      name : dbSchemas.FRATLESTE+'.'+tableName,
      foreignKey : 'id_usuario',
      primaryKey : 'id',
    }
    

 }

 export default data