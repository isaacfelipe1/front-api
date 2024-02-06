interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
  }
  export const fetchUsuarios = async (): Promise<Usuario[]> => {
    const response = await fetch('https://localhost:44349/api/Usuario');
    const data: Usuario[] = await response.json();
    return data;
  };
  export const fetchUsuarioDetails = async (usuarioId: number): Promise<Usuario | null> => {
    const response = await fetch(`https://localhost:44349/api/Usuario/${usuarioId}`);
    if (!response.ok) {
      return null;
    }
    const data: Usuario = await response.json();
    return data;
  };
  
  export const createUsuario = async (novoUsuario: Omit<Usuario, 'id'>): Promise<Usuario | null> => {
    const response = await fetch('https://localhost:44349/api/Usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoUsuario),
    });
  
    if (!response.ok) {
      return null;
    }
  
    const data: Usuario = await response.json();
    return data;
  };
  
  export const updateUsuario = async (usuario: Usuario): Promise<boolean> => {
    const response = await fetch(`https://localhost:44349/api/Usuario/${usuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });
  
    return response.ok;
  };
  
  export const getUserDetails = async (): Promise<Usuario | null> => {
    try {
      const usuarioAtual: Usuario = {
        id: 1,
        nome: 'Isaac',
        email: 'isaac@gmail.com',
        senha: 'isaacf'
      };
      
      return usuarioAtual;
    } catch (error) {
      console.error('Erro ao obter detalhes do usuário:', error);
      return null;
    }
  };
  
