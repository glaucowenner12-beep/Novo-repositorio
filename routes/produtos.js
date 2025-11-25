const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        const busca = req.query.busca || '';
        let sql = 'SELECT * FROM produtos';
        if(busca){
            sql += ` WHERE nome LIKE ? OR categoria LIKE ?`;
            db.query(sql, [`%${busca}%`, `%${busca}%`], (err, results) => {
                if(err) return res.send('Erro ao buscar produtos');
                res.render('home', { produtos: results, busca });
            });
        } else {
            db.query(sql, (err, results) => {
                if(err) return res.send('Erro ao listar produtos');
                res.render('home', { produtos: results, busca: '' });
            });
        }
    });

    router.get('/add', (req, res) => res.render('form', { acao: 'Adicionar' }));

    router.post('/add', (req, res) => {
        const { nome, preco, categoria } = req.body;
        if(!nome || !preco || !categoria){
            return res.send('Preencha todos os campos');
        }
        db.query('INSERT INTO produtos (nome, preco, categoria) VALUES (?, ?, ?)',
            [nome, preco, categoria],
            (err) => {
                if(err) return res.send('Erro ao adicionar produto');
                res.redirect('/');
            }
        );
    });

    router.get('/edit/:id', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
            if(err) return res.send('Erro ao buscar produto');
            if(results.length === 0) return res.send('Produto não encontrado');
            res.render('form', { acao: 'Editar', produto: results[0] });
        });
    });

    router.post('/edit/:id', (req, res) => {
        const { id } = req.params;
        const { nome, preco, categoria } = req.body;
        db.query('UPDATE produtos SET nome=?, preco=?, categoria=? WHERE id=?',
            [nome, preco, categoria, id],
            (err, results) => {
                if(err) return res.send('Erro ao atualizar produto');
                if(results.affectedRows === 0) return res.send('Produto não encontrado');
                res.redirect('/');
            }
        );
    });

    router.get('/delete/:id', (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM produtos WHERE id=?', [id], (err, results) => {
            if(err) return res.send('Erro ao deletar produto');
            if(results.affectedRows === 0) return res.send('Produto não encontrado');
            res.redirect('/');
        });
    });

    return router;
};
