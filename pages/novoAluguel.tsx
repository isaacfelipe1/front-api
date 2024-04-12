import { useState } from 'react';
import { useRouter } from 'next/router';
import { createAluguel } from '../src/Aluguel'; // Ajuste o caminho conforme necessário
import Navbar from '../components/navbar';
import styles from '../styles/novolivro.module.css';
interface CreateAluguelProps {
  livroId: number;
  usuarioId: number;
  dataInicio: string;
  dataTermino: string;
}

const CreateAluguel: React.FC = () => {
  const router = useRouter();
  const [livroId, setLivroId] = useState<number>(0);
  const [usuarioId, setUsuarioId] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataTermino, setDataTermino] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      
      if (!livroId || !usuarioId || !dataInicio || !dataTermino) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      const newAluguel: CreateAluguelProps = {
        livroId,
        usuarioId,
        dataInicio,
        dataTermino,
      };

     
      await createAluguel(newAluguel);
      router.push('/alugueis');
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
      setError('Erro ao criar aluguel. Tente novamente.');
    }
  };

  return (
    <div>
      <Navbar />
      <hr />
      <div className={styles.container}>
      <h1>Criar Novo Aluguel</h1>
      {error && <p>{error}</p>}
      <label>
        ID do Livro:
        <input className={styles.input} type="number" value={livroId} onChange={(e) => setLivroId(Number(e.target.value))} />
      </label>
      <label>
        ID do Usuário:
        <input className={styles.input} type="number" value={usuarioId} onChange={(e) => setUsuarioId(Number(e.target.value))} />
      </label>
      <label>
        Data de Início:
        <input className={styles.input} type="text" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
      </label>
      <label>
        Data de Término:
        <input className={styles.input} type="text" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} />
      </label>
      <button className={styles.button} type="button" onClick={handleSubmit}>
        Criar Aluguel
      </button>
    </div>
    </div>
  );
};

export default CreateAluguel;
