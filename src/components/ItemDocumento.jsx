function ItemDocumento(props) {
  const documento = props.documento;
  const visibilidade = documento.publico ? "Público" : "Privado";
  const classe = documento.publico ? "doc-item" : "doc-item privado";

  /*
    Revisão da IA
    Antes: o mesmo <article> da captura estava colado dentro do map da Central.
    Agora: o item virou componente e recebe o documento por props.
    Motivo: o cartão da lista e os botões de ação existiam só na página; qualquer ajuste de layout
    teria que ser feito no meio da listagem.
  */
  return (
    <article className={classe}>
      <h3>{documento.titulo}</h3>
      <p>
        Álbum: <strong>{documento.categoria}</strong> · {documento.paginas} página(s) ·
        confiança {documento.confianca}% · {visibilidade}
      </p>
      <p>
        Capturado por {documento.autor} em {documento.data}. Tempo estimado de leitura: {documento.tempo}s.
        Validade simulada: {documento.validadeDias} dias.
      </p>
      {documento.expirando ? (
        <p className="alerta-validade">Atenção: este item está próximo do fim da validade simulada.</p>
      ) : null}
      <div className="doc-acoes">
        <button
          className="btn btn-sec"
          type="button"
          onClick={function () { props.onAlternarVisibilidade(documento.id); }}
        >
          {documento.publico ? "Tornar privado" : "Tornar público"}
        </button>
        <button
          className="btn btn-perigo"
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
