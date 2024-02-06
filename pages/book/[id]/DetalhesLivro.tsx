
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchBookDetails } from '../../../src/api'; 
import Navbar from '../../../components/Navbar';
import styles from '../../../styles/detalheslivro.module.css';


interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
}

const DetalhesLivro: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [livro, setLivro] = useState<Livro | null>(null);
  const [searchId, setSearchId] = useState<string>(''); 

  useEffect(() => {
    const fetchLivroDetails = async () => {
      let livroId: number;

      if (searchId) {
        livroId = parseInt(searchId, 10);
      } else if (queryId && typeof queryId === 'string') {
        livroId = parseInt(queryId, 10);
      } else {
        return; 
      }

      try {
        const data = await fetchBookDetails(livroId);
        setLivro(data);
      } catch (error) {
        console.error('Erro ao obter detalhes do livro:', error);
        
      }
    };

    fetchLivroDetails();
  }, [queryId, searchId]);

  const handleSearch = () => {
    router.push(`/book/${searchId}/DetalhesLivro`);
  };

  if (!livro) {
    return (
      <div  >
        <Navbar />
        <hr />
        <h1 className={styles.title}>Pesquisar Livro por ID</h1>
        <label>
          ID do Livro:
          <input className={styles.input} type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </label>
        
      </div>
    );
  }
  return (
    <div>
       <Navbar></Navbar>
      <h1>Detalhes do Livro</h1>
      <h3>{livro.titulo}</h3>
      <p>Autor: {livro.autor}</p>
      <p>Editora: {livro.editora}</p>
      <p>Ano de Publicação: {livro.anoPublicacao}</p>
    </div>
  );
};

export default DetalhesLivro;
