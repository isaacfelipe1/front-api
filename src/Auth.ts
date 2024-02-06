export const loginUser = async (credentials: { email: string; senha: string }): Promise<{ status: string; nome?: string }> => {
  try {
      const response = await fetch('https://localhost:44349/api/Usuario');
      const usuarios = await response.json();

      if (response.ok && usuarios && usuarios.length > 0) {
          const usuarioEncontrado = usuarios.find(
              (usuario: { email: string; senha: string }) =>
                  usuario.email === credentials.email && usuario.senha === credentials.senha
          );

          if (usuarioEncontrado) {
              return Promise.resolve({ status: 'success', nome: usuarioEncontrado.nome });
          } else {
              
              return Promise.resolve({ status: 'error' });
          }
      } else {
         
          return Promise.resolve({ status: 'error' });
      }
  } catch (error) {
     
      console.error('Erro ao fazer login:', error);
      return Promise.resolve({ status: 'error' });
  }
};
