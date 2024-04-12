import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchUsuarioDetails, updateUsuario } from '../../../src/Usuario';
import Navbar from '../../../components/navbar';
import styles from '../../../styles/detalheslivro.module.css';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const EdicaoUsuario: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [searchId, setSearchId] = useState<string>('');

  useEffect(() => {
    const fetchUsuarioData = async () => {
      let usuarioId: number;

      if (searchId) {
        usuarioId = parseInt(searchId, 10);
      } else if (queryId && typeof queryId === 'string') {
        usuarioId = parseInt(queryId, 10);
      } else {
        return;
      }

      try {
        const data = await fetchUsuarioDetails(usuarioId);
        if (data) {
          setUsuario(data);
          setNome(data.nome);
          setEmail(data.email);
          setSenha(data.senha);
        } else {
          console.error('Detalhes do usuário não encontrados.');
        }
      } catch (error) {
        console.error('Erro ao obter detalhes do usuário:', error);
      }
    };

    fetchUsuarioData();
  }, [queryId, searchId]);

  const handleUpdateUsuario = async () => {
    if (usuario) {
      const usuarioAtualizado = {
        ...usuario,
        nome,
        email,
        senha,
      };

      try {
        await updateUsuario(usuarioAtualizado);
        alert('Usuário atualizado com sucesso!');
        router.push('/');
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    }
  };

  return (
    <div>
      <Navbar/>
      <hr/>
      <h1>Editar Usuário</h1>
      <div>
        <label className={styles.title}>
          Pesquisar Usuário por ID:
          <input className={styles.input} type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </label>
      </div>
      {usuario && (
        <form>
          <label>
            Nome:
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Senha:
            <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleUpdateUsuario}>
            Atualizar Usuário
          </button>
        </form>
      )}
      <br />
    </div>
  );
};

export default EdicaoUsuario;
