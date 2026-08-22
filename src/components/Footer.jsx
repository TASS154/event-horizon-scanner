function Footer(props) {
  if (props.pagina === "tecnico") {
    return (
      <footer>
        FIAP · configure <code>CHAVE_API</code> no script Python ·{" "}
        <button type="button" onClick={function () { props.onNavegar("funcionamento"); }}>
          Fluxo do usuário
        </button>
      </footer>
    );
  }

  if (props.pagina === "funcionamento") {
    return (
      <footer>
        FIAP ·{" "}
        <button type="button" onClick={function () { props.onNavegar("inicio"); }}>
          Início
        </button>
        {" · "}
        <button type="button" onClick={function () { props.onNavegar("tecnico"); }}>
          Técnico
        </button>
      </footer>
    );
  }

  if (props.pagina === "sobre") {
    return (
      <footer>
        FIAP · Event Horizon Scanner · documentação convertida para React
      </footer>
    );
  }

  if (props.pagina === "central") {
    return (
      <footer>
        FIAP · Central de conteúdo salva no <code>localStorage</code> do navegador
      </footer>
    );
  }

  return (
    <footer>
      FIAP · protótipo inspirado em <code>AppScanner</code> ·{" "}
      <button type="button" onClick={function () { props.onNavegar("sobre"); }}>
        Sobre e requisitos
      </button>
    </footer>
  );
}

export default Footer;
