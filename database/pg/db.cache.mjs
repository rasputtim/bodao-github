import  InMemoryLRUCache  from "apollo-server-caching";
import DataLoader from "dataloader";

export class SQLCache {
  constructor(cache = new InMemoryLRUCache(), knex) {
    this.cache = cache;
    this.loader = new DataLoader(queries =>
      Promise.all(queries.map(query => knexInstance.raw(query)))
    );
  }

  /**
   * 
   * @param knexThen the knex then chain
   * @param ctx context (this of the caller) the knex querybuilder context
   * @param args 
   */
  async knexPlugin(knexThen, ctx, args) {
    const isSelectStatement = ctx._method === "select";

    //only cache the select statement
    if (isSelectStatement) {
      // Make a cacheKey that is sure to be unique
      const normalizedQuery = ctx.toQuery().replace(/["']/g, "").toLowerCase();
      const cacheKey = `sqlcache:${normalizedQuery}`;
      // Serious shenanigans to support Knex not having plugins
      // if you do not manually call the .then() after saving to cache
      // then the code-level .then()s will fire _first_ and leave you with
      // a potentially different result and then you cache the wrong thing
      // :sadpanda:
      const hasPromiseFn = Boolean(
        args && args[0] && typeof args[0] === "function"
      );
      const promiseChain = hasPromiseFn ? args[0] : value => value;
      const entry = await this.cache.get(cacheKey);
      if (entry) {
        // If there is a cache hit, return it without hitting the DB
        return Promise.resolve(entry).then(promiseChain);
      } else {
        // If there is not a hit, query the DB and cache the result
        return this.loader
          .load(ctx.toQuery())
          .then(({ rows }) => rows)
          .then(result => {
            this.cache.set(cacheKey, result);
            return Promise.resolve(result);
          })
          .then(promiseChain);
      }
    } else { //is not a select 
      return knexThen.apply(ctx, args);
    }
  }
}
