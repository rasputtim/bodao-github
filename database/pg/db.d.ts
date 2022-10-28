import SQLDataSource from "./db.datasource.js";
export declare const SQLDBStatus: {
    readonly CONNECTED: 1;
    readonly DISCONNECTED: 2;
    readonly ERRORED: 3;
    readonly UNKNOWN: 8;
};
export declare type SQLDBStatus_t = typeof SQLDBStatus[keyof typeof SQLDBStatus];
export default class Database {
    static Knex: null;
    static Objective: null;
    theServer: any;
    Knex: any;
    private static _sqlDdatabaseStatus;
    /**
     *
     * @param param0 server dependency injection from awilix. the http server from hapi. to use the server logging system
     */
    constructor({ server }: {
        server: any;
    });
    get status(): SQLDBStatus_t;
    static set status(v: SQLDBStatus_t);
    /**
     * extend the knex query builder with the cache method
     */
    initCache(databaseObj: any): void;
    /**
     * todo implement it
     */
    clearCache(): void;
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
    add_database_debug_trace($sql?: string, $result?: boolean, $affected?: boolean, $extra?: boolean): void;
    /**
     * Error handler function when an SQL error is triggered.
     *
     * A query-error event is fired when an error occurs when running a query,
     * providing the error object and data about the query, including the
     * connection's __knexUid / __knexTxId properties and any other information
     * about the query as described in toSQL. Useful for logging all query
     * errors throughout your application.
     */
    sql_error_handler(): void;
}
/**
 * todo: need to text this approach to cache
 */
export declare class ThingsDB extends SQLDataSource {
    Knex: any;
    constructor();
    getThing({ id }: {
        id: any;
    }): any;
}
//# sourceMappingURL=db.d.ts.map