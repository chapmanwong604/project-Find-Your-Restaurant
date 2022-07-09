import Knex, { Knex as KnexType } from 'knex';


let configs = require('./knexfile');
let mode = 'development';
let config = configs[mode];
export let knex: KnexType = Knex(config);
