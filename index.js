const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

const config = {
  user: 'operador',
  password: 'Palmas2557$.',
  server: 'sbxc-0001-plmvis-snb-asq-01.database.windows.net',
  database: 'SBXC-0001-PLMVIS-SNB-ASDB-01',
};

async function testConnection() {
  try {
    // Conectarse a la base de datos
    await sql.connect(config);
    console.log('Conexión exitosa a la base de datos');

    // Hacer algo con la conexión, como ejecutar una consulta
    const result = await sql.query('SELECT @@VERSION AS version');
    console.log('Versión del servidor SQL:', result.recordset[0].version);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } finally {
    // Cerrar la conexión después de su uso
    await sql.close();
  }
}

//API REPORTES Y SABANAS
app.get('/api/SabanaReportes', async (req, res) => {
  try {
    // Conectarse a la base de datos
    const pool = await sql.connect(config);

    // Consulta SELECT simple (reemplázala con tu propia consulta)
    const result = await pool.request().query('select * from dev_asa.vwSabanasReportes');

    // Enviar los datos como respuesta
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err.message);
    print(res.status)
  }
});

//API REPORTES Y INDICADORES
app.get('/api/ReporteIndicadores', async (req, res) => {
  try {
    // Conectarse a la base de datos
    const pool = await sql.connect(config);

    // Consulta SELECT simple (reemplázala con tu propia consulta)
    const result = await pool.request().query('select * from dev_asa.wReportesIndicadores');

    // Enviar los datos como respuesta
    res.json(result.recordset);
  } catch (err) {
    print(res.status)
    print(error)
    console.error('Error al obtener datos:', err.message);
    res.status(500).send('Error interno del servidor');
  }
});

//API REPORTES Y VARIABLES
app.get('/api/ReporteVariables', async (req, res) => {
  try {
    // Conectarse a la base de datos
    const pool = await sql.connect(config);

    // Consulta SELECT simple (reemplázala con tu propia consulta)
    const result = await pool.request().query('select * from dev_asa.vwReportesVariables');

    // Enviar los datos como respuesta
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err.message);
    res.status(500).send('Error interno del servidor');
  }
});

// Endpoint para la consulta por nombre de reporte
app.get('/api/ListadoSabanaPorNombreReporte/:NombreReporte', async (req, res) => {
  try {
    // Conectarse a la base de datos
    const pool = await sql.connect(config);

    const { NombreReporte } = req.params;

    // Consulta SELECT con parámetro
    const result = await pool.request()
      .input('NombreReporte', sql.VarChar, NombreReporte)
      .query('SELECT * FROM [dbo].[ReportesSabanas] WHERE NombreReporte = @NombreReporte');

    // Enviar los datos como respuesta
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err.message);
    res.status(500).send('Error interno del servidor');
  }
});

// Endpoint para la consulta por nombre de nprinting
app.get('/api/ListadoNprintingPorNombre/:NombrePlantilla', async (req, res) => {
  try {
    // Conectarse a la base de datos
    const pool = await sql.connect(config);

    const { NombrePlantilla } = req.params;

    // Consulta SELECT con parámetro
    const result = await pool.request()
      .input('NombrePlantilla', sql.VarChar, NombrePlantilla)
      .query('SELECT * FROM [dbo].[Temp_Menu_Nprinting] WHERE NombrePlantilla = @NombrePlantilla');

    // Enviar los datos como respuesta
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err.message);
    res.status(500).send('Error interno del servidor');
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});

testConnection();
