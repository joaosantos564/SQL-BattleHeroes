const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5000;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'battleheroes',
  password: 'ds564',
  port: 5432,
});


app.use(express.json());


// Iniciando o servidor http://localhost:5000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

app.get('/', (req, res) => {
    res.send('a rota esta funcionando✅')
})