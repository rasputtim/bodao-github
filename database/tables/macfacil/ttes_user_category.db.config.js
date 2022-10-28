/**
 * Database Table configuration Module for Treasury User Categories.
 * @module dbConfigTesUserCategory
 * @see module:routes
 */
import Joi from 'joi';
import { dbSchemas, relationshipType, tableClass } from './databaseTableTypes.js';
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ITesUserCategory;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.ITesUserCategory,
    relationships: {
        'ttes_category': { thisTableClass: tableClass.ONE_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'ttes_user_data': { thisTableClass: tableClass.ONE_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N }
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        name: Joi.string().required(),
        code: Joi.number().integer().required(),
        description: Joi.string().required(),
        icon: Joi.string().required(),
        parent: Joi.number().integer().required(),
        valuable: Joi.number().integer().required(),
        is_debit: Joi.number().integer().required(),
    }),
    edit_payload: Joi.object({
        name: Joi.string().optional(),
        code: Joi.number().integer().optional(),
        description: Joi.string().optional(),
        icon: Joi.string().optional(),
        parent: Joi.number().integer().optional(),
        valuable: Joi.number().integer().optional(),
        is_debit: Joi.number().integer().optional(),
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        name: Joi.string().optional(),
        code: Joi.number().integer().optional(),
        description: Joi.string().optional(),
        icon: Joi.string().optional(),
        parent: Joi.number().integer().optional(),
        valuable: Joi.number().integer().optional(),
        is_debit: Joi.number().integer().optional(),
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
        foreignKey: 'id_usercat',
        primaryKey: 'id',
        tesuserdata: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITesUserData,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.ITesUserCategory,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_category'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        foreignKey: 'id_usercat',
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=ttes_user_category.db.config.js.map