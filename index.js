const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

const config = {
    user: 'dwadmin',
    password: 'M7Z5jn5JBD6A',
    server: 'asasrv0100.database.windows.net',
    database: 'asabd0100',
};

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
  

  // Inicia el servidor
  app.listen(port, () => {
    console.log(`La API está escuchando en http://localhost:${port}`);
  });

