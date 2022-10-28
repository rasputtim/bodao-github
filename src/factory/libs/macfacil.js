var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SQLDBStatus } from '../../../database/pg/db.js';
import Handler from '../../../server/routes/handlers/v1/handler.js';
import macRoutes from '../../../server/routes/macfacil.routes.js';
import Server from '../../../server/server.js';
import sql from './sqlDatabase.js';
const defaultQuery = {
    //'filter[is_public]': 'true',
    sort: 'id'
};
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
    static getRecords(request) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const db = Server.db;
            if (db) {
                const dbStatus = db.status;
                if (dbStatus === SQLDBStatus.CONNECTED) {
                    const defPageParam = {
                        page: {
                            size: 1000,
                            number: 1
                        },
                    };
                    const QueryParams = request.query ? request.query : defPageParam;
                    /**
                     * Check the route to discover what tables will be used in the acl
                     */
                    const myRoute = macRoutes[request.endpoint];
                    //find routes to the same method
                    const theRoute = myRoute.filter((r) => {
                        var _a, _b, _c;
                        return r.method = request.method && ((_c = (_b = (_a = r.options) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.routeIdentifier) === null || _c === void 0 ? void 0 : _c.name) === 'getAllRecords';
                    });
                    let thePath = '';
                    let newPath = '';
                    if (Array.isArray(theRoute) && theRoute.length > 0) {
                        thePath = (_a = theRoute[0]) === null || _a === void 0 ? void 0 : _a.path;
                        //change { schema } to the correct value
                        const reg = /{(.*?)v(.*?)}/i;
                        newPath = thePath.replace(reg, 'v1');
                        const reg2 = /{(.*?)schema(.*?)}/i;
                        newPath = newPath.replace(reg2, request.routeSchema);
                        //change version
                    }
                    else {
                        Promise.resolve(false);
                    }
                    const userId = '11693';
                    let result = yield this._getRecords(db, newPath, QueryParams, userId);
                    if (result) {
                        return Promise.resolve(result);
                    }
                    else {
                        return Promise.resolve({ message: 'Not found' });
                    }
                }
                else
                    return Promise.resolve(false);
            }
            return Promise.resolve(false);
        });
    }
    static getRaw() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = sql.get_user_birthdays_month;
            const db = Server.db;
            if (db && db.status === SQLDBStatus.CONNECTED) {
                let result = yield this._getRawSql(db, query);
                if (result) {
                    return Promise.resolve(result);
                }
                else {
                    return Promise.resolve({ message: 'Not found' });
                }
            }
            else {
                return Promise.resolve(false);
            }
        });
    }
    static getApiEndPoint(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield macfacilAPI.getRaw();
            //return await macfacilAPI.getRecords(endpoint)
        });
    }
}
//# sourceMappingURL=macfacil.js.map