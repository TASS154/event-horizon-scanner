import FormLogin from "./FormLogin.jsx";

function PaginaSobre(props) {
  return (
    <div>
      <h1>Sobre este site e o protótipo</h1>
      <p>
        Este conjunto de páginas descreve a ideia do <strong>Event Horizon Scanner</strong>, um
        protótipo acadêmico desenvolvido no contexto da <strong>FIAP</strong> (Sprint), inspirado no código da
        aplicação desktop <code>AppScanner</code> em Python.
      </p>
      <p>
        O site não executa o app: ele só explica a proposta (landing), o uso (como funciona) e a implementação
        (página técnica). Para rodar o scanner de verdade é preciso Python, dependências instaladas, Tesseract
        no sistema e uma chave da API Google.
      </p>

      <h2>Requisitos rápidos</h2>
      <ul className="lista-destaque">
        <li>Preencher <code>CHAVE_API</code> no código; sem isso o cliente GenAI não é criado e a IA não roda.</li>
        <li>Instalar o Tesseract e apontar <code>pytesseract.pytesseract.tesseract_cmd</code> no Windows, como no script.</li>
        <li>Webcam disponível para a captura ao vivo.</li>
      </ul>

      <h2>Mapa do site</h2>
      <ul className="lista-destaque">
        <li><strong>Início</strong> — ideia, problema e solução na mesma página (landing).</li>
        <li><strong>Como funciona</strong> — fluxo do usuário, passo a passo.</li>
        <li><strong>Técnico</strong> — pipeline, bibliotecas e detalhes do código.</li>
        <li><strong>Central</strong> — itens capturados, busca, estatísticas, histórico e lixeira.</li>
        <li><strong>Sobre</strong> — esta página.</li>
      </ul>

      <h2>Login de demonstração</h2>
      <p>Este formulário valida campos e autentica usuários de teste. O usuário logado fica no localStorage.</p>
      <FormLogin usuario={props.usuario} onLogin={props.onLogin} onSair={props.onSair} />

      <div className="linha-botoes">
        <button className="btn" type="button" onClick={function () { props.onNavegar("inicio"); }}>
          Ir para a landing
        </button>
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("funcionamento"); }}>
          Como funciona
        </button>
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("tecnico"); }}>
          Técnico
        </button>
      </div>
    </div>
  );
}

export default PaginaSobre;
