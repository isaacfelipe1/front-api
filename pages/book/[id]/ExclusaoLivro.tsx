import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchBookDetails, deleteBook } from '../../../src/api';
import Navbar from '../../../components/Navbar';
import styles from '../../../styles/detalheslivro.module.css';


interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
}

const ExclusaoLivro: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [livro, setLivro] = useState<Livro | null>(null);
  const [deleteId, setDeleteId] = useState<string>('');

  const handleFetchLivroDetails = async () => {
    if (deleteId) {
      try {
        const data = await fetchBookDetails(parseInt(deleteId, 10));
        setLivro(data);
      } catch (error) {
        console.error('Erro ao obter detalhes do livro:', error);
      }
    }
  };

  const handleDeleteLivro = async () => {
    if (livro) {
      try {
        await deleteBook(livro.id);
        console.log('Livro excluído com sucesso!');
        router.push('/');
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
      }
    }
  };

  return (
    <div>
        <Navbar></Navbar>
        <hr />
      <h1>Excluir Livro</h1>
      <label className={styles.title}>
        ID do Livro:
        <input className={styles.input} type="text" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
      </label>
      <button type="button" onClick={handleFetchLivroDetails} className={styles.button}>
        Buscar Detalhes do Livro
      </button>

      {livro && (
        <div>
          <p>Detalhes do Livro:</p>
          <p>Título: {livro.titulo}</p>
          <p>Autor: {livro.autor}</p>
          <p>Editora: {livro.editora}</p>
          <p>Ano de Publicação: {livro.anoPublicacao}</p>
          <button className={styles.button} type="button" onClick={handleDeleteLivro} >
            Excluir Livro
          </button>
        </div>
      )}

    
    </div>
  );
};
export default ExclusaoLivro;
