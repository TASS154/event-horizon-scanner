import { useState } from "react";

function Slideshow(props) {
  const [indice, setIndice] = useState(0);
  const slide = props.slides[indice];

  function avancarSlide() {
    setIndice((indice + 1) % props.slides.length);
  }

  function voltarSlide() {
    setIndice((indice - 1 + props.slides.length) % props.slides.length);
  }

  return (
    <section
      className="mt-4 rounded-lg border border-gray-300 bg-white p-4"
      aria-label="Slideshow do funcionamento do projeto"
    >
      <img src={slide.src} alt={slide.alt} className="block w-full rounded-lg border border-gray-200" />
      <div className="mt-3">
        <h3 className="m-0 mb-2 text-lg font-bold">{slide.titulo}</h3>
        <p className="m-0 mb-2 text-gray-700">{slide.texto}</p>
        <p className="m-0 font-bold text-brand-600">
          {indice + 1} / {props.slides.length}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <button
          className="inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 font-bold text-brand-600 hover:bg-brand-50"
          type="button"
          onClick={voltarSlide}
        >
          Imagem anterior
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700"
          type="button"
          onClick={avancarSlide}
        >
          Próxima imagem
        </button>
      </div>
    </section>
  );
}

export default Slideshow;
