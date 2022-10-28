/**
 * Database Table configuration Module for Telephones.
 * @module dbConfigTelephones
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ITelephone;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.ITelephone,
    relationships: {
        'tusuario': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'tusuario_contact': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'tcompany': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'tvisitor': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        telephone_context: Joi.number().integer().min(-1).required(),
        telephone_type: Joi.number().integer().integer().min(-1).required(),
        telephone: Joi.string().required(),
        creation_date: Joi.string().optional(),
        last_update_date: Joi.string().optional(),
        created_by: Joi.string().required(),
        last_updated_by: Joi.string().optional(),
        id_contact: Joi.string().required(),
        id_country: Joi.number().integer().required()
    }),
    edit_payload: Joi.object({
        telephone_context: Joi.number().integer().min(-1).optional(),
        telephone_type: Joi.number().integer().integer().min(-1).optional(),
        telephone: Joi.string().optional(),
        creation_date: Joi.string().optional(),
        last_update_date: Joi.string().optional(),
        created_by: Joi.string().optional(),
        last_updated_by: Joi.string().optional(),
        id_contact: Joi.string().optional(),
        id_country: Joi.number().integer().optional()
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        telephone_context: Joi.number().integer().min(-1).optional(),
        telephone_type: Joi.number().integer().integer().min(-1).optional(),
        telephone: Joi.string().optional(),
        creation_date: Joi.string().optional(),
        last_update_date: Joi.string().optional(),
        created_by: Joi.string().optional(),
        last_updated_by: Joi.string().optional(),
        id_contact: Joi.string().optional(),
        id_country: Joi.number().integer().optional()
    })
};
const data = {
    restEndPoint: fieldSchemas.restEndPoint,
    relationships: fieldSchemas.relationships,
    insert_payload: fieldSchemas.insert_payload,
    edit_payload: fieldSchemas.edit_payload,
    default_payload: fieldSchemas.default_payload,
    rafael: {
        dbSchema: dbSchemas.RAFAEL,
        tableName: tableName,
        name: dbSchemas.RAFAEL + '.' + tableName,
        primaryKey: 'id',
        foreignKey: 'id_contact',
        //oneTable
        //N_Relationship table with users,user_contact,company,visitor
        //the One tables
        users: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITelephone,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        usercontacts: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITelephone,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IUserContact,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        companies: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ICompany,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.ITelephone,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        visitors: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITelephone,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IVisitor,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        foreignKey: 'id_contact',
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=ttelephone.db.config.js.map