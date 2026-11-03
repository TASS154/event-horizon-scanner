import { useState } from "react";
import { lerLocalStorage, salvarLocalStorage, criarId } from "../armazenamento.js";

export function useHistorico() {
  const [historico, setHistorico] = useState(lerLocalStorage("ehs-historico", []));

  function registrarHistorico(texto) {
    const item = {
      id: criarId(),
      texto: texto,
      data: new Date().toLocaleString("pt-BR")
    };
    const novoHistorico = [item].concat(historico);
    setHistorico(novoHistorico);
    salvarLocalStorage("ehs-historico", novoHistorico);
  }

  return { historico, registrarHistorico };
}
