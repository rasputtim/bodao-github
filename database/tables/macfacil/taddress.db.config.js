/**
 * Database Table configuration Module for Addresses.
 * @module dbConfigAdresses
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.IAddress;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.IAddress,
    relationships: {
        'tusuario': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'tusuario_contact': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'tcompany': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'tvisitor': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).required(),
        address_context: Joi.number().integer().min(-1).optional(),
        address_type: Joi.number().integer().min(-1).optional(),
        street: Joi.string().optional(),
        number: Joi.number().integer().min(0).optional(),
        complement: Joi.string().optional(),
        neighbourhood: Joi.string().optional(),
        city: Joi.string().optional(),
        state_province: Joi.string().optional(),
        postal_code: Joi.string().optional(),
        id_country: Joi.number().integer().min(-1).optional(),
        created_by: Joi.string().optional(),
        creation_date: Joi.string().optional(),
        last_updated_by: Joi.string().optional(),
        last_update_date: Joi.string().optional(),
        id_contact: Joi.string().optional()
    }),
    edit_payload: Joi.object({
        address_context: Joi.number().integer().min(-1).optional(),
        address_type: Joi.number().integer().min(-1).optional(),
        street: Joi.string().optional(),
        number: Joi.number().integer().min(0).optional(),
        complement: Joi.string().optional(),
        neighbourhood: Joi.string().optional(),
        city: Joi.string().optional(),
        state_province: Joi.string().optional(),
        postal_code: Joi.string().optional(),
        id_country: Joi.number().integer().min(-1).optional(),
        created_by: Joi.string().optional(),
        creation_date: Joi.string().optional(),
        last_updated_by: Joi.string().optional(),
        last_update_date: Joi.string().optional(),
        id_contact: Joi.string().optional()
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
            the_R_tableType: { thisTableClass: tableClass.ONE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.IAddress,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        usercontacts: {
            the_R_tableType: { thisTableClass: tableClass.ONE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.IAddress,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IUserContact,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        companies: {
            the_R_tableType: { thisTableClass: tableClass.ONE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ICompany,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IAddress,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        visitors: {
            the_R_tableType: { thisTableClass: tableClass.ONE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.IVisitor,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IAddress,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        primaryKey: 'id',
        foreignKey: 'id_contact'
    }
};
export default data;
//# sourceMappingURL=taddress.db.config.js.map