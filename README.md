# 🧠 Zara AI Screener — Full Stack AI Resume Evaluator

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/SQLite-074D5B?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

O **Zara AI Screener** é uma aplicação Full Stack de triagem inteligente de currículos. A plataforma permite que recrutadores ou gestores enviem dados de candidatos junto ao texto de seus currículos e obtenham, em tempo real, uma análise técnica aprofundada, pontuação de compatibilidade (score) e sugestão de cargo gerados pela API do **Google Gemini (IA)**.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React** (com **Vite** para inicialização ultra rápida)
- **TypeScript** para tipagem estática e segurança de código
- **Lucide React** para ícones modernos
- **CSS3** responsivo com tema Dark Mode elegante

### **Backend**
- **Node.js** com **Express** e **TypeScript**
- **Google Gen AI SDK** (modelo `gemini-1.5-flash`)
- **Prisma 7 ORM** (utilizando Driver Adapters para SQLite com `better-sqlite3`)
- **SQLite** para persistência leve e ágil de dados
- **CORS** para comunicação segura entre cliente e servidor

---

## 📂 Estrutura do Projeto

O repositório é organizado de forma modular em duas pastas principais:

```text
zara-ai-project/
├── backend/             # API REST, Integração com Gemini IA e Banco Prisma 7
└── frontend/            # SPA em React + TypeScript para interface do usuário