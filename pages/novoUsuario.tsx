import { useState } from 'react';
import Link from 'next/link';
import { createUsuario } from '../src/Usuario';
import Navbar from '../components/Navbar';
import styles from '../styles/novolivro.module.css';
const NovoUsuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleCreateUsuario = async () => {
    // Verificar se todos os campos estão preenchidos
    if (!nome || !email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const novoUsuario = {
      nome,
      email,
      senha,
    };

    try {
      const data = await createUsuario(novoUsuario);

      if (data) {
        alert('Usuário criado com sucesso!');
      } else {
        console.error('Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div>
       <Navbar/>
       <div className={styles.container}>
      <h1>Criar Novo Usuário</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <label>
          Nome:
          <input className={styles.input} type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input className={styles.input} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <br />
        <button className={styles.button} type="button" onClick={handleCreateUsuario}>
          Criar Usuário
        </button>
      </form>
      <br />
    </div>
    </div>
  );
};

export default NovoUsuario;
