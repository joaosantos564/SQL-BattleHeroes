const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aranhaverso_db',
  password: 'ds564',
  port: 5432,
});

app.use(express.json());

app.get('/herois', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM herois');

        if (result.rowCount == 0) {
            res.json({
                status: 'success',
                message: 'Não há herois cadastrados',
            });
        } else {
          res.json({
            status: 'success',
            message: 'Herois encontrados🕷',
            total: result.rowCount,
            dados: result.rows,
        })
        }
  
        
    } catch (error) {
        console.error('Erro ao buscar herois', error);
        res.status(500).send('Erro ao buscar herois');
    }
  
  });

  app.get('/herois/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const result = await pool.query('SELECT * FROM herois WHERE id=$1', [id]);

        if (result.rowCount == 0) {
            res.json({
                status: 'success',
                message: 'Não há herois cadastrados com esse ID',
            });
        } else {
          res.json({
            status: 'success',
            message: 'Herois encontrados🕷',
            total: result.rowCount,
            dados: result.rows,
        })
        }
  
        
    } catch (error) {
        console.error('Erro ao buscar herois', error);
        res.status(500).send('Erro ao buscar herois');
    }
  
  });

  app.post('/herois', async (req, res) => {
    const { nome, poder, nivel, hp  } = req.body;
    const query = 'INSERT INTO herois (  nome, poder, nivel, hp  ) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nome, poder, nivel, hp ];
  try {
        const result = await pool.query('INSERT INTO herois (  nome, poder, nivel, hp  ) VALUES ($1, $2, $3, $4) RETURNING *', [ nome, poder, nivel, hp]);
        res.status(201).json({
            status: 'success',
            message: 'Herois criado com sucesso🕷',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao inserir heroi', error);
        res.status(500).send('Erro ao inserir heroi');
    }
  });

 app.put('/herois/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, poder, nivel, hp  } = req.body;
    const query = 'UPDATE herois SET nome=$1, poder=$2, nivel=$3, hp=$4  WHERE id=$5';
    const values = [nome, poder, nivel, hp ];
  try {
        const result = await pool.query('UPDATE herois SET nome=$1, poder=$2, nivel=$3, hp=$4  WHERE id=$5', [ nome, poder, nivel, hp, id]);
        res.status(201).json({
            status: 'success',
            message: 'Herois alterado com sucesso🕷',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao inserir Heroi', error);
        res.status(500).send('Erro ao inserir Heroi');
    }
  });

// Iniciando o servidor http://localhost:5000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

app.get('/', (req, res) => {
    res.send('Com grandes poderes, vem grandes responsabilidades🕷🕸')
})