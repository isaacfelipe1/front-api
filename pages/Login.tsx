import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../src/Auth';
import Navbar from '../components/navbar';
import styles from '../styles/novolivro.module.css';
const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      
      const response = await loginUser({ email, senha });

      if (response.status === 'success') {
        console.log('Login successful');
        router.push('/');
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div >
      <Navbar/>
       <div className={styles.container}>
        <h1>Página de Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label className={styles.formGroup}>
        Email:
        <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label className={styles.formGroup}>
        Senha:
        <input className={styles.input} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      <br />
      <button className={styles.button}  type="button" onClick={handleLogin}>
        Login
      </button>
      </div>
    </div>
  );
};

export default Login;

