import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchAluguelDetails, deleteAluguel } from '../../../src/Aluguel';
import Navbar from '../../../components/navbar';
import styles from '../../../styles/detalheslivro.module.css';

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

const ExclusaoAluguel: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [aluguel, setAluguel] = useState<Aluguel | null>(null);
  const [searchId, setSearchId] = useState<string>(queryId?.toString() || '');

  useEffect(() => {
    const fetchAluguelData = async () => {
      if (searchId) {
        const aluguelId = parseInt(searchId, 10);
        try {
          const data = await fetchAluguelDetails(aluguelId);
          setAluguel(data || null);
        } catch (error) {
          console.error('Erro ao obter detalhes do aluguel:', error);
        }
      }
    };

    fetchAluguelData();
  }, [searchId]);

  const handleDeleteAluguel = async () => {
    if (aluguel) {
      try {
        await deleteAluguel(aluguel.id);
       
        router.push('/alugueis');
      } catch (error) {
        
      }
    }
  };

  return (
    <div>
      <Navbar />
      <hr />
      <h1 className={styles.title}>Excluir Aluguel</h1>
      <label>
        Pesquisar Aluguel por ID:
        <input className={styles.input}
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </label>
      {aluguel && (
        <>
          <p>ID do Aluguel: {aluguel.id}</p>
          <button onClick={handleDeleteAluguel}>Excluir Aluguel</button>
        </>
      )}
    </div>
  );
};

export default ExclusaoAluguel;
