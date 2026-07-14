# AI Candidate Screener - Backend

Um microsserviço moderno de triagem de currículos que utiliza Inteligência Artificial para avaliar perfis técnicos e persistir as análises em um banco de dados local.

## Tecnologias Utilizadas
- **Node.js** & **TypeScript**
- **Express** (API REST)
- **Google Gemini API** (Integração com o modelo `gemini-3.5-flash` para análise com IA)
- **Prisma 7** (ORM moderno com Driver Adapters)
- **SQLite** (Persistência leve local com `better-sqlite3`)

## Como rodar o projeto localmente

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Renomeie o arquivo `.env.example` para `.env` e adicione sua `GEMINI_API_KEY`.
4. Execute as migrations do banco de dados:
   ```bash
   npx prisma migrate dev
