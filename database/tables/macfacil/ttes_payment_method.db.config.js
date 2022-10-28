/**
 * Database Table configuration Module for Treasury Payment Methods.
 * @module dbConfigTesPaymentMethods
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ITesPaymentMethod;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.ITesPaymentMethod,
    relationships: {
        'ttes_payment_detail': { thisTableClass: tableClass.ONE_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        name: Joi.string().required(),
        code: Joi.string().required(),
        description: Joi.string().required(),
        icon: Joi.string().required(),
    }),
    edit_payload: Joi.object({
        name: Joi.string().optional(),
        code: Joi.string().optional(),
        description: Joi.string().optional(),
        icon: Joi.string().optional(),
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        name: Joi.string().optional(),
        code: Joi.string().optional(),
        description: Joi.string().optional(),
        icon: Joi.string().optional(),
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
        tespaymentdetails: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITesPaymentDetail,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.ITesPaymentMethod,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_method'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=ttes_payment_method.db.config.js.map