const { Pool } = require('pg');
const { config } = require('../config/config');

//protejo las credenciales de la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


//con pool de conexiones se puede hacer varias consultas a la vez y no se bloquea
const pool = new Pool({ connectionString: URI});

module.exports = pool;
