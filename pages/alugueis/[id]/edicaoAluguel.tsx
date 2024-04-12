import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchAluguelDetails, updateAluguel, deleteAluguel } from '../../../src/Aluguel';
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

const EdicaoAluguel: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [aluguel, setAluguel] = useState<Aluguel | null>(null);
  const [searchId, setSearchId] = useState<string>(queryId?.toString() || '');
  const [livroId, setLivroId] = useState<number>(0);
  const [usuarioId, setUsuarioId] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataTermino, setDataTermino] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [autor, setAutor] = useState<string>('');
  const [editora, setEditora] = useState<string>('');
  const [anoPublicacao, setAnoPublicacao] = useState<number>(0);

  useEffect(() => {
    const fetchAluguelData = async () => {
      if (searchId) {
        const aluguelId = parseInt(searchId, 10);
        try {
          const data = await fetchAluguelDetails(aluguelId);
          setAluguel(data || null);
          if (data && data.livro) {
            setLivroId(data.livro.id);
            setUsuarioId(data.usuarioId);
            setDataInicio(data.dataInicio);
            setDataTermino(data.dataTermino);
            setTitulo(data.livro.titulo);
            setAutor(data.livro.autor);
            setEditora(data.livro.editora);
            setAnoPublicacao(data.livro.anoPublicacao);
          }
        } catch (error) {
          console.error('Erro ao obter detalhes do aluguel:', error);
        }
      }
    };

    fetchAluguelData();
  }, [searchId]);

  const handleUpdateAluguel = async () => {
    if (aluguel) {
      try {
        // Implemente a lógica para atualizar o aluguel
        const updatedAluguel = await updateAluguel({
          ...aluguel,
          livroId,
          usuarioId,
          dataInicio,
          dataTermino,
          livro: {
            id: livroId,
            titulo,
            autor,
            editora,
            anoPublicacao,
          },
        });
       
        router.push(`/alugueis/${aluguel.id}/DetalhesAluguel`);
      } catch (error) {
       
      }
    }
  };

  const handleDeleteAluguel = async () => {
    if (aluguel) {
      try {
        const isDeleted = await deleteAluguel(aluguel.id);
        if (isDeleted) {
          console.log('Aluguel deletado com sucesso.');
          router.push('/');
        } else {
          console.error('Erro ao deletar aluguel.');
        }
      } catch (error) {
        console.error('Erro ao deletar aluguel:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <hr />
      <h1 className={styles.title}>Editar Aluguel</h1>
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
          <label>
            Livro ID:
            <input
              type="number"
              value={livroId}
              onChange={(e) => setLivroId(e.target.valueAsNumber)}
            />
          </label>
          <label>
            Usuário ID:
            <input
              type="number"
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.valueAsNumber)}
            />
          </label>
          <label>
            Data de Início:
            <input
              type="text"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </label>
          <label>
            Data de Término:
            <input
              type="text"
              value={dataTermino}
              onChange={(e) => setDataTermino(e.target.value)}
            />
          </label>
          <label>
            Título:
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </label>
          <label>
            Autor:
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </label>
          <label>
            Editora:
            <input
              type="text"
              value={editora}
              onChange={(e) => setEditora(e.target.value)}
            />
          </label>
          <label>
            Ano de Publicação:
            <input
              type="number"
              value={anoPublicacao}
              onChange={(e) => setAnoPublicacao(e.target.valueAsNumber)}
            />
          </label>
          <button onClick={handleUpdateAluguel}>Atualizar Aluguel</button>
          <button onClick={handleDeleteAluguel}>Deletar Aluguel</button>
        </>
      )}
    </div>
  );
};

export default EdicaoAluguel;
