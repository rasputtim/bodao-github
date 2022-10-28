import * as dbTypes from '../../../database/tables/macfacil/databaseTableTypes.js';
import Handler from '../../../server/routes/handlers/v1/handler.js';
export default class macfacilAPI extends Handler {
    /**
     * get several records from database
     * @param request the request object
     * @param reply  the reply object
     * to filer:
     * add: ?filter[is_part]=false
     * Paging:
     * add ?page[number]=value&page[size]=value
     *
     *   number: can be any positive integer, and defaults to 1.
     *   size: can be any positive integer, and defaults to 10.
     *   size: can be 'total' when there is no pagin and the requester want the tootal amount of records
     *
     */
    static getRecords(request: dbTypes.routeRequest_t): Promise<any>;
    static getRaw(): Promise<any>;
    static getApiEndPoint(endpoint: any): Promise<any>;
}
//# sourceMappingURL=macfacil.d.ts.map