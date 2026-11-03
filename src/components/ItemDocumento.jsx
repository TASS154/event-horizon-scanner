function ItemDocumento(props) {
  const documento = props.documento;
  const visibilidade = documento.publico ? "Público" : "Privado";
  const classe =
    "rounded-lg border border-gray-300 p-4 " + (documento.publico ? "bg-white" : "bg-gray-50");

  return (
    <article className={classe}>
      <h3 className="m-0 mb-2 text-base font-bold">{documento.titulo}</h3>
      <p className="m-0 mb-2 text-sm text-gray-700">
        Álbum: <strong>{documento.categoria}</strong> · {documento.paginas} página(s) ·
        confiança {documento.confianca}% · {visibilidade}
      </p>
      <p className="m-0 text-sm text-gray-700">
        Capturado por {documento.autor} em {documento.data}. Tempo estimado de leitura: {documento.tempo}s.
        Validade simulada: {documento.validadeDias} dias.
      </p>
      {documento.expirando ? (
        <p className="m-0 mt-2 font-bold text-perigo-600">
          Atenção: este item está próximo do fim da validade simulada.
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 text-sm font-bold text-brand-600 hover:bg-brand-50"
          type="button"
          onClick={function () { props.onAlternarVisibilidade(documento.id); }}
        >
          {documento.publico ? "Tornar privado" : "Tornar público"}
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md border-2 border-perigo-600 bg-white px-4 py-2.5 text-sm font-bold text-perigo-600 hover:bg-perigo-100"
          type="button"
          onClick={function () { props.onMoverLixeira(documento.id); }}
        >
          Enviar para lixeira
        </button>
      </div>
    </article>
  );
}

export default ItemDocumento;
