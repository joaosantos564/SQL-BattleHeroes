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

async function calcularVencedor(heroi01_id, heroi02_id) {
    const hero1 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi01_id]);
    const hero2 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi02_id]);

    const totalDanoHero1 = hero1.rows[0].dano * hero1.rows[0].nivel;
    const totalDanoHero2 = hero2.rows[0].dano * hero2.rows[0].nivel;

    const hpHero1 = hero1.rows[0].hp;
    const hpHero2 = hero2.rows[0].hp;

    if (totalDanoHero1 >= hpHero2) {
        return heroi01_id;
    } else if (totalDanoHero2 >= hpHero1) {
        return heroi02_id;
    } else {
        const danoTotalHero1 = totalDanoHero1 + hpHero1;
        const danoTotalHero2 = totalDanoHero2 + hpHero2;

        if (danoTotalHero1 > danoTotalHero2) {
            return heroi01_id;
        } else if (danoTotalHero2 > danoTotalHero1) {
            return heroi02_id;
        } else {
            // Se houver um empate na soma de danos, retorna null
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

//   app.get('/batalhas/:heroi01_id/:heroi02_id', async (req, res) => {
//     const { heroi01_id, heroi02_id } = req.params;

//     try {
//         const vencedorId = await calcularVencedor(heroi01_id, heroi02_id);

//         if (vencedorId) {
//             res.json({
//                 status: 'success',
//                 message: `O herói vencedor é o: ${vencedorId}`,
//                 vencedor_id: vencedorId,
//             });
//         } else {
//             res.json({
//                 status: 'success',
//                 message: 'A batalha terminou em empate',
//             });
//         }
//     } catch (error) {
//         console.error('Erro ao calcular vencedor da batalha', error);
//         res.status(500).send('Erro ao calcular vencedor da batalha');
//     }
// });

// app.get('/batalhas/:heroi01_id/:heroi02_id', async (req, res) => {
//     const { heroi01_id, heroi02_id } = req.params;

//     try {
//         const query = 'SELECT vencedor_id, herois1.nome AS nome_heroi1, herois2.nome AS nome_heroi2 FROM batalhas INNER JOIN herois AS herois1 ON batalhas.heroi01_id = herois1.id INNER JOIN herois AS herois2 ON batalhas.heroi02_id = herois2.id WHERE batalhas.heroi01_id = $1 AND batalhas.heroi02_id = $2;', [id];
//         const result = await pool.query(query, [heroi01_id, heroi02_id]);

//         if (result.rowCount > 0) {
//             const vencedor = result.rows[0];
//             res.json({
//                 status: 'success',
//                 message: 'O herói vencedor é o: ${vencedorId}',
//                 vencedor_id: vencedor.id,
//                 vencedor_nome: vencedor.nome,
//             });
//         } else {
//             res.json({
//                 status: 'success',
//                 message: 'A batalha terminou em empate',
//             });
//         }
//     } catch (error) {
//         console.error('Erro ao calcular vencedor da batalha', error);
//         res.status(500).send('Erro ao calcular vencedor da batalha');
//     }
// });

// app.get('/batalhas/:heroi01_id/:heroi02_id', async (req, res) => {
//     const { heroi01_id, heroi02_id } = req.params;

//     try {
//         const vencedorId = await calcularVencedor(heroi01_id, heroi02_id);

//         if (vencedorId) {
//             const query = 'SELECT batalhas.id, hero1_id, hero2_id, winner_id, heroes.name as winner_name, heroes.power as winner_power, heroes.level as winner_level, heroes.hp as winner_hp FROM battles INNER JOIN heroes ON battles.winner_id = heroes.id'';
//             const result = await pool.query(query, [vencedorId]);
            
//             if (result.rowCount > 0) {
//                 const nomeVencedor = result.rows[0].nome_vencedor;
//                 res.json({
//                     status: 'success',
//                     message: `O herói vencedor é: ${nomeVencedor}`,
//                     vencedor_nome: nomeVencedor,
//                 });
//             } else {
//                 res.json({
//                     status: 'success',
//                     message: 'Herói vencedor não encontrado',
//                 });
//             }
//         } else {
//             res.json({
//                 status: 'success',
//                 message: 'A batalha terminou em empate',
//             });
//         }
//     } catch (error) {
//         console.error('Erro ao calcular vencedor da batalha', error);
//         res.status(500).send('Erro ao calcular vencedor da batalha');
//     }
// });

app.get('/batalhas/:heroi01_id/:heroi02_id', async (req, res) => {
    const { heroi01_id, heroi02_id } = req.params;

    try {
        const vencedorId = await calcularVencedor(heroi01_id, heroi02_id);

        await pool.query('INSERT INTO batalhas (heroi01_id, heroi02_id, vencedor_id) VALUES ($1, $2, $3)', [heroi01_id, heroi02_id, vencedorId]);

        //exibe o vencedor (todos os dados) e a mensagem de sucesso de registro

        const { rows } = await pool.query('SELECT * FROM herois WHERE id = $1', [vencedorId]);
        res.json({
    status: 'success',
    message: `O herói vencedor é o: ${vencedorId}`,
    vencedor_id: vencedorId,
        });
    } catch (error) {
        console.error('Erro ao deletar heroi', error);
        res.status(500).send('Erro ao deletar Heroi');
    }
  });

  //
  

// Iniciando o servidor http://localhost:5000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

app.get('/', (req, res) => {
    res.send('Com grandes poderes, vem grandes responsabilidades🕷🕸')
})