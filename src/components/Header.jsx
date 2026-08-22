function Header(props) {
  return (
    <header>
      <p className="site-title">
        <button type="button" onClick={function () { props.onNavegar("inicio"); }}>
          Event Horizon Scanner
        </button>
      </p>
      <nav>
        <ul>
          <li>
            <button
              type="button"
              className={props.paginaAtual === "inicio" ? "atual" : ""}
              onClick={function () { props.onNavegar("inicio"); }}
            >
              Início
            </button>
          </li>
          <li>
            <button
              type="button"
              className={props.paginaAtual === "funcionamento" ? "atual" : ""}
              onClick={function () { props.onNavegar("funcionamento"); }}
            >
              Como funciona
            </button>
          </li>
          <li>
            <button
              type="button"
              className={props.paginaAtual === "tecnico" ? "atual" : ""}
              onClick={function () { props.onNavegar("tecnico"); }}
            >
              Técnico
            </button>
          </li>
          <li>
            <button
              type="button"
              className={props.paginaAtual === "central" ? "atual" : ""}
              onClick={function () { props.onNavegar("central"); }}
            >
              Central
            </button>
          </li>
          <li>
            <button
              type="button"
              className={props.paginaAtual === "sobre" ? "atual" : ""}
              onClick={function () { props.onNavegar("sobre"); }}
            >
              Sobre
            </button>
          </li>
        </ul>
      </nav>
      {props.usuario ? (
        <p className="usuario-header">Olá, {props.usuario.nome}</p>
      ) : null}
    </header>
  );
}

export default Header;
