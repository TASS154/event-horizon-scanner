import { useState } from "react";
import { lerLocalStorage, salvarLocalStorage } from "../armazenamento.js";
import { usuariosTeste } from "../dados.js";

export function useAuth(registrarHistorico) {
  const [usuario, setUsuario] = useState(lerLocalStorage("ehs-usuario", null));

  function fazerLogin(email, senha) {
    let encontrado = null;

    for (let i = 0; i < usuariosTeste.length; i++) {
      if (usuariosTeste[i].email === email && usuariosTeste[i].senha === senha) {
        encontrado = usuariosTeste[i];
      }
    }

    if (!encontrado) {
      return false;
    }

    const dadosUsuario = {
      nome: encontrado.nome,
      email: encontrado.email
    };

    setUsuario(dadosUsuario);
    salvarLocalStorage("ehs-usuario", dadosUsuario);
    registrarHistorico("Login de " + dadosUsuario.nome);
    return true;
  }

  function sair() {
    setUsuario(null);
    localStorage.removeItem("ehs-usuario");
    registrarHistorico("Saída da conta");
  }

  return { usuario, fazerLogin, sair };
}
