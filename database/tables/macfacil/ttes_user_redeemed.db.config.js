import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
/**
 * Database Table configuration Module for User Remido.
 * @module dbConfigUserRemido
 * @see module:routes
 */
const tableName = Macfacil.MacFacilTable.IUserRedeemed;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.IUserRedeemed,
    relationships: {
        'ttes_user_remido': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        id_user: Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        forever: Joi.boolean().required(),
        description: Joi.string().optional(),
        rem_mens: Joi.boolean().required(),
        rem_cap: Joi.boolean().required(),
        rem_mut: Joi.boolean().required(), //NOT NULL,
    }),
    edit_payload: Joi.object({
        id_user: Joi.string().optional(),
        start_date: Joi.string().optional(),
        end_date: Joi.string().optional(),
        forever: Joi.boolean().optional(),
        description: Joi.string().optional(),
        rem_mens: Joi.boolean().optional(),
        rem_cap: Joi.boolean().optional(),
        rem_mut: Joi.boolean().optional(), //NOT NULL,
    }),
    default_payload: Joi.object({
        id_user: Joi.string().optional(),
        start_date: Joi.string().optional(),
        end_date: Joi.string().optional(),
        forever: Joi.boolean().optional(),
        description: Joi.string().optional(),
        rem_mens: Joi.boolean().optional(),
        rem_cap: Joi.boolean().optional(),
        rem_mut: Joi.boolean().optional(), //NOT NULL,
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
        foreignKey: 'id_user',
        primaryKey: 'id',
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        foreignKey: 'id_user',
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=ttes_user_redeemed.db.config.js.map