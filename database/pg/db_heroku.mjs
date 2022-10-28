import Knexfunction from 'knex';
//import { Env } from './env.mjs';
//import  Objection  from 'objection';

const env = process.env.NODE_ENV || 'development';

const enviro =  'development';

const configs = {
  development: {
    client: 'pg',
    connection: {
      database: 'den57cm8t76a52',
      user: 'omeepqhqkpeace',
      password: '959fac24d270906e74f1c6ba0c36aeb13114e9347622bb110467a089659af441',
      host: 'ec2-54-225-119-13.compute-1.amazonaws.com',
      port: 5432,
      ssl: true,
      debug: true,
      log: {
        warn(message) {
        },
        error(message) {
        },
        deprecate(message) {
        },
        debug(message) {
        }
      }
    },
  }
};


configs.test = configs.development;

export class Database{
    static Knex = null;
    static Objective = null;
    constructor (){
       this.Knex = Knexfunction(configs[enviro]);
        //Objection.Model.knex(this.Knex);
    }


}
