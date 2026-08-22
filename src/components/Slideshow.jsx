import { useState } from "react";

function Slideshow(props) {
  const [indice, setIndice] = useState(0);
  const slide = props.slides[indice];

  function avancarSlide() {
    /*
      Revisão da IA
      Antes: if (indice === 2) setIndice(0); else setIndice(indice + 1);
      Agora: o próximo índice usa o resto da divisão pelo tamanho da lista.
      Motivo: o 2 estava cravado para três imagens; um slide a mais quebraria o carrossel.
    */
    setIndice((indice + 1) % props.slides.length);
  }

  function voltarSlide() {
    /*
      Revisão da IA
      Antes: dois ifs iguais aos do avanço, só invertendo o número.
      Agora: soma o tamanho da lista antes do resto, para o índice 0 voltar ao último.
      Motivo: a mesma conta serve para qualquer quantidade de slides, sem copiar o if.
    */
    setIndice((indice - 1 + props.slides.length) % props.slides.length);
  }

  return (
    <section className="slideshow" aria-label="Slideshow do funcionamento do projeto">
      <img src={slide.src} alt={slide.alt} />
      <div className="slide-info">
        <h3>{slide.titulo}</h3>
        <p>{slide.texto}</p>
        <p className="contador-slide">
          {indice + 1} / {props.slides.length}
        </p>
      </div>
      <div className="linha-botoes">
        <button className="btn btn-sec" type="button" onClick={voltarSlide}>
          Imagem anterior
        </button>
        <button className="btn" type="button" onClick={avancarSlide}>
          Próxima imagem
        </button>
      </div>
    </section>
  );
}

export default Slideshow;
