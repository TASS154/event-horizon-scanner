import Passo from "./Passo.jsx";
import { passos } from "../dados.js";

function PaginaFuncionamento(props) {
  return (
    <div>
      <h1>Como funciona na prática</h1>
      <p>
        Abaixo está o fluxo do ponto de vista de <strong>quem usa o app</strong>, do momento em que liga a
        câmera até ter texto, PDF ou áudio. (No código isso corresponde à classe <code>AppScanner</code> e aos
        botões da tela escura em CustomTkinter.)
      </p>

      <div className="passos">
        {/*
          Revisão da IA
          Antes: cinco blocos .passo iguais, só mudando o número e o texto na mão.
          Agora: um componente Passo recebe numero, titulo e texto por props.
          Motivo: o layout do passo existia cinco vezes; mudar o visual exigia editar os cinco.
        */}
        {passos.map(function (item) {
          return (
            <Passo
              key={item.numero}
              numero={item.numero}
              titulo={item.titulo}
              texto={item.texto}
            />
          );
        })}
      </div>

      <div className="aviso">
        <strong>Observação:</strong> cada página é uma captura. Para várias folhas, o fluxo natural é repetir
        captura + exportação (o protótipo não junta várias páginas num único PDF automaticamente).
      </div>

      <div className="linha-botoes">
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("inicio"); }}>
          Voltar à landing
        </button>
        <button className="btn" type="button" onClick={function () { props.onNavegar("tecnico"); }}>
          Ver detalhes técnicos
        </button>
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("sobre"); }}>
          Sobre o projeto
        </button>
      </div>
    </div>
  );
}

export default PaginaFuncionamento;
