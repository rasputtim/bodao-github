/**
 * Database Table configuration Module for Treasury User Data.
 * @module dbTreasuryUserData
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.ITesUserData;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.ITesUserData,
    relationships: {
        'tusuario': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
        'ttes_user_category': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    }, insert_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        amount1: Joi.number().precision(2).min(0).required(),
        description: Joi.string().optional(),
        id_user: Joi.string().required(),
        id_product: Joi.number().integer().min(-1).optional(),
        id_category: Joi.number().integer().min(-1).required(),
        date: Joi.string().required(),
        id_tes: Joi.number().integer().min(-1).required(),
    }),
    edit_payload: Joi.object({
        amount1: Joi.number().precision(2).min(0).optional(),
        description: Joi.string().optional(),
        id_user: Joi.string().optional(),
        id_product: Joi.number().integer().min(-1).optional(),
        id_category: Joi.number().integer().min(-1).optional(),
        date: Joi.string().optional(),
        id_tes: Joi.number().integer().min(-1).optional(),
    }),
    default_payload: Joi.object({
        id: Joi.number().integer().min(-1).max(-1).optional(),
        amount1: Joi.number().precision(2).min(0).required(),
        description: Joi.string().optional(),
        id_user: Joi.string().optional(),
        id_product: Joi.number().integer().min(-1).optional(),
        id_category: Joi.number().integer().min(-1).optional(),
        date: Joi.string().optional(),
        id_tes: Joi.number().integer().min(-1).optional(),
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
        startbalance: {
            parameters: ['id_User', 'endDate'],
            sql: function (payload) {
                let idUser = payload.id_user;
                let endDate = payload.end_date;
                return `select SUM(amount) as balance FROM (select d.amount1 as ini_amount, c.is_debit as is_debit,
            SUM (
                CASE
                WHEN is_debit = true THEN
                  amount1 * -1
                ELSE
                  amount1
                END
              ) AS amount
            from rafaelloduca.ttes_user_data as d
            INNER JOIN rafaelloduca.ttes_user_category c
            ON d.id_category = c.id
            where  id_user = '${idUser}' 
            and date < '${endDate}'
            GROUP BY d.amount1,c.is_debit) as saldo`;
            }
        },
        balances: {
            paramenters: ['endDate'],
            sql: function (payload) {
                let endDate = payload.end_date;
                return `select u.id,u.name, SUM (data.amount) as balance
          from rafaelloduca.tusuario as u
          inner join
          (select d.id_user,d.amount1 as ini_amount, c.is_debit as is_debit,
          SUM (
              CASE
              WHEN is_debit = true THEN
                amount1 * -1
              ELSE
                amount1
              END
            ) AS amount
          from rafaelloduca.ttes_user_data as d
          INNER JOIN rafaelloduca.ttes_user_category c
          ON d.id_category = c.id
          where d.date < '${endDate}'
          GROUP BY d.amount1,c.is_debit,d.id_user
          ORDER BY d.id_user) as data
          on u.id = data.id_user
          GROUP BY u.id
          ORDER BY u.name`;
            }
        },
        extracts: {
            parameters: ['startDate', 'endDate'],
            sql: function (payload) {
                let startDate = payload.start_date;
                let endDate = payload.end_date;
                return `select d.id as id, d.id_user,u.name as username,d.date as date, c.name as category, c.is_debit as is_debit,
          SUM (
              CASE
              WHEN is_debit = true THEN
                amount1 * -1
              ELSE
                amount1
              END
            ) AS amount
          from rafaelloduca.ttes_user_data as d
          INNER JOIN rafaelloduca.tusuario as u
          ON u.id = d.id_user
          INNER JOIN rafaelloduca.ttes_user_category c
          ON d.id_category = c.id
          where d.date between  '${startDate}' and '${endDate}'
          GROUP BY d.amount1,c.is_debit,d.id_user,d.date, c.name, u.name, d.id
          ORDER BY d.id_user, d.date`;
            }
        },
        userextracts: {
            parameters: ['idUser', 'startDate', 'endDate'],
            sql: function (payload) {
                let idUser = payload.id_user;
                let startDate = payload.start_date;
                let endDate = payload.end_date;
                return `select d.id as id, d.id_user,u.name as username,d.date as date, c.name as category, c.is_debit as is_debit,
          SUM (
              CASE
              WHEN is_debit = true THEN
                amount1 * -1
              ELSE
                amount1
              END
            ) AS amount
          from rafaelloduca.ttes_user_data as d
          INNER JOIN rafaelloduca.tusuario as u
          ON u.id = d.id_user
          INNER JOIN rafaelloduca.ttes_user_category c
          ON d.id_category = c.id
          where d.date between  '${startDate}' and '${endDate}'
          and d.id_user = '${idUser}'
          GROUP BY d.amount1,c.is_debit,d.id_user,d.date, c.name, u.name, d.id
          ORDER BY d.id_user, d.date`;
            }
        },
        users: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITesUserData,
            the_R_primkey: 'id',
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_user'
        },
        tesusercategories: {
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
        foreignKey: 'id_user',
        primaryKey: 'id',
    }
};
export default data;
//# sourceMappingURL=ttes_user_data.db.config.js.map