<<<<<<< HEAD
📘 README — Sistema Web de Atendimentos
📌 Visão Geral
=======
# 📘 README — Sistema Web de Atendimentos

## 📌 Visão Geral
>>>>>>> 3a83ef1 (docs: adiciona README do projeto)

Sistema Web simples para gerenciamento de atendimentos, com backend em Node.js e persistência em SQLite.
O sistema permite criar, listar, editar e excluir atendimentos, seguindo arquitetura em camadas (rotas, controllers e models).

Projeto desenvolvido com foco em aprendizado prático, sem uso de frameworks mágicos.

🧱 Arquitetura

O projeto segue separação clara de responsabilidades:

Frontend: HTML, CSS e JavaScript puro

Backend: Node.js + Express

Persistência: SQLite

Controle de versão: Git + GitHub

Fluxo:

Rotas → Controllers → Models → Banco de Dados

⚙️ Funcionalidades

Criar atendimento

Listar atendimentos

Editar atendimento

Excluir atendimento

Persistência em banco SQLite

Validação de dados

Retornos HTTP adequados (200, 201, 204, 400, 404)

🛠️ Tecnologias Utilizadas

Node.js

Express

SQLite

JavaScript

Git

🚀 Como Executar o Projeto
Pré-requisitos

Node.js instalado

Passos
# clonar o repositório
git clone <URL_DO_REPOSITORIO>

# entrar no backend
cd backend

# instalar dependências
npm install

# iniciar o servidor
node server.js


O servidor será iniciado em:

http://localhost:3000

🔗 Endpoints Principais
Criar atendimento
POST /api/atendimentos


Body:

{
  "titulo": "Exemplo",
  "descricao": "Descrição do atendimento"
}

Listar atendimentos
GET /api/atendimentos

Editar atendimento
PUT /api/atendimentos/:id

Excluir atendimento
DELETE /api/atendimentos/:id

📂 Estrutura de Pastas (Backend)
backend/
 ├── src/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── database/
 │   └── app.js
 └── server.js
database/
 └── database.sqlite

🎯 Objetivo Acadêmico

Este projeto serve como base para:

disciplinas de Engenharia de Software

Banco de Dados

Programação para Internet

possível evolução para TCC

📄 Licença
Projeto de uso educacional.
