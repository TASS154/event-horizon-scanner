import { useState } from "react";
import ItemDocumento from "./ItemDocumento.jsx";
import { categorias } from "../dados.js";

function PaginaCentral(props) {
  const [busca, setBusca] = useState("");
  const [filtroAlbum, setFiltroAlbum] = useState("todos");
  const [mostrarLixeira, setMostrarLixeira] = useState(false);

  const termo = busca.toLowerCase();
  const documentosFiltrados = [];

  for (let i = 0; i < props.documentos.length; i++) {
    const doc = props.documentos[i];
    let combinaBusca = false;

    if (doc.titulo.toLowerCase().includes(termo)) {
      combinaBusca = true;
    }
    if (doc.categoria.toLowerCase().includes(termo)) {
      combinaBusca = true;
    }
    if (doc.autor.toLowerCase().includes(termo)) {
      combinaBusca = true;
    }

    let combinaAlbum = false;
    if (filtroAlbum === "todos") {
      combinaAlbum = true;
    }
    if (doc.categoria === filtroAlbum) {
      combinaAlbum = true;
    }

    if (combinaBusca === true) {
      if (combinaAlbum === true) {
        documentosFiltrados.push(doc);
      }
    }
  }

  const maisRecente = props.documentos.length > 0 ? props.documentos[0] : null;

  /*
    Revisão da IA
    Antes: um for somava páginas, outro somava confiança e um terceiro zerava os álbuns.
    Agora: os totais saem de um único passe na lista.
    Motivo: com três voltas iguais, um documento novo era contado em um lugar e esquecido em outro.
  */
  let totalPaginas = 0;
  let somaConfianca = 0;
  const totaisPorAlbum = {};
  totaisPorAlbum.Contratos = 0;
  totaisPorAlbum.Artigos = 0;
  totaisPorAlbum.Apostilas = 0;
  totaisPorAlbum.Outros = 0;

  for (let i = 0; i < props.documentos.length; i++) {
    const doc = props.documentos[i];
    totalPaginas = totalPaginas + doc.paginas;
    somaConfianca = somaConfianca + doc.confianca;
    totaisPorAlbum[doc.categoria] = totaisPorAlbum[doc.categoria] + 1;
  }

  let mediaConfianca = 0;
  if (props.documentos.length !== 0) {
    mediaConfianca = Math.round(somaConfianca / props.documentos.length);
  }

  return (
    <div>
      <h1>Central de conteúdo</h1>
      <p>
        Aqui ficam os itens capturados na simulação: busca, destaque do mais recente, álbuns, estatísticas,
        histórico de ações e lixeira para recuperação.
      </p>

      <h2>Buscar capturas</h2>
      <form className="formulario largo" onSubmit={function (evento) { evento.preventDefault(); }}>
        <label htmlFor="busca">Busca</label>
        <input
          id="busca"
          type="text"
          value={busca}
          onChange={function (evento) { setBusca(evento.target.value); }}
          placeholder="Título, álbum ou autor"
        />

        <label htmlFor="album">Álbum</label>
        <select
          id="album"
          value={filtroAlbum}
          onChange={function (evento) { setFiltroAlbum(evento.target.value); }}
        >
          <option value="todos">Todos os álbuns</option>
          {categorias.map(function (item) {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </form>

      <h2>Mais recente</h2>
      {maisRecente ? (
        <div className="destaque-recente">
          <p>
            Última captura: <strong>{maisRecente.titulo}</strong> ({maisRecente.categoria}) em {maisRecente.data}.
          </p>
        </div>
      ) : (
        <p>Nenhum documento foi simulado ainda. Use o formulário na página Início.</p>
      )}

      <h2>Estatísticas</h2>
      <div className="stats">
        <div className="stat">
          <strong>{props.documentos.length}</strong>
          Itens ativos
        </div>
        <div className="stat">
          <strong>{totalPaginas}</strong>
          Páginas no total
        </div>
        <div className="stat">
          <strong>{mediaConfianca}%</strong>
          Confiança média do OCR
        </div>
        <div className="stat">
          <strong>{props.lixeira.length}</strong>
          Itens na lixeira
        </div>
      </div>

      <h3>Uso por álbum</h3>
      <div className="tags">
        {categorias.map(function (item) {
          return (
            <span key={item}>
              {item}: {totaisPorAlbum[item]}
            </span>
          );
        })}
      </div>

      <h2>Itens capturados</h2>
      {documentosFiltrados.length === 0 ? (
        <p>Nenhum item corresponde à busca ou ao álbum selecionado.</p>
      ) : (
        <div className="lista-docs">
          {documentosFiltrados.map(function (documento) {
            return (
              <ItemDocumento
                key={documento.id}
                documento={documento}
                onAlternarVisibilidade={props.onAlternarVisibilidade}
                onMoverLixeira={props.onMoverLixeira}
              />
            );
          })}
        </div>
      )}

      <h2>Histórico de ações</h2>
      {props.historico.length === 0 ? (
        <p>Nenhuma ação registrada ainda.</p>
      ) : (
        <ul className="historico">
          {props.historico.map(function (item) {
            return (
              <li key={item.id}>
                {item.data} — {item.texto}
              </li>
            );
          })}
        </ul>
      )}

      <h2>Lixeira</h2>
      <button
        className="btn btn-sec"
        type="button"
        onClick={function () { setMostrarLixeira(!mostrarLixeira); }}
      >
        {mostrarLixeira ? "Ocultar lixeira" : "Mostrar lixeira"}
      </button>

      {mostrarLixeira ? (
        props.lixeira.length === 0 ? (
          <p>A lixeira está vazia.</p>
        ) : (
          <div className="lista-docs">
            {props.lixeira.map(function (documento) {
              return (
                <article className="doc-item" key={documento.id}>
                  <h3>{documento.titulo}</h3>
                  <p>
                    {documento.categoria} · {documento.paginas} página(s)
                  </p>
                  <div className="doc-acoes">
                    <button
                      className="btn"
                      type="button"
                      onClick={function () { props.onRecuperar(documento.id); }}
                    >
                      Recuperar
                    </button>
                    <button
                      className="btn btn-perigo"
                      type="button"
                      onClick={function () { props.onExcluirDefinitivo(documento.id); }}
                    >
                      Excluir de vez
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )
      ) : null}
    </div>
  );
}

export default PaginaCentral;
