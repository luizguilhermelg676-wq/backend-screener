import { useState, useEffect } from 'react';
import { Brain, Send, User, Award, ListFilter } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  score: number;
  technicalFit: string;
  resumeText: string;
  recommendedRole: string;
}

function App() {
  // Estados do Formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeText, setResumeText] = useState('');
  
  // Estados da Aplicação
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const API_URL = 'http://localhost:3000';

  // Buscar todos os candidatos salvos no banco ao abrir a página
  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${API_URL}/candidates`);
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Enviar novo candidato para análise da IA
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !resumeText) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, resumeText }),
      });

      if (!response.ok) throw new Error('Erro na requisição');

      const newCandidate = await response.json();
      
      // Atualiza a lista de candidatos e limpa o formulário
      setCandidates((prev) => [newCandidate, ...prev]);
      setSelectedCandidate(newCandidate); // Mostra o resultado da análise na hora!
      setName('');
      setEmail('');
      setResumeText('');
    } catch (error) {
      alert('Ocorreu um erro ao analisar o currículo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para definir a cor do badge baseado no score
  const getScoreClass = (score: number) => {
    if (score >= 80) return 'badge-high';
    if (score >= 50) return 'badge-mid';
    return 'badge-low';
  };

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Brain size={40} color="#6366f1" />
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>AI Screener</h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Triagem Inteligente de Currículos com IA</p>
        </div>
      </header>

      <main className="app-container">
        {/* COLUNA DA ESQUERDA: Form de Envio */}
        <div className="card">
          <h2><Send size={18} style={{ marginRight: '8px' }} /> Nova Avaliação</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Candidato</label>
              <input 
                type="text" 
                placeholder="Ex: Seu Nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input 
                type="email" 
                placeholder="Ex: seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Texto do Currículo (Resumo Técnico)</label>
              <textarea 
                rows={6}
                placeholder="Cole as experiências e habilidades técnicas do candidato aqui..." 
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Analisando com Inteligência Artificial...' : 'Analisar Currículo'}
            </button>
          </form>
        </div>

        {/* COLUNA DA DIREITA: Histórico e Resultados */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Se houver um candidato selecionado recentemente, exibe a análise detalhada da IA */}
          {selectedCandidate && (
            <div className="card" style={{ borderLeft: '4px solid #222831' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Análise IA de: {selectedCandidate.name}</h3>
                <span className={`badge ${getScoreClass(selectedCandidate.score)}`}>
                  Score: {selectedCandidate.score}/100
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Cargo Sugerido: <strong>{selectedCandidate.recommendedRole}</strong>
              </p>
              <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem' }}>
                <strong>Fit Técnico:</strong> {selectedCandidate.technicalFit}
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)} 
                style={{ marginTop: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: '#334155' }}
              >
                Fechar Análise Detalhada
              </button>
            </div>
          )}

          {/* Lista de candidatos salvos */}
          <div className="card">
            <h2><ListFilter size={18} style={{ marginRight: '8px' }} /> Candidatos Avaliados ({candidates.length})</h2>
            {candidates.length === 0 ? (
              <p style={{ color: '#94a3b8', textAlign: 'center', margin: '2rem 0' }}>
                Nenhum candidato avaliado no banco de dados.
              </p>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {candidates.map((cand) => (
                  <div key={cand.id} className="candidate-item" style={{ cursor: 'pointer' }} onClick={() => setSelectedCandidate(cand)}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={14} color="#94a3b8" /> {cand.name}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{cand.email}</p>
                      <span style={{ fontSize: '0.75rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '4px' }}>
                        <Award size={12} /> {cand.recommendedRole}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className={`badge ${getScoreClass(cand.score)}`}>
                        {cand.score} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;