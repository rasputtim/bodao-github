/**
 * Database Table configuration Module for Visitors.
 * @module dbConfigVisitors
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.IVisitor;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.IVisitor,
    relationships: {
        'tcommon_lookup': { thisTableClass: tableClass.ONE_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        phones: Joi.string().optional(),
        name: Joi.string().required(),
        details: Joi.string().optional(),
        id_gender_ct: Joi.number().optional()
    }),
    edit_payload: Joi.object({
        phones: Joi.string().optional(),
        name: Joi.string().optional(),
        details: Joi.string().optional(),
        id_gender_ct: Joi.number().optional()
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        phones: Joi.string().optional(),
        name: Joi.string().optional(),
        details: Joi.string().optional(),
        id_gender_ct: Joi.number().optional()
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
        foreignKey: 'id_visitor',
        primaryKey: 'id',
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        foreignKey: 'id_visitor',
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=tvisitor.db.config.js.map