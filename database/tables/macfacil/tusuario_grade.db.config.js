/**
 * Database Table configuration Module for Workout Sets.
  * DEPRECATED
 * USUARIO STATUS IS MANAGED BY THE COMMON LOOKUP TABLE
 * @module dbConfigWorkoutSets
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ICommonLookup;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.CUserGrade,
    relationships: {
        'tusuario': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    },
    insert_payload: Joi.object({
        id: Joi.number().min(-1).max(-1).integer().optional(),
        table: Joi.string().required().valid('tusuario'),
        column: Joi.string().required().valid('id_grade_ct'),
        name: Joi.string().required(),
        description: Joi.string().required(),
        created_by: Joi.string().required(),
        creation_date: Joi.string().required(),
        last_updated_by: Joi.string().required(),
        last_update_date: Joi.string().required()
    }),
    edit_payload: Joi.object({
        table: Joi.string().optional().valid('tusuario'),
        name: Joi.string().optional(),
        column: Joi.string().optional().valid('id_grade_ct'),
        description: Joi.string().optional(),
        created_by: Joi.string().optional(),
        creation_date: Joi.string().optional(),
        last_updated_by: Joi.string().optional(),
        last_update_date: Joi.string().optional()
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        table: Joi.string().required().valid('tusuario'),
        name: Joi.string().required(),
        column: Joi.string().required().valid('id_grade_ct'),
        description: Joi.string().required(),
        created_by: Joi.string().required(),
        creation_date: Joi.string().optional(),
        last_updated_by: Joi.string().required(),
        last_update_date: Joi.string().optional()
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
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        primaryKey: 'id',
    } //,
    //this is not a junction table.
    //It is just a relationship table with foreign kei
    //workexers: {
    //  the_R_tableName : dbSchema+'.'+'gymeasy_workout_exercises', /**the name of the table with N Records */
    //  the_One_table : dbSchema+'.'+'gymeasy_workout_sets', /** the junction table */
    //  the_One_primKey : 'id', /** the key to get adccess to the related table in the relationship table */
    ////  foreignKey : 'id_workout_exercise' /**the key to access this table in the relationship table*/
    //}
};
export default data;
//# sourceMappingURL=tusuario_grade.db.config.js.map