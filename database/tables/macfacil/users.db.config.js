/**
 * Database Table configuration Module for Users.
 * @module dbConfigUsers
 * @see module:routes
 */
import Joi from "joi";
import { dbSchemas, relationshipType, tableClass } from "./databaseTableTypes.js";
import * as Macfacil from "./macfacil.model.js";
const tableName = Macfacil.MacFacilTable.IUser;
export const fieldSchemas = {
    restEndPoint: Macfacil.MacFacilEndPoint.IUser,
    relationships: {
        'tusuario': { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
    }, insert_payload: Joi.object({
        id: Joi.string().required(),
        id_status: Joi.number().integer(),
        name: Joi.string(),
        password: Joi.string(),
        profissao: Joi.string(),
        comentarios: Joi.string().optional(),
        fecha_registro: Joi.string(),
        fecha_nascimento: Joi.string(),
        fecha_iniciacao: Joi.string(),
        fecha_elevacao: Joi.string(),
        fecha_exaltacao: Joi.string(),
        fecha_instalacao: Joi.string(),
        direccion: Joi.string(),
        direccion_rua: Joi.string(),
        direccion_no: Joi.number().integer(),
        direccion_comp: Joi.string(),
        direccion_bairro: Joi.string(),
        direccion_mun: Joi.string(),
        direccion_cep: Joi.string(),
        direccion_UF: Joi.string(),
        grau: Joi.number().integer().required(),
        telefono: Joi.string(),
        telefono2: Joi.string(),
        telefono3: Joi.string(),
        nivel: Joi.number().integer(),
        avatar: Joi.string(),
        foto: Joi.string().optional(),
        lang: Joi.string(),
        pwdhash: Joi.string().optional(),
        disabled: Joi.number().integer(),
        id_company: Joi.number().integer(),
        id_comp_ini: Joi.number().integer(),
        id_comp_ele: Joi.number().integer(),
        id_comp_exa: Joi.number().integer(),
        simple_mode: Joi.number().integer(),
        force_change_pass: Joi.number().integer(),
        last_pass_change: Joi.string(),
        last_failed_login: Joi.string(),
        failed_attempt: Joi.number().integer(),
        login_blocked: Joi.number().integer(),
        num_employee: Joi.string().optional(),
        enable_login: Joi.number().integer(),
        location: Joi.string(),
        founder: Joi.number().integer(),
        id_status_ct: Joi.number().integer(),
        id_degree_ct: Joi.number().integer(),
        is_paying_user: Joi.boolean()
    }),
    edit_payload: Joi.object({
        id_status: Joi.number().integer().optional(),
        name: Joi.string().optional(),
        password: Joi.string().optional(),
        profissao: Joi.string().optional(),
        comentarios: Joi.string().optional(),
        fecha_registro: Joi.string().optional(),
        fecha_nascimento: Joi.string().optional(),
        fecha_iniciacao: Joi.string().optional(),
        fecha_elevacao: Joi.string().optional(),
        fecha_exaltacao: Joi.string().optional(),
        fecha_instalacao: Joi.string().optional(),
        direccion: Joi.string().optional(),
        direccion_rua: Joi.string().optional(),
        direccion_no: Joi.number().integer().optional(),
        direccion_comp: Joi.string().optional(),
        direccion_bairro: Joi.string().optional(),
        direccion_mun: Joi.string().optional(),
        direccion_cep: Joi.string().optional(),
        direccion_UF: Joi.string().optional(),
        grau: Joi.number().integer().optional(),
        telefono: Joi.string().optional(),
        telefono2: Joi.string().optional(),
        telefono3: Joi.string().optional(),
        nivel: Joi.number().integer().optional(),
        avatar: Joi.string().optional(),
        foto: Joi.string().optional(),
        lang: Joi.string().optional(),
        pwdhash: Joi.string().optional(),
        disabled: Joi.number().integer().optional(),
        id_company: Joi.number().integer().optional(),
        id_comp_ini: Joi.number().integer().optional(),
        id_comp_ele: Joi.number().integer().optional(),
        id_comp_exa: Joi.number().integer().optional(),
        simple_mode: Joi.number().integer().optional(),
        force_change_pass: Joi.number().integer().optional(),
        last_pass_change: Joi.string().optional(),
        last_failed_login: Joi.string().optional(),
        failed_attempt: Joi.number().integer().optional(),
        login_blocked: Joi.number().integer().optional(),
        num_employee: Joi.string().optional(),
        enable_login: Joi.number().integer().optional(),
        location: Joi.string().optional(),
        founder: Joi.number().integer().optional(),
        id_status_ct: Joi.number().integer().optional(),
        id_degree_ct: Joi.number().integer().optional(),
        is_paying_user: Joi.boolean().optional()
    }),
    default_payload: Joi.object({
        id_status: Joi.number().integer(),
        name: Joi.string(),
        password: Joi.string(),
        profissao: Joi.string(),
        comentarios: Joi.string(),
        fecha_registro: Joi.string(),
        fecha_nascimento: Joi.string(),
        fecha_iniciacao: Joi.string(),
        fecha_elevacao: Joi.string(),
        fecha_exaltacao: Joi.string(),
        fecha_instalacao: Joi.string(),
        direccion: Joi.string(),
        direccion_rua: Joi.string(),
        direccion_no: Joi.number().integer(),
        direccion_comp: Joi.string(),
        direccion_bairro: Joi.string(),
        direccion_mun: Joi.string(),
        direccion_cep: Joi.string(),
        direccion_UF: Joi.string(),
        grau: Joi.number().integer(),
        telefono: Joi.string(),
        telefono2: Joi.string(),
        telefono3: Joi.string(),
        nivel: Joi.number().integer(),
        avatar: Joi.string(),
        foto: Joi.string(),
        lang: Joi.string(),
        pwdhash: Joi.string(),
        disabled: Joi.number().integer(),
        id_company: Joi.number().integer(),
        id_comp_ini: Joi.number().integer(),
        id_comp_ele: Joi.number().integer(),
        id_comp_exa: Joi.number().integer(),
        simple_mode: Joi.number().integer(),
        force_change_pass: Joi.number().integer(),
        last_pass_change: Joi.string(),
        last_failed_login: Joi.string(),
        failed_attempt: Joi.number().integer(),
        login_blocked: Joi.number().integer(),
        num_employee: Joi.string(),
        enable_login: Joi.number().integer(),
        location: Joi.string(),
        founder: Joi.number().integer(),
        id_status_ct: Joi.number().integer(),
        id_degree_ct: Joi.number().integer(),
        is_paying_user: Joi.boolean()
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
        foreignKey: 'id_usuario',
        primaryKey: 'id',
        // Relationships 1 to N
        usercontacts: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.IUserContact,
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_usuario'
        },
        telephones: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITelephone,
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        addresses: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.IAddress,
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        }
    },
    fratleste: {
        dbSchema: dbSchemas.FRATLESTE,
        tableName: tableName,
        name: dbSchemas.FRATLESTE + '.' + tableName,
        the_R_FK_to_One_Table: 'id_usuario',
        foreignKey: 'id_usuario',
        primaryKey: 'id',
        // Relationships 1 to N
        usercontacts: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.IUserContact,
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_usuario'
        },
        telephones: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.ITelephone,
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        },
        addresses: {
            the_R_tableType: { thisTableClass: tableClass.N_TABLE, relationshipWithObjKey: relationshipType.ONE_to_N },
            the_R_tableName: Macfacil.MacFacilTable.IAddress,
            the_One_table: Macfacil.MacFacilTable.IUser,
            the_One_primKey: 'id',
            the_R_FK_to_One_Table: 'id_contact'
        }
    }
};
export default data;
//# sourceMappingURL=users.db.config.js.map