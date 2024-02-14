const { Client } = require('pg');

async function getUsers() {
  // Configuración de la conexión a la base de datos
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'my_store',
    password: 'postgres',
    port: 5432, // Puerto por defecto de PostgreSQL
  });

  // Conectar a la base de datos
  client.connect()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err))
    .finally(() => client.end()); // Cierra la conexión al finalizar

  // Ejemplo de consulta a la base de datos
  const rspta = await client.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err);
    } else {
      console.log('Resultado de la consulta:', res.rows[0]);
    }
  });

  return rspta;
}


module.exports = getUsers;
