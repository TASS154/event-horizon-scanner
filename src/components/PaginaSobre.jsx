import { Link, useLocation } from "react-router-dom";
import FormLogin from "./FormLogin.jsx";

const classeBtn = "inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700";
const classeBtnSec = "inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 font-bold text-brand-600 hover:bg-brand-50";

function PaginaSobre(props) {
  const localizacao = useLocation();
  const veioDaCentral = localizacao.state && localizacao.state.motivo === "central";

  return (
    <div>
      <h1 className="m-0 mb-4 text-2xl font-bold">Sobre este site e o protótipo</h1>

      {veioDaCentral ? (
        <div className="mb-4 rounded-lg border border-perigo-600 bg-perigo-100 p-4 text-perigo-600">
          A página <strong>Central</strong> é uma rota privada: faça login abaixo para acessá-la.
        </div>
      ) : null}

      <p className="mb-3">
        Este conjunto de páginas descreve a ideia do <strong>Event Horizon Scanner</strong>, um
        protótipo acadêmico desenvolvido no contexto da <strong>FIAP</strong> (Sprint), inspirado no código da
        aplicação desktop <code>AppScanner</code> em Python.
      </p>
      <p className="mb-3">
        O site não executa o app: ele só explica a proposta (landing), o uso (como funciona) e a implementação
        (página técnica). Para rodar o scanner de verdade é preciso Python, dependências instaladas, Tesseract
        no sistema e uma chave da API Google.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">Requisitos rápidos</h2>
      <ul className="mt-4 list-disc pl-5">
        <li className="mb-2">
          Preencher <code>CHAVE_API</code> no código; sem isso o cliente GenAI não é criado e a IA não roda.
        </li>
        <li className="mb-2">
          Instalar o Tesseract e apontar <code>pytesseract.pytesseract.tesseract_cmd</code> no Windows, como no
          script.
        </li>
        <li className="mb-2">Webcam disponível para a captura ao vivo.</li>
      </ul>

      <h2 className="mt-6 mb-3 text-xl font-bold">Mapa do site</h2>
      <ul className="mt-4 list-disc pl-5">
        <li className="mb-2">
          <strong>Início</strong> — ideia, problema e solução na mesma página (landing).
        </li>
        <li className="mb-2">
          <strong>Como funciona</strong> — fluxo do usuário, passo a passo.
        </li>
        <li className="mb-2">
          <strong>Técnico</strong> — pipeline, bibliotecas e detalhes do código.
        </li>
        <li className="mb-2">
          <strong>Central</strong> (rota privada) — itens capturados, busca, estatísticas, histórico, lixeira
          e documentos públicos da comunidade.
        </li>
        <li className="mb-2">
          <strong>Sobre</strong> — esta página.
        </li>
      </ul>

      <h2 className="mt-6 mb-3 text-xl font-bold">Login de demonstração</h2>
      <p className="mb-3">
        Este formulário valida campos e autentica usuários de teste. O usuário logado fica no localStorage e
        libera o acesso à rota privada <code>/central</code>.
      </p>
      <FormLogin usuario={props.usuario} onLogin={props.onLogin} onSair={props.onSair} />

      <div className="my-5 flex flex-wrap gap-2.5">
        <Link to="/" className={classeBtn}>
          Ir para a landing
        </Link>
        <Link to="/funcionamento" className={classeBtnSec}>
          Como funciona
        </Link>
        <Link to="/tecnico" className={classeBtnSec}>
          Técnico
        </Link>
      </div>
    </div>
  );
}

export default PaginaSobre;
