/**
 * Database Table configuration Module for RolePeopleProject.
 * @module dbConfigRolePeopleProject
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.IRolePeopleProject;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.IRolePeopleProject,
    relationships: {
        'tusuario': { thisTableClass: tableClass.JUNCTION, relationshipWithObjKey: relationshipType.M_to_M },
        'tproject': { thisTableClass: tableClass.JUNCTION, relationshipWithObjKey: relationshipType.M_to_M },
        'trole': { thisTableClass: tableClass.JUNCTION, relationshipWithObjKey: relationshipType.M_to_M }
        //todo: add the other tables
    },
    insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        id_user: Joi.string().required(),
        id_project: Joi.number().integer().min(1).required(),
        id_role: Joi.number().integer().min(1).required(),
    }),
    edit_payload: Joi.object(),
    default_payload: Joi.object({
        id: Joi.number().integer().optional(),
        id_user: Joi.string().optional(),
        id_project: Joi.number().integer().min(1).optional(),
        id_role: Joi.number().integer().min(1).optional(),
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
        //type: "junction",
        /**  M x N Relationships */
        projects: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.RAFAEL + '.' + 'tproject',
            the_J_tableName: dbSchemas.RAFAEL + '.' + 'trole_people_project',
            the_J_FK_to_R_table: 'id_project',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        users: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.RAFAEL + '.' + 'tusuario',
            the_J_tableName: dbSchemas.RAFAEL + '.' + 'trole_people_project',
            the_J_FK_to_R_table: 'id_user',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        roles: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.RAFAEL + '.' + 'trole',
            the_J_tableName: dbSchemas.RAFAEL + '.' + 'trole_people_project',
            the_J_FK_to_R_table: 'id_role',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        primaryKey: 'id',
        type: "junction",
        projects: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.FRATLESTE + '.' + 'tproject',
            the_J_tableName: dbSchemas.FRATLESTE + '.' + 'trole_people_project',
            the_J_FK_to_R_table: 'id_project',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        users: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.FRATLESTE + '.' + 'tusuario',
            the_J_tableName: dbSchemas.FRATLESTE + '.' + 'trole_people_project',
            the_J_FK_to_R_table: 'id_user',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        roles: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.FRATLESTE + '.' + 'trole',
            the_J_tableName: dbSchemas.FRATLESTE + '.' + 'trole_people_project',
            the_J_FK_to_R_table: 'id_role',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        }
    }
};
export default data;
//# sourceMappingURL=trole_people_project.db.config.js.map