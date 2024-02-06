import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../styles/novolivro.module.css';

const NovoLivro: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const router = useRouter();

  const handleCreateLivro = async () => {
    if (!titulo || !autor || !editora || !anoPublicacao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoLivro = {
      titulo,
      autor,
      editora,
      anoPublicacao: parseInt(anoPublicacao, 10),
    };

    try {
      const response = await fetch('https://localhost:44349/api/Livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoLivro),
      });

      if (response.ok) {
        alert('Livro criado com sucesso!');
        router.push('/');
      } else {
        console.error('Erro ao criar livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <hr />
      <div className={styles.container}>
        <h1>Criar Novo Livro</h1>
        <form>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Autor:</label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Editora:</label>
            <input
              type="text"
              value={editora}
              onChange={(e) => setEditora(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Ano de Publicação:</label>
            <input
              type="text"
              value={anoPublicacao}
              onChange={(e) => setAnoPublicacao(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="button" onClick={handleCreateLivro} className={styles.button}>
            Criar Livro
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoLivro;
