import { useEffect, useState } from "react";
import { buscarDocumentosComunidade } from "../servicos/apiComunidade.js";

export function useDocumentosComunidade() {
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(null);

    buscarDocumentosComunidade()
      .then(function (dados) {
        if (ativo) {
          setDocumentos(dados);
        }
      })
      .catch(function (erroRequisicao) {
        if (ativo) {
          setErro(erroRequisicao.message);
        }
      })
      .finally(function () {
        if (ativo) {
          setCarregando(false);
        }
      });

    return function () {
      ativo = false;
    };
  }, [tentativa]);

  function tentarNovamente() {
    setTentativa(tentativa + 1);
  }

  return { documentos, carregando, erro, tentarNovamente };
}
