import { useState } from "react";

function PaginaTecnico(props) {
  const [mostrarExtra, setMostrarExtra] = useState(false);

  function alternarDetalhe() {
    setMostrarExtra(!mostrarExtra);
  }

  return (
    <div>
      <h1>Por dentro do sistema (técnico)</h1>
      <p>
        Esta página resume o que o protótipo Python faz em cada etapa: bibliotecas, funções principais e
        arquivos de saída. O modelo de linguagem usado nas chamadas é o
        <code> gemini-2.5-flash</code> (API Google GenAI).
      </p>

      <h2>1. Vídeo e detecção da folha</h2>
      <p>
        <code>cv2.VideoCapture(0)</code> lê a webcam. A cada quadro: conversão para cinza, desfoque gaussiano,
        <code>Canny</code> para bordas, busca de contornos e aproximação poligonal. Se aparecer um quadrilátero
        com área grande o suficiente, o contorno é guardado e desenhado em verde. Funções auxiliares
        <code>ordenar_pontos</code> e <code>transformar_perspectiva</code> (NumPy + <code>warpPerspective</code>)
        “endireitam” a região da página antes do OCR.
      </p>

      <h2>2. Pré-processamento e OCR</h2>
      <p>
        Se não houver contorno válido na hora da captura, usa-se o quadro inteiro. Depois: cinza, desfoque,
        <code>adaptiveThreshold</code> para binarizar e <code>pytesseract.image_to_string</code> com
        <code>lang='por'</code> e <code>--psm 6</code>. Sem texto retornado, o fluxo para com mensagem de erro.
      </p>

      <h2>3. Chamada à IA (texto)</h2>
      <p>
        O texto bruto é enviado em um prompt que pede correção de pontuação e formatação e, conforme o combo da
        interface, tradução para inglês ou espanhol. A resposta vira o <code>texto_final</code> na tela.
        Para “áudio resumido”, há uma segunda chamada pedindo um resumo fluido para narração antes do TTS.
      </p>

      <h2>4. Interface e concorrência</h2>
      <p>
        A UI é <strong>CustomTkinter</strong> em modo escuro. O processamento pesado (OCR + API) e a geração de
        áudio rodam em <strong>threads</strong> para não travar a janela. O áudio usa <code>asyncio.run</code>
        com <code>edge_tts.Communicate</code> para salvar <code>Leitura.mp3</code>.
      </p>

      <h2>5. Exportação</h2>
      <p>
        <strong>FPDF</strong> monta <code>Documento_Escaneado.pdf</code> com título e o texto final. O Windows
        abre PDF e MP3 com <code>os.startfile</code> após gerar.
      </p>

      <h2>Stack (bibliotecas)</h2>
      <div className="tags">
        <span>OpenCV</span>
        <span>NumPy</span>
        <span>pytesseract</span>
        <span>google-genai</span>
        <span>CustomTkinter</span>
        <span>Pillow</span>
        <span>FPDF</span>
        <span>edge-tts</span>
        <span>asyncio</span>
        <span>threading</span>
      </div>

      <div className="linha-botoes">
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("inicio"); }}>
          Landing
        </button>
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("funcionamento"); }}>
          Como funciona
        </button>
        <button className="btn" type="button" onClick={function () { props.onNavegar("sobre"); }}>
          Sobre / API key
        </button>
      </div>

      <h2>Detalhes extras do protótipo</h2>
      <button className="btn btn-sec" type="button" onClick={alternarDetalhe}>
        {mostrarExtra ? "Ocultar detalhes técnicos" : "Mostrar detalhes técnicos"}
      </button>
      {mostrarExtra ? (
        <div className="aviso">
          <p>
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
