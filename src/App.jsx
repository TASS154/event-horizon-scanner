import { useState } from "react";
import Header from "./components/Header.jsx";
import Corpo from "./components/Corpo.jsx";
import Footer from "./components/Footer.jsx";
import { usuariosTeste } from "./dados.js";
import {
  lerLocalStorage,
  salvarLocalStorage,
  criarId,
  calcularConfiancaOcr,
  calcularTempoLeitura,
  calcularValidadeDias
} from "./armazenamento.js";

function App() {
  const [pagina, setPagina] = useState("inicio");
  const [usuario, setUsuario] = useState(lerLocalStorage("ehs-usuario", null));
  const [documentos, setDocumentos] = useState(lerLocalStorage("ehs-documentos", []));
  const [lixeira, setLixeira] = useState(lerLocalStorage("ehs-lixeira", []));
  const [historico, setHistorico] = useState(lerLocalStorage("ehs-historico", []));

  function registrarHistorico(texto) {
    const item = {
      id: criarId(),
      texto: texto,
      data: new Date().toLocaleString("pt-BR")
    };
    const novoHistorico = [item].concat(historico);
    setHistorico(novoHistorico);
    salvarLocalStorage("ehs-historico", novoHistorico);
  }

  /*
    Revisão da IA
    Antes: cada função (lixeira, recuperar, excluir) repetia o mesmo for para achar o id.
    Agora: uma função devolve o item e a lista sem ele.
    Motivo: a regra de “tirar da lista pelo id” existia em três lugares; um erro era corrigido só em um.
  */
  function tirarDaLista(lista, id) {
    const ficaram = [];
    let achado = null;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].id === id) {
        achado = lista[i];
      } else {
        ficaram.push(lista[i]);
      }
    }

    return {
      ficaram: ficaram,
      achado: achado
    };
  }

  function fazerLogin(email, senha) {
    let encontrado = null;

    for (let i = 0; i < usuariosTeste.length; i++) {
      if (usuariosTeste[i].email === email && usuariosTeste[i].senha === senha) {
        encontrado = usuariosTeste[i];
      }
    }

    if (!encontrado) {
      return false;
    }

    const dadosUsuario = {
      nome: encontrado.nome,
      email: encontrado.email
    };

    setUsuario(dadosUsuario);
    salvarLocalStorage("ehs-usuario", dadosUsuario);
    registrarHistorico("Login de " + dadosUsuario.nome);
    return true;
  }

  function sair() {
    setUsuario(null);
    localStorage.removeItem("ehs-usuario");
    registrarHistorico("Saída da conta");
  }

  function simularCaptura(dados) {
    const confianca = calcularConfiancaOcr();
    const tempo = calcularTempoLeitura(dados.paginas);
    const validadeDias = calcularValidadeDias();
    const autor = usuario ? usuario.nome : dados.nome;

    const documento = {
      id: criarId(),
      titulo: dados.tipoDocumento,
      categoria: dados.categoria,
      paginas: dados.paginas,
      publico: dados.publico,
      autor: autor,
      confianca: confianca,
      tempo: tempo,
      validadeDias: validadeDias,
      expirando: validadeDias <= 8,
      data: new Date().toLocaleString("pt-BR")
    };

    const novosDocumentos = [documento].concat(documentos);
    setDocumentos(novosDocumentos);
    salvarLocalStorage("ehs-documentos", novosDocumentos);
    registrarHistorico("Captura adicionada: " + documento.titulo);

    return {
      confianca: confianca,
      tempo: tempo
    };
  }

  function alternarVisibilidade(id) {
    const novosDocumentos = [];

    for (let i = 0; i < documentos.length; i++) {
      const atual = documentos[i];
      if (atual.id === id) {
        const atualizado = {
          id: atual.id,
          titulo: atual.titulo,
          categoria: atual.categoria,
          paginas: atual.paginas,
          publico: !atual.publico,
          autor: atual.autor,
          confianca: atual.confianca,
          tempo: atual.tempo,
          validadeDias: atual.validadeDias,
          expirando: atual.expirando,
          data: atual.data
        };
        novosDocumentos.push(atualizado);
        registrarHistorico(
          "Visibilidade alterada: " + atual.titulo + " agora está " + (atualizado.publico ? "público" : "privado")
        );
      } else {
        novosDocumentos.push(atual);
      }
    }

    setDocumentos(novosDocumentos);
    salvarLocalStorage("ehs-documentos", novosDocumentos);
  }

  function moverLixeira(id) {
    const resultado = tirarDaLista(documentos, id);

    if (!resultado.achado) {
      return;
    }

    const novaLixeira = [resultado.achado].concat(lixeira);
    setDocumentos(resultado.ficaram);
    setLixeira(novaLixeira);
    salvarLocalStorage("ehs-documentos", resultado.ficaram);
    salvarLocalStorage("ehs-lixeira", novaLixeira);
    registrarHistorico("Item enviado à lixeira: " + resultado.achado.titulo);
  }

  function recuperar(id) {
    const resultado = tirarDaLista(lixeira, id);

    if (!resultado.achado) {
      return;
    }

    const novosDocumentos = [resultado.achado].concat(documentos);
    setDocumentos(novosDocumentos);
    setLixeira(resultado.ficaram);
    salvarLocalStorage("ehs-documentos", novosDocumentos);
    salvarLocalStorage("ehs-lixeira", resultado.ficaram);
    registrarHistorico("Item recuperado da lixeira: " + resultado.achado.titulo);
  }

  function excluirDefinitivo(id) {
    let titulo = "";
    const novaLixeira = [];

    for (let i = 0; i < lixeira.length; i++) {
      if (lixeira[i].id === id) {
        titulo = lixeira[i].titulo;
      } else {
        novaLixeira.push(lixeira[i]);
      }
    }

    setLixeira(novaLixeira);
    salvarLocalStorage("ehs-lixeira", novaLixeira);
    registrarHistorico("Item excluído de vez: " + titulo);
  }

  return (
    <div className="app">
      <div className="wrap">
        <Header paginaAtual={pagina} onNavegar={setPagina} usuario={usuario} />
        <Corpo
          pagina={pagina}
          onNavegar={setPagina}
          usuario={usuario}
          onLogin={fazerLogin}
          onSair={sair}
          onSimular={simularCaptura}
          documentos={documentos}
          lixeira={lixeira}
          historico={historico}
          onAlternarVisibilidade={alternarVisibilidade}
          onMoverLixeira={moverLixeira}
          onRecuperar={recuperar}
          onExcluirDefinitivo={excluirDefinitivo}
        />
      </div>
      <Footer pagina={pagina} onNavegar={setPagina} />
    </div>
  );
}

export default App;
