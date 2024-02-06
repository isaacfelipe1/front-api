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
  
  export const fetchAlugueis = async (): Promise<Aluguel[]> => {
    const response = await fetch('https://localhost:44349/api/Aluguel');
    const data: Aluguel[] = await response.json();
    return data;
  };
  
  export const fetchAluguelDetails = async (aluguelId: number): Promise<Aluguel | null> => {
    const response = await fetch(`https://localhost:44349/api/Aluguel/${aluguelId}`);
    if (!response.ok) {
      return null;
    }
    const data: Aluguel = await response.json();
    return data;
  };
  
  export const createAluguel = async (novoAluguel: Omit<Aluguel, 'id'>): Promise<Aluguel | null> => {
    const response = await fetch('https://localhost:44349/api/Aluguel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoAluguel),
    });
  
    if (!response.ok) {
      return null;
    }
  
    const data: Aluguel = await response.json();
    return data;
  };
  
  export const updateAluguel = async (aluguel: Aluguel): Promise<boolean> => {
    const response = await fetch(`https://localhost:44349/api/Aluguel/${aluguel.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluguel),
    });
  
    return response.ok;
  };
  
  export const deleteAluguel = async (aluguelId: number): Promise<boolean> => {
    const response = await fetch(`https://localhost:44349/api/Aluguel/${aluguelId}`, {
      method: 'DELETE',
    });
  
    return response.ok;
  };
  export const fetchAlugueisPorUsuario = async (usuarioId: number): Promise<Aluguel[]> => {
    try {
      const alugueis = await fetchAlugueis();

      const alugueisUsuario = alugueis.filter(aluguel => aluguel.usuarioId === usuarioId);
  
      return alugueisUsuario;
    } catch (error) {
      console.error('Erro ao buscar os aluguéis do usuário:', error);
      return [];
    }
  };
  