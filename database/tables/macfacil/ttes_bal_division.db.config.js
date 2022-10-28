/**
 * Database Table configuration Module for Treasury Balance Division.
 * @module dbConfigTesBalanceDivision
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ITesBalDivision;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.ITesBalDivision,
    relationships: {
        'tes_bal_view_data': { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M }
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        name: Joi.string().required(),
        description: Joi.string().required()
    }),
    edit_payload: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional()
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        name: Joi.string().optional(),
        description: Joi.string().optional()
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
        foreignKey: 'id_baldivision',
        primaryKey: 'id',
        tesbalviewdata: {
            the_R_tableType: { thisTableClass: tableClass.JUNCTION, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: Macfacil.MacFacilTable.ITesBalViewData,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.ITesBalDivision,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_division'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        foreignKey: 'id_baldivision',
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=ttes_bal_division.db.config.js.map