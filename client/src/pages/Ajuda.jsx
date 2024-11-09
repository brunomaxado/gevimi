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

  const location = useLocation();

  const tratarCliqueLink = (indice) => {
    setIndiceAtivo(indice); // Atualiza o índice ativo
  };

  const abrirModal = () => {
    switch (location.pathname) {
      case '/categoria': // URL da página de categoria
        setIsHelpCategoriaOpen(true);
        break;
      case '/produto': // URL da página de produto
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
      case '/':
        setIsHelpHomeOpen(true);
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
          || location.pathname === '/'
          || location.pathname === '/home'
          || location.pathname === '/readCliente'
          || location.pathname === '/estatistica'
          || location.pathname === '/alterarsenha'
          || location.pathname === '/readUsuario'
          || location.pathname === '/register') && (
            <li className={`list ${indiceAtivo === 0 ? 'ativa' : ''}`}>
              <Link to="#" onClick={abrirModal}>
                <span className="icone"><ion-icon name="help-circle-outline"></ion-icon></span>
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
    </div>
  );
};

export default Ajuda;
