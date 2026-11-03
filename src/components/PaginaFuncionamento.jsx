import { Link } from "react-router-dom";
import Passo from "./Passo.jsx";
import { passos } from "../dados.js";

const classeBtn = "inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700";
const classeBtnSec = "inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 font-bold text-brand-600 hover:bg-brand-50";

function PaginaFuncionamento() {
  return (
    <div>
      <h1 className="m-0 mb-4 text-2xl font-bold">Como funciona na prática</h1>
      <p className="mb-3">
        Abaixo está o fluxo do ponto de vista de <strong>quem usa o app</strong>, do momento em que liga a
        câmera até ter texto, PDF ou áudio. (No código isso corresponde à classe <code>AppScanner</code> e aos
        botões da tela escura em CustomTkinter.)
      </p>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap">
        {passos.map(function (item) {
          return <Passo key={item.numero} numero={item.numero} titulo={item.titulo} texto={item.texto} />;
        })}
      </div>

      <div className="mt-6 rounded-lg border border-amber-400 bg-amber-50 p-4">
        <strong>Observação:</strong> cada página é uma captura. Para várias folhas, o fluxo natural é repetir
        captura + exportação (o protótipo não junta várias páginas num único PDF automaticamente).
      </div>

      <div className="my-5 flex flex-wrap gap-2.5">
        <Link to="/" className={classeBtnSec}>
          Voltar à landing
        </Link>
        <Link to="/tecnico" className={classeBtn}>
          Ver detalhes técnicos
        </Link>
        <Link to="/sobre" className={classeBtnSec}>
          Sobre o projeto
        </Link>
      </div>
    </div>
  );
}

export default PaginaFuncionamento;
