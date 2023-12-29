const sql = require('mssql');

// Configuración de la conexión
const config = {
  user: 'dwadmin',
  password: 'M7Z5jn5JBD6A',
  server: 'asasrv0100.database.windows.net',
  database: 'asabd0100',
  options: {
    encrypt: true, // Para habilitar la encriptación
  },
};

// Función para probar la conexión
async function probarConexion() {
  try {
    // Conectarse a la base de datos
    await sql.connect(config);

    console.log('Conexión exitosa');

    // Realizar una consulta simple
    const result = await sql.query`select * from dev_asa.d_cliente`;

    console.log('Resultado de la consulta:', result.recordset);

  } catch (error) {
    console.error('Error al conectar o consultar:', error.message);
  } finally {
    // Cerrar la conexión
    await sql.close();
  }
}

// Llamar a la función
probarConexion();