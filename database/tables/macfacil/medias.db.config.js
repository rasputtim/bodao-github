/**
 * Database Table configuration Module for RolePeopleProject.
 * MEDIAS ARE TREATED BY THE ATTACHMENT ROUTE
* @module dbConfigRolePeopleProject
 * @see module:routes
 */
import Joi from 'joi';
import { dbSchemas, relationshipType, tableClass } from './databaseTableTypes.js';
import * as Macfacil from "./macfacil.model.js";
const tableName = 'tattachment';
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.IAttachment,
    relationships: { 'tconfig': { thisTableClass: tableClass.ONE_TABLE, relationshipWithObjKey: relationshipType.NO_RELATIONSHIP } },
    insert_payload: Joi.object(),
    edit_payload: Joi.object(),
    default_payload: Joi.object()
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
        type: "junction",
        /**  Simulate a M x N Relationship, but it is really a One to One */
        projects: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.RAFAEL + '.' + 'tagenda',
            the_J_tableName: dbSchemas.RAFAEL + '.' + 'tattachment',
            the_J_FK_to_R_table: 'id_ag',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        users: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.RAFAEL + '.' + 'tusuario',
            the_J_tableName: dbSchemas.RAFAEL + '.' + 'tattachment',
            the_J_FK_to_R_table: 'id_usuario',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        roles: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.RAFAEL + '.' + 'tted_data',
            the_J_tableName: dbSchemas.RAFAEL + '.' + 'tattachment',
            the_J_FK_to_R_table: 'id_tes',
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
        // relatedTable1 : dbSchemas.FRATLESTE+'.'+'tusuario',
        //foreignKey1 : 'id_usuario',
        //relatedTable2 : dbSchemas.FRATLESTE+'.'+'tted_data',
        //foreignKey2 : 'id_tes',
        //relatedTable3 : dbSchemas.FRATLESTE+'.'+'tagenda',
        // foreignKey3 : 'id_ag',
        projects: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.FRATLESTE + '.' + 'tagenda',
            the_J_tableName: dbSchemas.FRATLESTE + '.' + 'tattachment',
            the_J_FK_to_R_table: 'id_ag',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        users: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.FRATLESTE + '.' + 'tusuario',
            the_J_tableName: dbSchemas.FRATLESTE + '.' + 'tattachment',
            the_J_FK_to_R_table: 'id_usuario',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        },
        roles: {
            the_R_tableType: { thisTableClass: tableClass.M_TABLE, relationshipWithObjKey: relationshipType.M_to_M },
            the_R_tableName: dbSchemas.FRATLESTE + '.' + 'tted_data',
            the_J_tableName: dbSchemas.FRATLESTE + '.' + 'tattachment',
            the_J_FK_to_R_table: 'id_tes',
            the_J_primKey: 'id',
            the_R_primKey: 'id'
        }
    }
};
export default data;
//# sourceMappingURL=medias.db.config.js.map