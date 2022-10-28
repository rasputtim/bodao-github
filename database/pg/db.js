import Knexfunction from 'knex';
import { Config } from '../config/pgconfig.js';
import setupPaginator from '../../server/factory/lib/pagination/paginator.js'; /* add the paginate to the knex prototype*/
import SQLDataSource from "./db.datasource.js";
//import { clearCache } from 'ejs';
//import { env } from './env.mjs';
//import  Objection  from 'objection';
//import dotenvSafe from 'dotenv-safe';
const debugDatabaseQueries = process.env.DEBUG_DATABASE_QUERYS || false;
const enviro = process.env.NODE_ENV || 'development';
//const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD, PG_PORT } = process.env;
const configs = {
    test: {},
    development: {
        client: 'pg',
        connection: {
            database: 'dono',
            user: 'dono',
            password: 'donopasswd',
            host: 'rafaelloduca.org.br',
            port: 5432,
            ssl: false,
            debug: false /*,
            log: {
              warn(message) {
              },
              error(message) {
              },
              deprecate(message) {
              },
              debug(message) {
              }
            }*/
        },
    }
};
configs.test = configs.development;
const cache = {};
/**
 * Memory size of a object estimation.
 * this may not be accurate, but is a way of estimating the syze of a variable in memory.
 * @param obj the object we want to know its size
 * @param format id we will format size in human readeble format
 */
function memorySizeOf(obj, format = false) {
    var bytes = 0;
    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number':
                    bytes += 8;
                    break;
                case 'string':
                    bytes += obj.length * 2;
                    break;
                case 'boolean':
                    bytes += 4;
                    break;
                case 'object':
                    var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key))
                                continue;
                            sizeOf(obj[key]);
                        }
                    }
                    else
                        bytes += obj.toString().length * 2;
                    break;
            }
        }
        return bytes;
    }
    ;
    function formatByteSize(bytes) {
        if (bytes < 1024)
            return bytes + " bytes";
        else if (bytes < 1048576)
            return (bytes / 1024).toFixed(3) + " KiB";
        else if (bytes < 1073741824)
            return (bytes / 1048576).toFixed(3) + " MiB";
        else
            return (bytes / 1073741824).toFixed(3) + " GiB";
    }
    ;
    if (format)
        return formatByteSize(sizeOf(obj));
    else
        return sizeOf(obj);
}
;
export const SQLDBStatus = {
    CONNECTED: 1,
    DISCONNECTED: 2,
    ERRORED: 3,
    UNKNOWN: 8,
};
export default class Database {
    /**
     *
     * @param param0 server dependency injection from awilix. the http server from hapi. to use the server logging system
     */
    constructor({ server }) {
        this.theServer = server.server;
        this.Knex = Knexfunction(configs[enviro]);
        this.add_database_debug_trace();
        this.sql_error_handler();
        this.initCache(this); //this will not work if this object is not a singleton
        setupPaginator(this.Knex);
        //Objection.Model.knex(this.Knex);
    }
    get status() { return Database._sqlDdatabaseStatus; }
    static set status(v) { Database._sqlDdatabaseStatus = v; }
    /**
     * extend the knex query builder with the cache method
     */
    initCache(databaseObj) {
        /**
          * caching
          * and then you call it like this if you want it from cache:
              ...
  
              const data = await knex('news').where('id', 1).cache()
  
              without cache:
  
              const data = await knex('news').where('id', 1)
  
              (1) when there are some update , or nsert in the related table the cache is cleaned for that table,
  
              so the next queries cn work with upadated data
              (2) If the cache size greaer than 10k clear the less used cachekeys to release memory
  
          */
        Knexfunction.QueryBuilder.extend('cache', function (databaseObj) {
            try {
                const cacheSize = memorySizeOf(cache);
                if (cacheSize > 10000)
                    databaseObj.clearCache();
                const obj = {};
                obj.method = ''; //this.transacting.  this._method;
                obj.table = ''; // this._single.table;
                const normalizedQuery = this.toQuery().replace(/["']/g, "").toLowerCase();
                const cacheKey = normalizedQuery; //`sqlcache:${normalizedQuery}`;
                if (obj.method === 'select') {
                    //if i made insert, delete, update in this table the cache must be released
                    //const cacheKey = this.toString()
                    if (cache.hasOwnProperty(obj.table)) {
                        if (cache[obj.table][cacheKey]) {
                            cache[obj.table][cacheKey].used++;
                            return cache[obj.table][cacheKey];
                        }
                    }
                    const data = this; //await this;
                    obj[cacheKey] = data;
                    obj[cacheKey].used = 0;
                    cache[obj.table] = obj;
                    return data;
                }
                else { //insert, delete, update
                    if (cache.hasOwnProperty(obj.table)) {
                        //clear cache
                        delete cache[obj.table];
                    }
                    const data = this; //await this;
                    return data;
                }
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**
     * todo implement it
     */
    clearCache() {
        //sort by used and remove the less used keys to release space
        this.theServer.logger.error("Clear Cache needs implementation. Cache Size more than 10000");
    }
    /**
     * Add a database query to the debug trace.
     *
     * This functions does nothing if the config['debug'] flag is not set. If a
     * sentence was repeated, then the 'saved' counter is incremented.
     *
     * @param string SQL sentence.
     * @param mixed Query result. On error, error string should be given.
     * @param int Affected rows after running the query.
     * @param mixed Extra parameter for future values.
     **/
    add_database_debug_trace($sql = '', $result = false, $affected = false, $extra = false) {
        if (debugDatabaseQueries) {
            this.Knex.on('query', (queryData) => {
                console.log(queryData);
                let sql = queryData.sql;
                sql = sql.replace(/['"]+/g, '');
                const bindings = queryData.bindings;
                const method = queryData.method;
                const options = queryData.options;
                if (!Config.hasOwnProperty('debug'))
                    return false;
                if (!Config.hasOwnProperty('db_debug'))
                    Config['db_debug'] = new Object();
                if (Config['db_debug'].hasOwnProperty(sql)) {
                    Config['db_debug'][sql]['saved']++;
                    const message = JSON.stringify(Config['db_debug'][sql]);
                    this.theServer.logger.info(message);
                    return;
                }
                const myVar = {};
                myVar['sql'] = sql;
                myVar['result'] = $result;
                myVar['affected'] = $affected;
                myVar['saved'] = 0;
                myVar['extra'] = $extra;
                myVar['bindings'] = queryData.bindings;
                myVar['method'] = queryData.method;
                myVar['options'] = queryData.options;
                Config['db_debug'][sql] = myVar;
                const replacer = function (k, v) {
                    if (v === undefined) {
                        return null;
                    }
                    return v;
                };
                const message = JSON.stringify(myVar, replacer);
                this.theServer.logger.info(message);
            });
            /**
             * A query-response event is fired when a successful query has been run,
             * providing the response of the query and data about the query,
             * including the connection's __knexUid / __knexTxId properties
             * and any other information about the query as described in toSQL,
             * and finally the query builder used for the query.
             */
            this.Knex.on('query-response', (response, queryData, builder) => {
                //console.log( queryData );
                let sql = queryData.sql;
                //in the on 'query'  the sql uses ? and in the response it uses $x. need to replace the $x to ? in order to find the correct query
                sql = sql.replace(/\$(?:[0-9])+/gi, "?");
                sql = sql.replace(/['"]+/g, '');
                const bindings = queryData.bindings;
                const method = queryData.method;
                const options = queryData.options;
                const result = { rowCount: queryData.response.rowCount,
                    fieldsAffected: queryData.response.fields.length };
                if (!Config.hasOwnProperty('debug'))
                    return false;
                if (!Config.hasOwnProperty('db_debug'))
                    Config['db_debug'] = new Object();
                if (Config['db_debug'].hasOwnProperty(sql)) {
                    Config['db_debug'][sql]['saved']++;
                    Config['db_debug'][sql]['result'] = result;
                    const message = JSON.stringify(Config['db_debug'][sql]);
                    this.theServer.logger.info(message);
                    return;
                }
                const myVar = {};
                myVar['sql'] = sql;
                myVar['result'] = result;
                myVar['affected'] = $affected;
                myVar['saved'] = 0;
                myVar['extra'] = $extra;
                Config['db_debug'][sql] = myVar;
                this.theServer.logger.info(Config['db_debug'][sql]);
            });
        }
    }
    /**
     * Error handler function when an SQL error is triggered.
     *
     * A query-error event is fired when an error occurs when running a query,
     * providing the error object and data about the query, including the
     * connection's __knexUid / __knexTxId properties and any other information
     * about the query as described in toSQL. Useful for logging all query
     * errors throughout your application.
     */
    sql_error_handler() {
        /* If debug is activated, this will also show the backtrace */
        // if (debug ($errstr))
        //   return false;
        // if (error_reporting () <= $errno)
        //   return false;
        // echo "<strong>SQL error</strong>: ".$errstr."<br />\n";
        // return true;
        this.Knex.on('query-error', (error, queryData) => {
            console.log(error);
            let sql = queryData.sql;
            sql = sql.replace(/\$(?:[0-9])+/gi, "?");
            sql = sql.replace(/['"]+/g, '');
            const myError = new Object();
            myError.bindings = queryData.bindings;
            myError.method = queryData.method;
            myError.options = queryData.options;
            myError.message = error.message;
            myError.code = error.code;
            myError.severity = error.severity;
            if (!Config.hasOwnProperty('debug'))
                return false;
            if (!Config.hasOwnProperty('db_debug'))
                Config['db_debug'] = new Object();
            if (Config['db_debug'].hasOwnProperty(sql)) {
                Config['db_debug'][sql]['saved']++;
                Config['db_debug'][sql]['error'] = myError;
                this.theServer.logger.error(Config['db_debug'][sql]);
                return;
            }
            const myVar = {};
            myVar['sql'] = sql;
            // myVar['affected'] = $affected;
            myVar['saved'] = 0;
            // myVar['extra'] = $extra;
            myVar['error'] = myError;
            Config['db_debug'][sql] = myVar;
            this.theServer.logger.error(Config['db_debug'][sql]);
        });
    }
}
Database.Knex = null;
Database.Objective = null;
Database._sqlDdatabaseStatus = SQLDBStatus.UNKNOWN;
/**
 * todo: need to text this approach to cache
 */
export class ThingsDB extends SQLDataSource {
    constructor() {
        super();
        /* Add an instance of Knex for the base class to use
        this.knex = Knex({
          client: "pg",
          connection: {
            host: PG_HOST,
            user: PG_USER,
            password: PG_PASSWORD,
            database: PG_DATABASE,
            port: PG_PORT
          }
        });*/
        this.Knex = Knexfunction(configs[enviro]);
    }
    getThing({ id }) {
        return this.db //db is defined in the SQLDataSource Class
            .select()
            .from("things")
            .where({ id });
    }
}
//# sourceMappingURL=db.js.map