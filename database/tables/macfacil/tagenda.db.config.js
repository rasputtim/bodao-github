/**
 * Database Table configuration Module for Agendas.
 * @module dbConfigAgendas
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ISchedule;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.ISchedule,
    relationships: { 'tusuario': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N } },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        timestamp: Joi.string().required(),
        id_user: Joi.string().required(),
        public: Joi.number().integer().required(),
        send_email: Joi.number().integer().required(),
        alarm: Joi.number().integer().required(),
        duration: Joi.number().integer().required(),
        title: Joi.string().required(),
        description: Joi.string().optional(),
        id_type_ct: Joi.number().integer().optional(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        all_day: Joi.boolean().optional()
    }),
    edit_payload: Joi.object({
        timestamp: Joi.string().optional(),
        id_user: Joi.string().optional(),
        public: Joi.number().integer().optional(),
        send_email: Joi.number().integer().optional(),
        alarm: Joi.number().integer().optional(),
        duration: Joi.number().integer().optional(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        id_type_ct: Joi.number().integer().optional(),
        start_date: Joi.string().optional(),
        end_date: Joi.string().optional(),
        all_day: Joi.boolean().optional()
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        timestamp: Joi.string().optional(),
        id_user: Joi.string().optional(),
        public: Joi.number().integer().optional(),
        send_email: Joi.number().integer().optional(),
        alarm: Joi.number().integer().optional(),
        duration: Joi.number().integer().optional(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        id_type_ct: Joi.number().integer().optional(),
        start_date: Joi.string().optional(),
        end_date: Joi.string().optional(),
        all_day: Joi.boolean().optional()
    })
};
const data = {
    restEndPoint: fieldSchemas.restEndPoint,
    relationships: fieldSchemas.relationships,
    insert_payload: fieldSchemas.insert_payload,
    edit_payload: fieldSchemas.edit_payload,
    rafael: {
        dbSchema: dbSchemas.RAFAEL,
        tableName: tableName,
        name: dbSchemas.RAFAEL + '.' + tableName,
        primaryKey: 'id',
        foreignKey: 'id_user'
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        primaryKey: 'id',
        foreignKey: 'id_user'
    }
};
export default data;
//# sourceMappingURL=tagenda.db.config.js.map