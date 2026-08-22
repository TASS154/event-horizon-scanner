import Cartao from "./Cartao.jsx";
import Slideshow from "./Slideshow.jsx";
import Simulador from "./Simulador.jsx";
import { problemas, slides } from "../dados.js";

function PaginaInicio(props) {
  return (
    <div>
      <h1>Documentos longos: leia menos na tela, entenda mais rápido</h1>
      <p>
        <strong>Ideia principal:</strong> um aplicativo em Python que usa a câmera para “fotografar” uma folha
        (ou várias, uma captura por vez), lê o texto com OCR, manda para uma IA corrigir ou traduzir e ainda
        gera <strong>resumo em texto</strong> e <strong>áudio</strong> para você ouvir — em vez de decifrar
        muitas páginas só no olho.
      </p>

      <h2>O problema</h2>
      <p>
        Contratos, artigos e apostilas costumam ser extensos. Ler tudo no celular cansa; o texto cru do OCR
        vem cheio de erro e atrapalha. Muitas vezes você precisa só do <em>miolo</em>, não de cada vírgula na
        ordem do PDF.
      </p>
      <div className="linha-cartoes">
        {problemas.map(function (item) {
          return <Cartao key={item.titulo} titulo={item.titulo} texto={item.texto} />;
        })}
      </div>

      <h2>A solução</h2>
      <p>
        O fluxo junta <strong>visão computacional</strong> (achar e endireitar a página na imagem),
        <strong> OCR em português</strong>, <strong>IA generativa</strong> para arrumar ou traduzir o texto e
        <strong> síntese de voz</strong> para ouvir o conteúdo completo ou um resumo preparado para narração.
        No fim você pode ainda salvar um <strong>PDF</strong> com o texto tratado.
      </p>
      <div className="linha-cartoes">
        <Cartao
          titulo="Scan inteligente"
          texto="Detecta a folha na câmera e corrige a perspectiva antes de ler os caracteres."
        />
        <Cartao
          titulo="Texto com IA"
          texto="Correção e formatação; opção de traduzir para inglês ou espanhol."
        />
        <Cartao
          titulo="Áudio"
          texto="Leitura integral ou versão resumida para ouvir no lugar de ler."
        />
        <Cartao
          titulo="Arquivo"
          texto="Exporta PDF para guardar ou compartilhar o resultado."
        />
      </div>

      <div className="aviso">
        <strong>Benefício:</strong> compreensão mais rápida e menos cansativa — por exemplo, ouvir o resumo
        no deslocamento e só depois abrir o PDF se precisar de detalhe.
      </div>

      <h2>Veja o fluxo em imagens</h2>
      <Slideshow slides={slides} />

      <h2>Simule o uso do scanner</h2>
      <p>
        Preencha o formulário para simular uma captura. O resultado usa o objeto <code>Math</code> para
        calcular confiança do OCR e tempo estimado, e grava o item no <code>localStorage</code>.
      </p>
      <Simulador onSimular={props.onSimular} />

      <h2>Quer ver os detalhes?</h2>
      <p>
        Uma página explica o fluxo na prática (como se usa). A outra aprofunda bibliotecas, etapas no código e
        arquivos gerados. A Central reúne os itens capturados.
      </p>
      <div className="linha-botoes">
        <button className="btn" type="button" onClick={function () { props.onNavegar("funcionamento"); }}>
          Como funciona (passo a passo)
        </button>
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("tecnico"); }}>
          Detalhes técnicos
        </button>
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("central"); }}>
          Central de conteúdo
        </button>
        <button className="btn btn-sec" type="button" onClick={function () { props.onNavegar("sobre"); }}>
          Sobre o projeto
        </button>
      </div>
    </div>
  );
}

export default PaginaInicio;
