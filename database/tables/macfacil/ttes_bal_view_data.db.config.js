/**
 * Database Table configuration Module for Treasury Balance View Data.
 * @module dbConfigTesBalViewData
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ITesBalViewData;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.ITesBalViewData,
    relationships: {
        'ttes_bal_sector': { thisTableClass: tableClass.JUNCTION, relationshipWithObjKey: relationshipType.M_to_M },
        'ttes_bal_division': { thisTableClass: tableClass.JUNCTION, relationshipWithObjKey: relationshipType.M_to_M },
        'ttes_balance': { thisTableClass: tableClass.JUNCTION, relationshipWithObjKey: relationshipType.M_to_M }
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        id_bal_final: Joi.number().integer().min(-1).required(),
        id_division: Joi.number().integer().min(-1).required(),
        id_sector: Joi.number().integer().min(-1).required(),
        amount: Joi.number().precision(2)
    }),
    edit_payload: Joi.object({
        id_bal_final: Joi.number().integer().min(-1).optional(),
        id_division: Joi.number().integer().min(-1).optional(),
        id_sector: Joi.number().integer().min(-1).optional(),
        amount: Joi.number().precision(2).min(0).optional()
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        id_bal_final: Joi.number().integer().min(-1).optional(),
        id_division: Joi.number().integer().min(-1).optional(),
        id_sector: Joi.number().integer().min(-1).optional(),
        amount: Joi.number().precision(2).optional()
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
        foreignKey: 'id_balviewdata',
        primaryKey: 'id',
        tesbalsectors: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: Macfacil.MacFacilTable.ITesBalSector,
            the_J_tableName: Macfacil.MacFacilTable.ITesBalViewData,
            the_J_FK_to_R_table: 'id_sector',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        tesbaldivisions: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: Macfacil.MacFacilTable.ITesBalDivision,
            the_J_tableName: Macfacil.MacFacilTable.ITesBalViewData,
            the_J_FK_to_R_table: 'id_division',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        tesbalances: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: Macfacil.MacFacilTable.ITesBalance,
            the_J_tableName: Macfacil.MacFacilTable.ITesBalViewData,
            the_J_FK_to_R_table: 'id_bal_final',
            the_J_primKey: 'id',
            the_R_primKey: 'id_bal'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        foreignKey: 'id_balviewdata',
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=ttes_bal_view_data.db.config.js.map