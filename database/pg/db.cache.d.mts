export class SQLCache {
    constructor(cache: any, knex: any);
    cache: any;
    loader: DataLoader<any, any, any>;
    /**
     *
     * @param knexThen the knex then chain
     * @param ctx context (this of the caller) the knex querybuilder context
     * @param args
     */
    knexPlugin(knexThen: any, ctx: any, args: any): Promise<any>;
}
import DataLoader from "dataloader";
//# sourceMappingURL=db.cache.d.mts.map