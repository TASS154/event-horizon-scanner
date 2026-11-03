import { useState } from "react";
import ItemDocumento from "./ItemDocumento.jsx";
import DocumentosComunidade from "./DocumentosComunidade.jsx";
import { categorias } from "../dados.js";

const classeBtnSec = "inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 font-bold text-brand-600 hover:bg-brand-50";
const classeBtnPerigo = "inline-flex items-center justify-center rounded-md border-2 border-perigo-600 bg-white px-4 py-2.5 text-sm font-bold text-perigo-600 hover:bg-perigo-100";
const classeBtn = "inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700";

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
      <h1 className="m-0 mb-4 text-2xl font-bold">Central de conteúdo</h1>
      <p className="mb-3">
        Aqui ficam os itens capturados na simulação: busca, destaque do mais recente, álbuns, estatísticas,
        histórico de ações e lixeira para recuperação.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">Buscar capturas</h2>
      <form
        className="mt-4 flex w-full flex-col gap-2 rounded-lg border border-gray-300 bg-white p-4 sm:flex-row sm:flex-wrap sm:gap-4"
        onSubmit={function (evento) { evento.preventDefault(); }}
      >
        <div className="flex flex-1 flex-col gap-2 sm:min-w-[200px]">
          <label className="font-bold" htmlFor="busca">
            Busca
          </label>
          <input
            className="rounded-md border border-gray-400 p-2.5"
            id="busca"
            type="text"
            value={busca}
            onChange={function (evento) { setBusca(evento.target.value); }}
            placeholder="Título, álbum ou autor"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 sm:min-w-[200px]">
          <label className="font-bold" htmlFor="album">
            Álbum
          </label>
          <select
            className="rounded-md border border-gray-400 p-2.5"
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
        </div>
      </form>

      <h2 className="mt-6 mb-3 text-xl font-bold">Mais recente</h2>
      {maisRecente ? (
        <div className="mt-4 rounded-lg border border-brand-100 bg-brand-50 p-4">
          <p className="m-0">
            Última captura: <strong>{maisRecente.titulo}</strong> ({maisRecente.categoria}) em{" "}
            {maisRecente.data}.
          </p>
        </div>
      ) : (
        <p>Nenhum documento foi simulado ainda. Use o formulário na página Início.</p>
      )}

      <h2 className="mt-6 mb-3 text-xl font-bold">Estatísticas</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-300 bg-white p-3">
          <strong className="block text-2xl text-brand-600">{props.documentos.length}</strong>
          Itens ativos
        </div>
        <div className="rounded-lg border border-gray-300 bg-white p-3">
          <strong className="block text-2xl text-brand-600">{totalPaginas}</strong>
          Páginas no total
        </div>
        <div className="rounded-lg border border-gray-300 bg-white p-3">
          <strong className="block text-2xl text-brand-600">{mediaConfianca}%</strong>
          Confiança média do OCR
        </div>
        <div className="rounded-lg border border-gray-300 bg-white p-3">
          <strong className="block text-2xl text-brand-600">{props.lixeira.length}</strong>
          Itens na lixeira
        </div>
      </div>

      <h3 className="mt-6 mb-2 text-lg font-bold">Uso por álbum</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {categorias.map(function (item) {
          return (
            <span key={item} className="rounded bg-gray-200 px-2.5 py-1 font-mono text-sm">
              {item}: {totaisPorAlbum[item]}
            </span>
          );
        })}
      </div>

      <h2 className="mt-6 mb-3 text-xl font-bold">Itens capturados</h2>
      {documentosFiltrados.length === 0 ? (
        <p>Nenhum item corresponde à busca ou ao álbum selecionado.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
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

      <h2 className="mt-6 mb-3 text-xl font-bold">Histórico de ações</h2>
      {props.historico.length === 0 ? (
        <p>Nenhuma ação registrada ainda.</p>
      ) : (
        <ul className="mt-4 list-none p-0">
          {props.historico.map(function (item) {
            return (
              <li key={item.id} className="mb-2 rounded-md border border-gray-200 bg-white px-3 py-2.5">
                {item.data} — {item.texto}
              </li>
            );
          })}
        </ul>
      )}

      <h2 className="mt-6 mb-3 text-xl font-bold">Lixeira</h2>
      <button className={classeBtnSec} type="button" onClick={function () { setMostrarLixeira(!mostrarLixeira); }}>
        {mostrarLixeira ? "Ocultar lixeira" : "Mostrar lixeira"}
      </button>

      {mostrarLixeira ? (
        props.lixeira.length === 0 ? (
          <p className="mt-4">A lixeira está vazia.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {props.lixeira.map(function (documento) {
              return (
                <article key={documento.id} className="rounded-lg border border-gray-300 bg-white p-4">
                  <h3 className="m-0 mb-1 text-base font-bold">{documento.titulo}</h3>
                  <p className="m-0 mb-2 text-sm text-gray-700">
                    {documento.categoria} · {documento.paginas} página(s)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className={classeBtn} type="button" onClick={function () { props.onRecuperar(documento.id); }}>
                      Recuperar
                    </button>
                    <button
                      className={classeBtnPerigo}
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

      <DocumentosComunidade />
    </div>
  );
}

export default PaginaCentral;
