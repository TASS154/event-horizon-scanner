import { useState } from "react";

function Simulador(props) {
  const [nome, setNome] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [paginas, setPaginas] = useState("");
  const [categoria, setCategoria] = useState("Contratos");
  const [visivel, setVisivel] = useState("publico");
  const [mensagem, setMensagem] = useState("Nenhuma simulação executada ainda.");

  function enviarSimulacao(evento) {
    evento.preventDefault();

    const nomeLimpo = nome.trim();
    const tipoLimpo = tipoDocumento.trim();
    const quantidadePaginas = Number(paginas);

    if (nomeLimpo === "") {
      alert("Preencha o nome.");
      setMensagem("O nome está vazio.");
      return;
    }

    if (tipoLimpo === "") {
      alert("Preencha o tipo de documento.");
      setMensagem("O tipo de documento está vazio.");
      return;
    }

    if (paginas.trim() === "") {
      alert("Preencha a quantidade de páginas.");
      setMensagem("A quantidade de páginas está vazia.");
      return;
    }

    if (isNaN(quantidadePaginas) || quantidadePaginas <= 0) {
      alert("Digite uma quantidade válida de páginas.");
      setMensagem("A quantidade de páginas precisa ser um número maior que zero.");
      return;
    }

    const resultado = props.onSimular({
      nome: nomeLimpo,
      tipoDocumento: tipoLimpo,
      paginas: quantidadePaginas,
      categoria: categoria,
      publico: visivel === "publico"
    });

    const texto =
      "Olá, " +
      nomeLimpo +
      "! O Event Horizon Scanner iniciaria a leitura de " +
      quantidadePaginas +
      " página(s) do documento \"" +
      tipoLimpo +
      "\". Confiança do OCR: " +
      resultado.confianca +
      "%. Tempo estimado: " +
      resultado.tempo +
      "s.";

    alert(texto);
    setMensagem(texto + " Confira o item na página Central.");
    setNome("");
    setTipoDocumento("");
    setPaginas("");
    setCategoria("Contratos");
    setVisivel("publico");
  }

  return (
    <form className="mt-4 flex w-full flex-col gap-2 rounded-lg border border-gray-300 bg-white p-4" onSubmit={enviarSimulacao}>
      <label className="font-bold" htmlFor="nome">
        Seu nome
      </label>
      <input
        className="rounded-md border border-gray-400 p-2.5"
        id="nome"
        type="text"
        value={nome}
        onChange={function (evento) { setNome(evento.target.value); }}
        placeholder="Como você quer ser chamado"
      />

      <label className="font-bold" htmlFor="tipo">
        Tipo de documento
      </label>
      <input
        className="rounded-md border border-gray-400 p-2.5"
        id="tipo"
        type="text"
        value={tipoDocumento}
        onChange={function (evento) { setTipoDocumento(evento.target.value); }}
        placeholder="Ex: contrato, apostila, artigo"
      />

      <label className="font-bold" htmlFor="paginas">
        Quantidade de páginas
      </label>
      <input
        className="rounded-md border border-gray-400 p-2.5"
        id="paginas"
        type="number"
        min="1"
        value={paginas}
        onChange={function (evento) { setPaginas(evento.target.value); }}
        placeholder="1"
      />

      <label className="font-bold" htmlFor="categoria">
        Álbum / pasta
      </label>
      <select
        className="rounded-md border border-gray-400 p-2.5"
        id="categoria"
        value={categoria}
        onChange={function (evento) { setCategoria(evento.target.value); }}
      >
        <option value="Contratos">Contratos</option>
        <option value="Artigos">Artigos</option>
        <option value="Apostilas">Apostilas</option>
        <option value="Outros">Outros</option>
      </select>

      <label className="font-bold" htmlFor="visibilidade">
        Visibilidade
      </label>
      <select
        className="rounded-md border border-gray-400 p-2.5"
        id="visibilidade"
        value={visivel}
        onChange={function (evento) { setVisivel(evento.target.value); }}
      >
        <option value="publico">Público</option>
        <option value="privado">Privado</option>
      </select>

      <button
        className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700"
        type="submit"
      >
        Simular escaneamento
      </button>
      <p className="mt-1 rounded-md border border-brand-100 bg-brand-50 p-3 font-bold">{mensagem}</p>
    </form>
  );
}

export default Simulador;
