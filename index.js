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


//em caso de empate o nmr1 vence!
 async function calcularVencedor(heroi01_id, heroi02_id) {
     const hero1 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi01_id]);
     const hero2 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi02_id]);

     const totalDanoHero1 = hero1.rows[0].dano * hero1.rows[0].nivel;
     const totalDanoHero2 = hero2.rows[0].dano * hero2.rows[0].nivel;

     const hpHero1 = hero1.rows[0].hp;
     const hpHero2 = hero2.rows[0].hp;

     if (totalDanoHero1 > hpHero2) {
         return heroi01_id;
     } else if (totalDanoHero2 > hpHero1) {
         return heroi02_id;
     } else {
         const danoTotalHero1 = totalDanoHero1 + hpHero1;
         const danoTotalHero2 = totalDanoHero2 + hpHero2;

         if (danoTotalHero1 > danoTotalHero2) {
             return heroi01_id;
         } else if (danoTotalHero2 > danoTotalHero1) {
             return heroi02_id;
         } else {
             
             return null;
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
    const { nome, poder, dano, nivel, hp  } = req.body;
    const query = 'INSERT INTO herois (  nome, poder, dano, nivel, hp  ) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, poder, dano, nivel, hp ];
  try {
        const result = await pool.query('INSERT INTO herois (  nome, poder, dano, nivel, hp  ) VALUES ($1, $2, $3, $4, $5) RETURNING *', [ nome, poder, dano, nivel, hp]);
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

  app.delete('/herois/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM herois WHERE id=$1';
  
    try {
        const result = await pool.query('DELETE FROM herois WHERE id=$1', [id]);
        res.json({
            status: 'success',
            message: 'Heroi deletado com sucesso🕷',
        });
    } catch (error) {
        console.error('Erro ao deletar heroi', error);
        res.status(500).send('Erro ao deletar Heroi');
    }
  });

 app.put('/herois/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, poder, dano, nivel, hp  } = req.body;
    const query = 'UPDATE herois SET nome=$1, poder=$2, dano=$3 nivel=$4, hp=$5  WHERE id=$6';
    const values = [nome, poder, dano, nivel, hp ];
  try {
        const result = await pool.query('UPDATE herois SET nome=$1, poder=$2, dano=$3 nivel=$4, hp=$5  WHERE id=$6', [ nome, poder, dano, nivel, hp, id]);
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



app.get('/batalhas/:heroi01_id/:heroi02_id', async (req, res) => {
    const { heroi01_id, heroi02_id } = req.params;

    try {
        const vencedorId = await calcularVencedor(heroi01_id, heroi02_id);

        await pool.query('INSERT INTO batalhas (heroi01_id, heroi02_id, vencedor_id) VALUES ($1, $2, $3)', [heroi01_id, heroi02_id, vencedorId]);

        res.json({
    status: 'success',
    message: `O herói vencedor é o: ${vencedorId}`,
    vencedor_id: vencedorId,
        });
    } catch (error) {
        console.error('Erro ao execultar batalhas', error);
        res.status(500).send('Erro ao deletar Heroi');
    }
  });


  app.get('/batalhas', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM batalhas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/batalhas/herois', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT batalhas.id, heroi01_id, heroi02_id, vencedor_id, herois.nome as nomeVencedor, herois.poder as poderVencedor, herois.dano as danoVencedor, herois.nivel as nivelVencedor, herois.hp as hpVencedor FROM batalhas INNER JOIN herois ON batalhas.vencedor_id = herois.id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/batalhas/herois/nome/:nome', async (req, res) => {
    const { nome } = req.params

    try {
        const result = await pool.query('SELECT b.id as batalhas, heroi01.nome AS nome_heroi_1, heroi01.poder AS poder_heroi_1, heroi02.nome AS nome_heroi_2, heroi02.poder AS poder_heroi_2, vencedor.nome AS nome_vencedor FROM batalhas b JOIN herois heroi01 ON b.heroi01_id = heroi01.id JOIN herois heroi02 ON b.heroi02_id = heroi02.id LEFT JOIN herois vencedor ON b.vencedor_id = vencedor.id WHERE heroi01.nome = $1 OR heroi01.nome = $1',
    [nome]);
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