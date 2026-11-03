import { Link } from "react-router-dom";
import Cartao from "./Cartao.jsx";
import Slideshow from "./Slideshow.jsx";
import Simulador from "./Simulador.jsx";
import { problemas, slides, solucoes } from "../dados.js";

const classeBtn = "inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700";
const classeBtnSec = "inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 font-bold text-brand-600 hover:bg-brand-50";

function PaginaInicio(props) {
  return (
    <div>
      <h1 className="m-0 mb-4 text-2xl font-bold">
        Documentos longos: leia menos na tela, entenda mais rápido
      </h1>
      <p className="mb-3">
        <strong>Ideia principal:</strong> um aplicativo em Python que usa a câmera para "fotografar" uma folha
        (ou várias, uma captura por vez), lê o texto com OCR, manda para uma IA corrigir ou traduzir e ainda
        gera <strong>resumo em texto</strong> e <strong>áudio</strong> para você ouvir — em vez de decifrar
        muitas páginas só no olho.
      </p>

      <h2 className="mt-6 mb-3 text-xl font-bold">O problema</h2>
      <p className="mb-3">
        Contratos, artigos e apostilas costumam ser extensos. Ler tudo no celular cansa; o texto cru do OCR
        vem cheio de erro e atrapalha. Muitas vezes você precisa só do <em>miolo</em>, não de cada vírgula na
        ordem do PDF.
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        {problemas.map(function (item) {
          return <Cartao key={item.titulo} titulo={item.titulo} texto={item.texto} />;
        })}
      </div>

      <h2 className="mt-6 mb-3 text-xl font-bold">A solução</h2>
      <p className="mb-3">
        O fluxo junta <strong>visão computacional</strong> (achar e endireitar a página na imagem),
        <strong> OCR em português</strong>, <strong>IA generativa</strong> para arrumar ou traduzir o texto e
        <strong> síntese de voz</strong> para ouvir o conteúdo completo ou um resumo preparado para narração.
        No fim você pode ainda salvar um <strong>PDF</strong> com o texto tratado.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {solucoes.map(function (item) {
          return <Cartao key={item.titulo} titulo={item.titulo} texto={item.texto} />;
        })}
      </div>

      <div className="mt-6 rounded-lg border border-amber-400 bg-amber-50 p-4">
        <strong>Benefício:</strong> compreensão mais rápida e menos cansativa — por exemplo, ouvir o resumo
        no deslocamento e só depois abrir o PDF se precisar de detalhe.
      </div>

      <h2 className="mt-6 mb-3 text-xl font-bold">Veja o fluxo em imagens</h2>
      <Slideshow slides={slides} />

      <h2 className="mt-6 mb-3 text-xl font-bold">Simule o uso do scanner</h2>
      <p className="mb-3">
        Preencha o formulário para simular uma captura. O resultado usa o objeto <code>Math</code> para
        calcular confiança do OCR e tempo estimado, e grava o item no <code>localStorage</code>.
      </p>
      <Simulador onSimular={props.onSimular} />

      <h2 className="mt-6 mb-3 text-xl font-bold">Quer ver os detalhes?</h2>
      <p className="mb-3">
        Uma página explica o fluxo na prática (como se usa). A outra aprofunda bibliotecas, etapas no código e
        arquivos gerados. A Central reúne os itens capturados.
      </p>
      <div className="my-5 flex flex-wrap gap-2.5">
        <Link to="/funcionamento" className={classeBtn}>
          Como funciona (passo a passo)
        </Link>
        <Link to="/tecnico" className={classeBtnSec}>
          Detalhes técnicos
        </Link>
        <Link to="/central" className={classeBtnSec}>
          Central de conteúdo
        </Link>
        <Link to="/sobre" className={classeBtnSec}>
          Sobre o projeto
        </Link>
      </div>
    </div>
  );
}

export default PaginaInicio;
