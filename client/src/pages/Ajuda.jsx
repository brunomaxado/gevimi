import { Link, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import '../ajuda.css';
import ModalHelpCategoria from "../components/modalHelpCategoria";
import ModalHelpProduto from "../components/modalHelpProduto";
import ModalHelpCliente from "../components/modalHelpCliente";
import ModalHelpPedido from "../components/modalHelpPedido";
import ModalReadProduto from "../components/modalHelpReadProduto";
import ModalReadPedido from "../components/modalHelpReadPedido";
import ModalReadCliente from "../components/modalHelpReadCliente";
import ModalHome from "../components/modalHelpPainelEntregas";
import ModalHelpEstatisticas from "../components/modalHelpEstatisticas";
import ModalHelpAlterarSenha from "../components/modalHelpAlterarSenha";
import ModalHelpReadUsuarios from "../components/modalHelpReadUsuarios";
import ModalHelpNovoUsuario from "../components/modalHelpNovoUsuario";
import ModalHelpFormulario from '../components/modalHelpFormulario';
import ModalHelpEditarProduto from '../components/modalHelpEditarProduto';
import ModalHelpEditarCliente from '../components/modalHelpEditarCliente';
import ModalHelpEditarUsuario from '../components/modalHelpEditarUsuario';
import ModalHelpRelatorio from '../components/modalHelpRelatorioProduto';
import ModalHelpReadRelatorio from '../components/modalHelpReadRelatorios';

const Ajuda = () => {
  const [indiceAtivo, setIndiceAtivo] = useState(0); // Controla qual link está ativo
  const [isHelpCategoriaOpen, setIsHelpCategoriaOpen] = useState(false); // Estado para o modal de categoria
  const [isHelpProdutoOpen, setIsHelpProdutoOpen] = useState(false); // Estado para o modal de produto
  const [isHelpClienteOpen, setIsHelpClienteOpen] = useState(false); // Estado para o modal de cliente
  const [isHelpPedidoOpen, setIsHelpPedidoOpen] = useState(false);

  const [isHelpReadProdutoOpen, setIsHelpReadProdutoOpen] = useState(false);
  const [isHelpReadPedidoOpen, setIsHelpReadPedidoOpen] = useState(false);
  const [isHelpHomeOpen, setIsHelpHomeOpen] = useState(false);
  const [isHelpReadClienteOpen, setIsHelpReadClienteOpen] = useState(false);
  const [isHelpEstatisticasOpen, setIsHelpEstatisticasOpen] = useState(false);
  const [isHelpAlterarSenhaOpen, setIsHelpAlterarSenhaOpen] = useState(false);
  const [isHelpReadUsuariosOpen, setIsHelpReadUsuariosOpen] = useState(false);
  const [isHelpNovoUsuarioOpen, setIsHelpNovoUsuarioOpen] = useState(false);
  const [isHelpFormularioOpen, setIsHelpFormularioOpen] = useState(false);
  const [isHelpEditarClienteOpen, setIsHelpEditarClienteOpen] = useState(false);
  const [isHelpEditarProdutoOpen, setIsHelpEditarProdutoOpen] = useState(false);
  const [isHelpEditarUsuarioOpen, setIsHelpEditarUsuarioOpen] = useState(false);
  const [isHelpRelatorioOpen, setIsHelpRelatorioOpen] = useState(false);
  const [isHelpReadRelatorioOpen, setIsHelpReadRelatorioOpen] = useState(false);
  const location = useLocation();

  const tratarCliqueLink = (indice) => {
    setIndiceAtivo(indice); // Atualiza o índice ativo
  };

  const abrirModal = () => {
    const pathname = location.pathname;
  
    if (pathname.startsWith('/editarCliente/')) {
      setIsHelpEditarClienteOpen(true);
      return;
    }
  
    if (pathname.startsWith('/gerenciarProduto/')) {
      setIsHelpEditarProdutoOpen(true);
      return;
    }
  
    if (pathname.startsWith('/editarUsuario/')) {
      setIsHelpEditarUsuarioOpen(true);
      return;
    }
  
    // Switch para as URLs estáticas
    switch (pathname) {
      case '/categoria':
        setIsHelpCategoriaOpen(true);
        break;
      case '/produto':
        setIsHelpProdutoOpen(true);
        break;
      case '/cliente':
        setIsHelpClienteOpen(true);
        break;
      case '/pedido':
        setIsHelpPedidoOpen(true);
        break;
      case '/viewProduto':
        setIsHelpReadProdutoOpen(true);
        break;
      case '/readPedido':
        setIsHelpReadPedidoOpen(true);
        break;
      case '/home':
        setIsHelpHomeOpen(true);
        break;
      case '/readCliente':
        setIsHelpReadClienteOpen(true);
        break;
      case '/estatistica':
        setIsHelpEstatisticasOpen(true);
        break;
      case '/alterarsenha':
        setIsHelpAlterarSenhaOpen(true);
        break;
      case '/readUsuario':
        setIsHelpReadUsuariosOpen(true);
        break;
      case '/register':
        setIsHelpNovoUsuarioOpen(true);
        break;
      case '/relatorio/pedido':
        setIsHelpFormularioOpen(true);
        break;
      case '/relatorio/produto':
        setIsHelpRelatorioOpen(true);
        break;
      case '/relatorio':
        setIsHelpReadRelatorioOpen(true);
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="navegacao">
      <ul>
        {(location.pathname === '/categoria'
          || location.pathname === '/produto'
          || location.pathname === '/cliente'
          || location.pathname === '/pedido'
          || location.pathname === '/viewProduto'
          || location.pathname === '/readPedido'
          || location.pathname === '/home'
          || location.pathname === '/readCliente'
          || location.pathname === '/estatistica'
          || location.pathname === '/alterarsenha'
          || location.pathname === '/readUsuario'
          || location.pathname === '/register'
          || location.pathname === '/relatorio/pedido'
          || location.pathname.startsWith('/gerenciarProduto/') 
          || location.pathname.startsWith('/editarCliente/') 
          || location.pathname.startsWith('/editarUsuario/')
          || location.pathname === '/relatorio/produto'
          || location.pathname === '/relatorio') && (
            <li className={`list ${indiceAtivo === 0 ? 'ativa' : ''}`}>
              <Link to="#" onClick={abrirModal}>
                <span className="icone"><ion-icon name="help-circle-outline" title="Ajuda"></ion-icon></span>
              </Link>
            </li>
          )}
      </ul>

      {/* Modais de ajuda */}
      <ModalHelpCategoria
        isOpen={isHelpCategoriaOpen}
        onRequestClose={() => setIsHelpCategoriaOpen(false)}
      />
      <ModalHelpProduto
        isOpen={isHelpProdutoOpen}
        onRequestClose={() => setIsHelpProdutoOpen(false)}
      />
      <ModalHelpCliente
        isOpen={isHelpClienteOpen}
        onRequestClose={() => setIsHelpClienteOpen(false)}
      />
      <ModalHelpPedido
        isOpen={isHelpPedidoOpen}
        onRequestClose={() => setIsHelpPedidoOpen(false)}
      />
      <ModalReadProduto
        isOpen={isHelpReadProdutoOpen}
        onRequestClose={() => setIsHelpReadProdutoOpen(false)}
      />
      <ModalReadPedido
        isOpen={isHelpReadPedidoOpen}
        onRequestClose={() => setIsHelpReadPedidoOpen(false)}
      />
      <ModalReadCliente
        isOpen={isHelpReadClienteOpen}
        onRequestClose={() => setIsHelpReadClienteOpen(false)}
      />
      <ModalHome
        isOpen={isHelpHomeOpen}
        onRequestClose={() => setIsHelpHomeOpen(false)}
      />
      <ModalHelpEstatisticas
        isOpen={isHelpEstatisticasOpen}
        onRequestClose={() => setIsHelpEstatisticasOpen(false)}
      />
      <ModalHelpAlterarSenha
        isOpen={isHelpAlterarSenhaOpen}
        onRequestClose={() => setIsHelpAlterarSenhaOpen(false)}
      />
      <ModalHelpReadUsuarios
        isOpen={isHelpReadUsuariosOpen}
        onRequestClose={() => setIsHelpReadUsuariosOpen(false)}
      />
      <ModalHelpNovoUsuario
        isOpen={isHelpNovoUsuarioOpen}
        onRequestClose={() => setIsHelpNovoUsuarioOpen(false)}
      />
      <ModalHelpFormulario
        isOpen={isHelpFormularioOpen}
        onRequestClose={() => setIsHelpFormularioOpen(false)}
      />
      <ModalHelpEditarProduto
        isOpen={isHelpEditarProdutoOpen}
        onRequestClose={() => setIsHelpEditarProdutoOpen(false)}
      />
      <ModalHelpEditarCliente
        isOpen={isHelpEditarClienteOpen}
        onRequestClose={() => setIsHelpEditarClienteOpen(false)}
      />
      <ModalHelpEditarUsuario
        isOpen={isHelpEditarUsuarioOpen}
        onRequestClose={() => setIsHelpEditarUsuarioOpen(false)}
      />
      <ModalHelpRelatorio
        isOpen={isHelpRelatorioOpen}
        onRequestClose={() => setIsHelpRelatorioOpen(false)}
      />
      <ModalHelpReadRelatorio
        isOpen={isHelpReadRelatorioOpen}
        onRequestClose={() => setIsHelpReadRelatorioOpen(false)}
      />
    </div>
  );
};

export default Ajuda;
