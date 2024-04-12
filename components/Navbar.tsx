// Navbar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/navbar.module.css';
const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            <div className={styles.navLink}>HOME</div>
          </Link>
        </li>
        <li className={styles.navItem} >
          <Link href="/novoLivro" className={styles.navLink}>
            <div className={styles.navLink}>CADASTRAR LIVRO</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <span className={styles.navLink}>GERENCIAR LIVROS</span>
          <div className={styles.dropdown}>
            <ul>
              <li>
                <Link href="/book/[id]/DetalhesLivro" as="/book/dummyId/DetalhesLivro">
                  <div className={styles.navLink}>Detalhes do Livro Por ID</div>
                </Link>
              </li>
              <li>
                <Link href="/book/[id]/ExclusaoLivro" as="/book/dummyId/ExclusaoLivro">
                  <div className={styles.navLink}>Excluir Livro Por ID</div>
                </Link>
              </li>
              <li>
                <Link href="/book/[id]/edicaoLivro" as="/book/dummyId/edicaoLivro">
                  <div className={styles.navLink}>Editar Livro Por ID</div>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.navItem}>
          <Link href="/novoUsuario" className={styles.navLink}>
            <div className={styles.navLink}>CRIAR USUÁRIO</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/usuarios" className={styles.navLink}>
            <div className={styles.navLink} >LISTAR USUÁRIOS</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <span className={styles.navLink}>DETALHES DE USUÁRIO</span>
          <div className={styles.dropdown}>
            <ul>
              <li>
                <Link href="/usuario/[id]/DetalhesUsuario" as="/usuario/dummyId/DetalhesUsuario">
                  <div className={styles.navLink}>Detalhes do Usuário Por ID</div>
                </Link>
              </li>
              <li>
                <Link href="/usuario/[id]/edicaoUsuario" as="/usuario/dummyId/edicaoUsuario">
                  <div className={styles.navLink}>Editar Usuário Por ID</div>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.navItem}>
          <span className={styles.navLink}>GERENCIAR ALUGUÉIS</span>
          <div className={styles.dropdown}>
            <ul>
              <li>
                <Link href="/alugueis/[id]/DetalhesAluguel" as="/alugueis/dummyId/DetalhesAluguel">
                  <div className={styles.navLink}>Detalhes do Aluguel Por ID</div>
                </Link>
              </li>
              <li>
                <Link href="/alugueis/[id]/ExclusaoAluguel" as="/alugueis/dummyId/ExclusaoAluguel">
                  <div className={styles.navLink}>Excluir Aluguel Por ID</div>
                </Link>
              </li>
              <li>
                <Link href="/alugueis/[id]/edicaoAluguel" as="/alugueis/dummyId/edicaoAluguel">
                  <div className={styles.navLink}>Editar Aluguel Por ID</div>
                </Link>
              </li>
              <li>
                <Link href="/novoAluguel">
                  <div className={styles.navLink}>Criar Novo Aluguel</div>
                </Link>
              </li>
              <li>
                <Link href="/Alugueis">
                  <div className={styles.navLink}>Meus Aluguéis</div>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.navItem}>
          <Link href="/perfil" className={styles.navLink}>
            <div className={styles.navLink}>PERFIL</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/login" className={styles.navLink}>
            <div className={styles.navLink}>SAIR</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
