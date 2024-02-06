import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserDetails } from '../src/Usuario';
import Navbar from '../components/Navbar';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const DetalhesUsuario: React.FC = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await getUserDetails();
      if (!data) {
        setError('Dados não encontrados.');
      } else {
        setUsuario(data);
        setError(null);
      }
    } catch (error) {
      console.error('Erro ao obter detalhes do usuário:', error);
      setUsuario(null);
      setError('Erro ao carregar detalhes do usuário');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Detalhes do Usuário</h1>

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
