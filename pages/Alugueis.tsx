import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { fetchAlugueisPorUsuario } from '../src/Aluguel';
import styles from '../styles/novolivro.module.css'; 

interface Aluguel {
  id: number;
  livroId: number;
  usuarioId: number;
  dataInicio: string;
  dataTermino: string;
  livro?: {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: number;
  };
}
const Alugueis: React.FC = () => {
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlugueis = async () => {
      try {
        setLoading(true);
        const data = await fetchAlugueisPorUsuario(1); 
        setAlugueis(data);
        setError(null);
      } catch (error) {
        console.error('Erro ao obter aluguéis do usuário:', error);
        setAlugueis([]);
        setError('Erro ao carregar aluguéis do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchAlugueis();
  }, []);

  return (
    <div>
      <Navbar />
      <hr />
      <h1>Meus Aluguéis</h1>
      <div className={styles.container}>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {alugueis.map((aluguel) => (
          <li key={aluguel.id}>
            <h3>{aluguel.livro?.titulo}</h3>
            <p>Data de Início: {aluguel.dataInicio}</p>
            <p>Data de Término: {aluguel.dataTermino}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Alugueis;
