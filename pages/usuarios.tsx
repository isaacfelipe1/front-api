import { useEffect, useState } from 'react';
import { fetchUsuarios } from '../src/Usuario';
import Navbar from '../components/Navbar';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}
const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsuarios();
      setUsuarios(data);
    };

    fetchData();
  }, []);

  return (
    <div>
        <Navbar/>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <h3>{usuario.nome}</h3>
            <p>Email: {usuario.email}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
