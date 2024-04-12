import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchBookDetails, updateBook } from '../../../src/api'; 
import Navbar from '../../../components/navbar';
import styles from '../../../styles/detalheslivro.module.css';
interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
}
const EdicaoLivro: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [livro, setLivro] = useState<Livro | null>(null);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
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
        if (data) {
          setLivro(data);
          setTitulo(data.titulo);
          setAutor(data.autor);
          setEditora(data.editora);
          setAnoPublicacao(data.anoPublicacao.toString());
        } else {
          console.error('Detalhes do livro não encontrados.');
        }
      } catch (error) {
        console.error('Erro ao obter detalhes do livro:', error);
      }
    };

    fetchLivroDetails();
  }, [queryId, searchId]);

  const handleUpdateLivro = async () => {
    if (livro) {
      const livroAtualizado = {
        ...livro,
        titulo,
        autor,
        editora,
        anoPublicacao: parseInt(anoPublicacao, 10),
      };

      try {
        await updateBook(livroAtualizado);
        alert('Livro atualizado com sucesso!'); 
        router.push('/');
      } catch (error) {
        console.error('Erro ao atualizar livro:', error);
      }
    }
  };

  return (
    <div>
        <Navbar></Navbar>
        <hr />
      <h1>Editar Livro</h1>
      <div>
        <label className={styles.title}>
          Pesquisar Livro por ID:
          <input className={styles.input} type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </label>
        
      </div>
      {livro && (
        <form>
          <label>
            Título:
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </label>
          <br />
          <label>
            Autor:
            <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
          </label>
          <br />
          <label>
            Editora:
            <input type="text" value={editora} onChange={(e) => setEditora(e.target.value)} />
          </label>
          <br />
          <label>
            Ano de Publicação:
            <input type="text" value={anoPublicacao} onChange={(e) => setAnoPublicacao(e.target.value)} />
          </label>
          <br />
          <button  type="button" onClick={handleUpdateLivro} className={styles.button}>
            Atualizar Livro
          </button>
        </form>
      )}
      <br />
     
    </div>
  );
};

export default EdicaoLivro;
