import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchUsuarioDetails } from '../../../src/Usuario';
import Navbar from '../../../components/Navbar';
import styles from '../../../styles/detalheslivro.module.css';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const DetalhesUsuario: React.FC = () => {
  const router = useRouter();
  const { id: routeId } = router.query;
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>(routeId ? String(routeId) : '');

  const fetchDetails = async (userId: number) => {
    try {
      console.log('Fetching details for user ID:', userId);
      setLoading(true);
      const data = await fetchUsuarioDetails(userId);
  
      if (!data) {
        setError('Dados não encontrados.');
      } else {
        setUsuario(data);
        setError(null);
      }
    } catch (error) {
      setError('Erro ao buscar detalhes do usuário.');
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (routeId && typeof routeId === 'string') {
      const userId = parseInt(routeId, 10);
      if (userId > 0) {
        fetchDetails(userId);
      }
    }
  }, [routeId]);

  const handleSearch = () => {
    const userId = parseInt(searchId, 10);
    if (!isNaN(userId) && userId > 0) {
      fetchDetails(userId);
    }
  };

  return (
    <div>
      <Navbar/>
      <hr />
      <h1>Detalhes do Usuário</h1>
      <div>
        <label className={styles.title}>
          Pesquisar Usuário por ID:
          <input className={styles.input} type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </label>
        <button className={styles.button} type="button" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {usuario && (
        <div>
          <h3>{usuario.nome}</h3>
          <p>Email: {usuario.email}</p>
        </div>
      )}
    </div>
  );
};

export default DetalhesUsuario;
