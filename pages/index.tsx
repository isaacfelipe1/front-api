import { useEffect, useState } from 'react';
import { fetchBooks } from '../src/api';
import Navbar from '../components/navbar';
import styles from '../styles/novolivro.module.css';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
}
const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Livro[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <hr />
      <h1>Nossos Livros:</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className={styles.bookContainer}>
            <h3>{book.titulo}</h3>
            <p>Autor: {book.autor}</p>
            <p>Editora: {book.editora}</p>
            <p>Ano de Publicação: {book.anoPublicacao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
