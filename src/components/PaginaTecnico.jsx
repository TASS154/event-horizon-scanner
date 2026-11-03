import { useState } from "react";
import { Link } from "react-router-dom";
import { tecnologias } from "../dados.js";

const classeBtn = "inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700";
const classeBtnSec = "inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 font-bold text-brand-600 hover:bg-brand-50";

function PaginaTecnico() {
  const [mostrarExtra, setMostrarExtra] = useState(false);

  function alternarDetalhe() {
    setMostrarExtra(!mostrarExtra);
  }

  return (
    <div>
      <h1 className="m-0 mb-4 text-2xl font-bold">Por dentro do sistema (técnico)</h1>
      <p className="mb-3">
        Esta página resume o que o protótipo Python faz em cada etapa: bibliotecas, funções principais e
        arquivos de saída. O modelo de linguagem usado nas chamadas é o
        <code> gemini-2.5-flash</code> (API Google GenAI).
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">1. Vídeo e detecção da folha</h2>
      <p className="mb-3">
        <code>cv2.VideoCapture(0)</code> lê a webcam. A cada quadro: conversão para cinza, desfoque gaussiano,
        <code>Canny</code> para bordas, busca de contornos e aproximação poligonal. Se aparecer um quadrilátero
        com área grande o suficiente, o contorno é guardado e desenhado em verde. Funções auxiliares
        <code>ordenar_pontos</code> e <code>transformar_perspectiva</code> (NumPy + <code>warpPerspective</code>)
        "endireitam" a região da página antes do OCR.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">2. Pré-processamento e OCR</h2>
      <p className="mb-3">
        Se não houver contorno válido na hora da captura, usa-se o quadro inteiro. Depois: cinza, desfoque,
        <code>adaptiveThreshold</code> para binarizar e <code>pytesseract.image_to_string</code> com
        <code>lang='por'</code> e <code>--psm 6</code>. Sem texto retornado, o fluxo para com mensagem de erro.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">3. Chamada à IA (texto)</h2>
      <p className="mb-3">
        O texto bruto é enviado em um prompt que pede correção de pontuação e formatação e, conforme o combo da
        interface, tradução para inglês ou espanhol. A resposta vira o <code>texto_final</code> na tela.
        Para "áudio resumido", há uma segunda chamada pedindo um resumo fluido para narração antes do TTS.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">4. Interface e concorrência</h2>
      <p className="mb-3">
        A UI é <strong>CustomTkinter</strong> em modo escuro. O processamento pesado (OCR + API) e a geração de
        áudio rodam em <strong>threads</strong> para não travar a janela. O áudio usa <code>asyncio.run</code>
        com <code>edge_tts.Communicate</code> para salvar <code>Leitura.mp3</code>.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">5. Exportação</h2>
      <p className="mb-3">
        <strong>FPDF</strong> monta <code>Documento_Escaneado.pdf</code> com título e o texto final. O Windows
        abre PDF e MP3 com <code>os.startfile</code> após gerar.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">Stack (bibliotecas)</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {tecnologias.map(function (item) {
          return (
            <span key={item} className="rounded bg-gray-200 px-2.5 py-1 font-mono text-sm">
              {item}
            </span>
          );
        })}
      </div>

      <div className="my-5 flex flex-wrap gap-2.5">
        <Link to="/" className={classeBtnSec}>
          Landing
        </Link>
        <Link to="/funcionamento" className={classeBtnSec}>
          Como funciona
        </Link>
        <Link to="/sobre" className={classeBtn}>
          Sobre / API key
        </Link>
      </div>

      <h2 className="mt-6 mb-3 text-xl font-bold">Detalhes extras do protótipo</h2>
      <button className={classeBtnSec} type="button" onClick={alternarDetalhe}>
        {mostrarExtra ? "Ocultar detalhes técnicos" : "Mostrar detalhes técnicos"}
      </button>
      {mostrarExtra ? (
        <div className="mt-6 rounded-lg border border-amber-400 bg-amber-50 p-4">
          <p className="m-0">
            O protótipo simula um fluxo em que a imagem capturada passa por OCR, tratamento com IA e geração de
            conteúdo em texto ou áudio. A proposta ainda não executa essas tecnologias de forma real, mas
            representa a lógica esperada para uma versão futura.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default PaginaTecnico;
