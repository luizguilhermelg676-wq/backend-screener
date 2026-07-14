import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializa a API do Google usando a chave salva no .env
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeResume(resumeText: string) {

const model = ai.getGenerativeModel({model: 'gemini-3.5-flash'});

const prompt = `
    You are Zara, an advanced AI Technical Recruiter. Analyze the following candidate's resume text.
    Provide a professional assessment strictly in JSON format. Do not include any markdown formatting like \`\`\`json.
    
    The JSON structure MUST look exactly like this:
    {
      "score": (a number between 0 and 100 based on technical depth and experience),
      "technicalFit": "A concise summary in English explaining the candidate strengths and weaknesses",
      "recommendedRole": "Junior", "Mid", or "Senior"
    }

    Resume text to analyze:
    ${resumeText}
  `;

  try {
    const response = await model.generateContent(prompt);
    const text = response.response.text();

    // Converte a resposta de texto da IA em um objeto JSON real do JavaScript.
    return JSON.parse(text);
    } catch (error) {
      console.error("ERRO REAL DO GEMINI:", error);
    // Caso a chave seja inválida ou dê erro, retorna um padrão para o sistema não quebrar.
    return {
      score: 50,
      technicalFit: "Mock analysis: Please configure a Valid GEMINI_API_KEY in your .env file.",
      recommendedRole: "Junior"
    };
  }
}