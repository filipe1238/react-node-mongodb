# MERN APP

Este projeto possui uma aplicação web desenvolvida com o stack MERN (MongoDB, Express, React e Node.js). A aplicação consiste em um sistema de gerenciamento de usuários, onde é possível realizar operações de CRUD (Create, Read, Update e Delete) para gerenciar os dados dos usuários.

## Features

- [x] Cadastro de usuários
- [x] Listagem de usuários
- [x] Edição de usuários
- [x] Exclusão de usuários
- [x] Testes unitários de backend: `npm run test`
- [x] Testes de sistema de backend: `npm run test`
- [x] Testes de frontend: `npm run cypress:open`


## Installation

1. Clone o repositório.
2. Navegue até o diretório backend: `cd backend`
3. Instale dependências: `npm install`
4. Configure o banco de dados MongoDB e configure a conexão em `backend/src/database/DB.js`
5. Teste a conexão em `backend/helloworld.js`
6. Inicie o servidor backend: `npm start ou npm run start/dev`
7. Navegue até o diretório frontend: `cd frontend`
8. Configure a conexão com o backend, crie um arquivo `.env` na pasta `/frontend` e adicione a variável `VITE_SIMPLE_REST_URL=http://localhost:3000/api/v1`
9. Instale dependências: `npm install`
10. Inicie o servidor frontend: `npm run dev`
11. Acesse a aplicação em `http://localhost:5173/`
12. Usuários para acesso estão disponíveis em `src/users.json`

## Endpoints

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | /api/v1/users | Get all users |
| GET | /api/v1/users/:id | Get a single user |
| POST | /api/v1/users | Create a new user |
| PUT | /api/v1/users/:id | Update a user |
| DELETE | /api/v1/users/:id | Delete a user |

