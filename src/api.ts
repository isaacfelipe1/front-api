interface Livro {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: number;
  }
  export const fetchBooks = async (): Promise<Livro[]> => {
    const response = await fetch('https://localhost:44349/api/Livros');
    const data: Livro[] = await response.json();
    return data;
  };
export const fetchBookDetails = async (livroId: number): Promise<Livro | null> => {
  const response = await fetch(`https://localhost:44349/api/Livros/${livroId}`);
  if (!response.ok) {
    return null;
  }
  const data: Livro = await response.json();
  return data;
};
export const deleteBook = async (livroId: number): Promise<void> => {
  const response = await fetch(`https://localhost:44349/api/Livros/${livroId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir livro');
  }
};
export const updateBook = async (livro: Livro): Promise<void> => {
  const response = await fetch(`https://localhost:44349/api/Livros/${livro.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(livro),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar o livro');
  }
};
