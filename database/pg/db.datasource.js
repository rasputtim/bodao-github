import KnexQueryBuilder from "knex/lib/query/querybuilder.js";
import { SQLCache } from "./db.cache.mjs";

export default class SQLDataSource {
  initialize(config) {
    this.context = config.context;
    const dbCache = new SQLCache(config.cache);

    // This is an ugly hack to compensate for Knex not having plugins yet
    const knexThen = KnexQueryBuilder.prototype.then;
    KnexQueryBuilder.prototype.then = function() {
      return dbCache.knexPlugin(knexThen, this, arguments);
    };
    this.knex.queryBuilder = () => new KnexQueryBuilder(this.knex.client);

    this.db = this.knex;
  }
}
