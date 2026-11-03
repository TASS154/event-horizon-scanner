import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("Preencha os campos para testar a validação.");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const navegar = useNavigate();
  const localizacao = useLocation();

  function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function mostrarStatus(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  function enviarLogin(evento) {
    evento.preventDefault();

    const emailDigitado = email.trim();
    const senhaDigitada = senha.trim();

    if (emailDigitado === "" || senhaDigitada === "") {
      mostrarStatus("Preencha e-mail e senha para continuar.", "erro");
      return;
    }

    if (!validarEmail(emailDigitado)) {
      mostrarStatus("Digite um e-mail válido.", "erro");
      return;
    }

    if (senhaDigitada.length < 6) {
      mostrarStatus("A senha precisa ter pelo menos 6 caracteres.", "erro");
      return;
    }

    const entrou = props.onLogin(emailDigitado, senhaDigitada);

    if (!entrou) {
      mostrarStatus("E-mail ou senha não conferem com os usuários de teste.", "erro");
      return;
    }

    mostrarStatus("Login realizado com sucesso. Redirecionando...", "sucesso");
    setEmail("");
    setSenha("");

    const destino = localizacao.state && localizacao.state.destino;
    if (destino && destino.pathname) {
      navegar(destino.pathname + (destino.search || "") + (destino.hash || ""), { replace: true });
    } else {
      navegar("/central", { replace: true });
    }
  }

  const classeMensagem =
    "mt-2 rounded-md p-2.5 " +
    (tipoMensagem === "erro"
      ? "bg-perigo-100 text-perigo-600"
      : tipoMensagem === "sucesso"
      ? "bg-sucesso-100 text-sucesso-700"
      : "bg-gray-100 text-gray-700");

  if (props.usuario) {
    return (
      <div className="mt-6 rounded-lg border border-amber-400 bg-amber-50 p-4">
        <p className="m-0 mb-3">
          Você está autenticado como <strong>{props.usuario.nome}</strong> ({props.usuario.email}).
        </p>
        <button
          className="inline-flex items-center justify-center rounded-md border-2 border-brand-600 bg-white px-4 py-2.5 font-bold text-brand-600 hover:bg-brand-50"
          type="button"
          onClick={props.onSair}
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <form
      className="mt-4 flex max-w-[420px] flex-col gap-2 rounded-lg border border-gray-300 bg-white p-4"
      onSubmit={enviarLogin}
    >
      <label className="font-bold" htmlFor="email">
        E-mail
      </label>
      <input
        className="rounded-md border border-gray-400 p-2.5"
        type="email"
        id="email"
        name="email"
        placeholder="exemplo@email.com"
        autoComplete="username"
        value={email}
        onChange={function (evento) { setEmail(evento.target.value); }}
      />

      <label className="font-bold" htmlFor="senha">
        Senha
      </label>
      <input
        className="rounded-md border border-gray-400 p-2.5"
        type="password"
        id="senha"
        name="senha"
        placeholder="mínimo de 6 caracteres"
        autoComplete="current-password"
        value={senha}
        onChange={function (evento) { setSenha(evento.target.value); }}
      />

      <button
        className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700"
        type="submit"
      >
        Validar login
      </button>
      <p className={classeMensagem} role={tipoMensagem === "erro" ? "alert" : "status"} aria-live="polite">
        {mensagem}
      </p>
    </form>
  );
}

export default FormLogin;
