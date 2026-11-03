import { useDocumentosComunidade } from "../hooks/useDocumentosComunidade.js";

function DocumentosComunidade() {
  const { documentos, carregando, erro, tentarNovamente } = useDocumentosComunidade();

  return (
    <div>
      <h2 className="mt-6 mb-3 text-xl font-bold">Comunidade</h2>
      <p className="m-0 mb-4 text-gray-700">
        Documentos públicos compartilhados por outros usuários, entregues por uma API mockada com{" "}
        <a href="https://fakerjs.dev/" className="text-brand-600 underline hover:text-brand-700">
          FakerJS
        </a>{" "}
        (dados fictícios em português, com atraso de rede simulado).
      </p>

      {carregando ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map(function (indice) {
            return (
              <div key={indice} className="h-20 animate-pulse rounded-lg border border-gray-200 bg-gray-100" />
            );
          })}
        </div>
      ) : null}

      {!carregando && erro ? (
        <div className="rounded-lg border border-perigo-600 bg-perigo-100 p-4 text-perigo-600">
          <p className="m-0 mb-3">Não foi possível carregar os documentos da comunidade: {erro}</p>
          <button
            className="inline-flex items-center justify-center rounded-md border-2 border-perigo-600 bg-white px-4 py-2 text-sm font-bold text-perigo-600 hover:bg-perigo-100"
            type="button"
            onClick={tentarNovamente}
          >
            Tentar novamente
          </button>
        </div>
      ) : null}

      {!carregando && !erro ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {documentos.map(function (item) {
            return (
              <article key={item.id} className="rounded-lg border border-gray-300 bg-white p-4">
                <h3 className="m-0 mb-1 text-base font-bold">{item.titulo}</h3>
                <p className="m-0 mb-2 text-sm text-gray-700">
                  Álbum: <strong>{item.categoria}</strong> · {item.paginas} página(s) · confiança{" "}
                  {item.confianca}%
                </p>
                <p className="m-0 text-xs text-gray-500">
                  Publicado por {item.autor} em {item.data} · Público
                </p>
              </article>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default DocumentosComunidade;
