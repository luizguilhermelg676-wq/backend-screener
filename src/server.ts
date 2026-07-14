import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { analyzeResume } from './aiService.js';

//Inicializa o banco de dadosSQLite local e configura o adaptador
const adapter = new PrismaBetterSqlite3({ url: "prisma/dev.db" });

//Cria a instância única do prisma passando o adaptador
export const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

// Rota de avaliação e gravação no banco de dados
app.post('/evaluate', async (req, res) => {
  try {
    const { name, email, resumeText } = req.body;

    if (!name || !email || !resumeText) {
       res.status(400).json({ error: 'Missing required fields: name, email, or resumeText' });
       return;
    }

    console.log(`Analyzing resume for candidate: ${name}...`);
    
    // Chama a IA do Gemini para gerar a avaliação técnica
    const aiResult = await analyzeResume(resumeText);

    console.log(`Saving candidate ${name} to the database...`);

    // Salva ou atualiza o candidato no banco usando o adaptador
    const savedCandidate = await prisma.candidate.upsert({
      where: { email },
      update: {
        name,
        resumeText,
        score: aiResult.score,
        technicalFit: aiResult.technicalFit,
        recommendedRole: aiResult.recommendedRole
      },
      create: {
        name,
        email,
        resumeText,
        score: aiResult.score,
        technicalFit: aiResult.technicalFit,
        recommendedRole: aiResult.recommendedRole
      }
    });

    // Retorna os dados completos vindos direto do banco de dados (com ID e createdAt!)
    res.json(savedCandidate);

  } catch (error) {
    console.error("Database or Server Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para listar todos os candidatos avaliados salvos no banco
app.get('/candidates', async (req, res) => {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});