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

async function calculoVencedor(heroi1Id, heroi2Id) {
  
    const heroi1 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi1Id]);
    const heroi2 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi2Id]);

    if (heroi1.rows[0].level > heroi2.rows[0].level) {
        return heroi1Id;
    } else if (heroi1.rows[0].level < heroi2.rows[0].level) {
        return heroi2Id;
    } else {

        if (heroi1.rows[0].hp > heroi2.rows[0].hp) {
            return heroi1Id;
        } else if (heroi1.rows[0].hp < heroi2.rows[0].hp) {
            return heroi2Id;
        } else {

            return heroi1Id;
        }
    }
}

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
            message: 'herois encontrados',
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
                message: 'Não há herois cadastrados',
            });
        } else {
          res.json({
            status: 'success',
            message: 'herois encontrados',
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
    const query = 'INSERT INTO bruxos (  nome, poder, nivel, hp  ) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nome, poder, nivel, hp ];
  try {
        const result = await pool.query('INSERT INTO bruxos ( nome, poder, nivel, hp  ) VALUES ($1, $2, $3, $4) RETURNING *', [ nome, poder, nivel, hp]);
        res.status(201).json({
            status: 'success',
            message: 'Heroi inserido com sucesso',
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
            message: 'Bruxo inserido com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao inserir bruxo', error);
        res.status(500).send('Erro ao inserir bruxo');
    }
  });

  app.delete('/herois/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM herois WHERE id=$1';
  
    try {
        const result = await pool.query('DELETE FROM herois WHERE id=$1', [id]);
        res.json({
            status: 'success',
            message: 'Heroi deletado com sucesso',
        });
    } catch (error) {
        console.error('Erro ao deletar heroi', error);
        res.status(500).send('Erro ao deletar Heroi');
    }
  });

  app.get('/herois/nome/:nome', async (req, res) => {
    const { nome } = req.params
  
    try {
        const result = await pool.query('SELECT * FROM herois WHERE nome = $1', [nome]);
  
        if (result.rowCount == 0) {
            return res.status(404).send('heroi não encontrado');
        }
        res.json({
            status: 'success',
            message: 'heroi retornado com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao buscar heroi', error);
        res.status(500).send('Erro ao buscar heroi');
    }
  });

// Iniciando o servidor http://localhost:5000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

app.get('/', (req, res) => {
    res.send('a rota esta funcionando✅')
})