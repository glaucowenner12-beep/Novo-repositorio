# Loja de Produtos - CRUD em Node.js

## Descrição
Esta é uma aplicação simples em Node.js que realiza operações de **CRUD** (Criar, Ler, Atualizar, Deletar) em uma tabela de produtos usando **MySQL**.  
A interface é feita com **Handlebars**, e o layout é responsivo e limpo.

---

## Estrutura da Pasta

loja-produtos/
│
├─ server.js # Arquivo principal do Node.js
├─ package.json # Lista de dependências
├─ routes/
│ └─ produtos.js # Rotas CRUD
├─ views/
│ ├─ layouts/
│ │ └─ main.handlebars
│ ├─ home.handlebars # Página de listagem de produtos
│ └─ form.handlebars # Formulário de adicionar/editar produtos
├─ public/
│ └─ css/
│ └─ style.css # CSS da aplicação


> **Importante:** a pasta `node_modules` não está incluída. Para instalar as dependências, veja abaixo.

---

## Requisitos

- Node.js instalado  
- MySQL instalado

---

## Instalação

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:
```bash
npm install


Crie o banco de dados loja no MySQL e a tabela produtos:

CREATE DATABASE loja;
USE loja;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100) NOT NULL
);

Executando a aplicação

Inicie o servidor Node.js:

node server.js


Abra o navegador e acesse:

http://localhost:3000

Funcionalidades

Listar produtos em formato de tabela

Adicionar produto

Editar produto

Deletar produto com confirmação

Buscar produtos por nome ou categoria

Observações

Todos os dados são armazenados no MySQL.

Os botões e formulários são estilizados com CSS separado (public/css/style.css).

Caso queira resetar o banco, basta deletar os registros ou recriar a tabela.

Autor

Aluno: Glauco wenner Martins
Disciplina: Programação Web e Mobile.