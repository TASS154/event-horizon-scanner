import { useState } from "react";
import {
  lerLocalStorage,
  salvarLocalStorage,
  criarId,
  calcularConfiancaOcr,
  calcularTempoLeitura,
  calcularValidadeDias,
  tirarDaLista
} from "../armazenamento.js";

export function useDocumentos(registrarHistorico, usuario) {
  const [documentos, setDocumentos] = useState(lerLocalStorage("ehs-documentos", []));
  const [lixeira, setLixeira] = useState(lerLocalStorage("ehs-lixeira", []));

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

  return {
    documentos,
    lixeira,
    simularCaptura,
    alternarVisibilidade,
    moverLixeira,
    recuperar,
    excluirDefinitivo
  };
}
