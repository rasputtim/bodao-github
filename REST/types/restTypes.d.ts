export declare const httpMethods: {
    readonly GET: "GET";
    readonly PUT: "PUT";
    readonly POST: "POST";
    readonly DELETE: "DELETE";
    readonly PATCH: "PATCH";
};
export declare type httpMethods_t = typeof httpMethods[keyof typeof httpMethods];
export declare const routeIdentifier: {
    readonly GET_ALL: "getAllRecords";
    readonly GET_ONE: "getOneRecord";
    readonly ADD_ONE: "insertOneRecord";
    readonly PAT_ONE: "editOneRecord";
    readonly DEL_ONE: "deleteOneRecord";
    readonly GET_ALL_REL: "getAllRelRecords";
    readonly GET_ONE_REL: "getOneRelRecord";
    readonly ADD_ONE_REL: "insertOneRelRecord";
    readonly PAT_ONE_REL: "editOneRelRecord";
    readonly DEL_ONE_REL: "deleteOneRelRecord";
};
export declare type routeIdentifier_t = typeof routeIdentifier[keyof typeof routeIdentifier];
//# sourceMappingURL=restTypes.d.ts.map