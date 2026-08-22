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
    <form className="formulario largo" onSubmit={enviarSimulacao}>
      <label htmlFor="nome">Seu nome</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={function (evento) { setNome(evento.target.value); }}
        placeholder="Como você quer ser chamado"
      />

      <label htmlFor="tipo">Tipo de documento</label>
      <input
        id="tipo"
        type="text"
        value={tipoDocumento}
        onChange={function (evento) { setTipoDocumento(evento.target.value); }}
        placeholder="Ex: contrato, apostila, artigo"
      />

      <label htmlFor="paginas">Quantidade de páginas</label>
      <input
        id="paginas"
        type="number"
        min="1"
        value={paginas}
        onChange={function (evento) { setPaginas(evento.target.value); }}
        placeholder="1"
      />

      <label htmlFor="categoria">Álbum / pasta</label>
      <select
        id="categoria"
        value={categoria}
        onChange={function (evento) { setCategoria(evento.target.value); }}
      >
        <option value="Contratos">Contratos</option>
        <option value="Artigos">Artigos</option>
        <option value="Apostilas">Apostilas</option>
        <option value="Outros">Outros</option>
      </select>

      <label htmlFor="visibilidade">Visibilidade</label>
      <select
        id="visibilidade"
        value={visivel}
        onChange={function (evento) { setVisivel(evento.target.value); }}
      >
        <option value="publico">Público</option>
        <option value="privado">Privado</option>
      </select>

      <button className="btn" type="submit">
        Simular escaneamento
      </button>
      <p className="resultado-js">{mensagem}</p>
    </form>
  );
}

export default Simulador;
