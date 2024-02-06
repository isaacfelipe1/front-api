import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchAluguelDetails } from '../../../src/Aluguel'; 
import Navbar from '../../../components/Navbar';
import styles from '../../../styles/detalheslivro.module.css';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
}

interface Aluguel {
  id: number;
  livroId: number;
  usuarioId: number;
  dataInicio: string;
  dataTermino: string;
  livro: Livro | undefined; 
}

const DetalhesAluguel: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [aluguel, setAluguel] = useState<Aluguel | null>(null);
  const [searchId, setSearchId] = useState<string>('');

  useEffect(() => {
    const fetchAluguelDetailsData = async () => {
      let aluguelId: number;

      if (searchId) {
        aluguelId = parseInt(searchId, 10);
      } else if (queryId && typeof queryId === 'string') {
        aluguelId = parseInt(queryId, 10);
      } else {
        return;
      }

      try {
        const data = await fetchAluguelDetails(aluguelId);
        setAluguel(data as Aluguel);
      } catch (error) {
        console.error('Erro ao obter detalhes do aluguel:', error);
      }
    };

    fetchAluguelDetailsData();
  }, [queryId, searchId]);

  const handleSearch = () => {
    router.push(`/alugueis/${searchId}/DetalhesAluguel`);
  };

  if (!aluguel) {
    return (
      <div>
        <Navbar />
        <hr />
        <h1 className={styles.title}>Pesquisar Aluguel por ID</h1>
        <label>
          ID do Aluguel:
          <input  className={styles.input} type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </label>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Detalhes do Aluguel</h1>
      <p>ID do Aluguel: {aluguel.id}</p>
      <p>ID do Livro: {aluguel.livroId}</p>
      <p>ID do Usuário: {aluguel.usuarioId}</p>
      <p>Data de Início: {aluguel.dataInicio}</p>
      <p>Data de Término: {aluguel.dataTermino}</p>
      {aluguel.livro && (
        <div>
          <h3>{aluguel.livro.titulo}</h3>
          <p>Autor: {aluguel.livro.autor}</p>
          <p>Editora: {aluguel.livro.editora}</p>
          <p>Ano de Publicação: {aluguel.livro.anoPublicacao}</p>
        </div>
      )}
    </div>
  );
};

export default DetalhesAluguel;
