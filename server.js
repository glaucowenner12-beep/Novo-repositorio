const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'loja'
});

db.connect(err => {
    if(err){
        console.error('Erro de conexão:', err.message);
        return;
    }
    console.log('Conectado ao MySQL!');
});

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const produtosRoutes = require('./routes/produtos')(db);
app.use('/', produtosRoutes);

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
