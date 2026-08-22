import PaginaInicio from "./PaginaInicio.jsx";
import PaginaFuncionamento from "./PaginaFuncionamento.jsx";
import PaginaTecnico from "./PaginaTecnico.jsx";
import PaginaSobre from "./PaginaSobre.jsx";
import PaginaCentral from "./PaginaCentral.jsx";

function Corpo(props) {
  /*
    Revisão da IA
    Antes: o App.jsx montava as cinco páginas no mesmo return, com if gigante no meio do layout.
    Agora: o Corpo escolhe a página e o Header/Footer ficam de fora.
    Motivo: Header e Footer não precisavam ser desenhados de novo dentro de cada tela.
  */
  let conteudo;

  if (props.pagina === "funcionamento") {
    conteudo = <PaginaFuncionamento onNavegar={props.onNavegar} />;
  } else if (props.pagina === "tecnico") {
    conteudo = <PaginaTecnico onNavegar={props.onNavegar} />;
  } else if (props.pagina === "sobre") {
    conteudo = (
      <PaginaSobre
        onNavegar={props.onNavegar}
        usuario={props.usuario}
        onLogin={props.onLogin}
        onSair={props.onSair}
      />
    );
  } else if (props.pagina === "central") {
    conteudo = (
      <PaginaCentral
        documentos={props.documentos}
        lixeira={props.lixeira}
        historico={props.historico}
        onAlternarVisibilidade={props.onAlternarVisibilidade}
        onMoverLixeira={props.onMoverLixeira}
        onRecuperar={props.onRecuperar}
        onExcluirDefinitivo={props.onExcluirDefinitivo}
      />
    );
  } else {
    conteudo = (
      <PaginaInicio onNavegar={props.onNavegar} onSimular={props.onSimular} />
    );
  }

  return <main>{conteudo}</main>;
}

export default Corpo;
