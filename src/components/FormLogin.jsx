import { useState } from "react";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("Preencha os campos para testar a validação.");
  const [tipoMensagem, setTipoMensagem] = useState("");

  function validarEmail(valor) {
    return valor.includes("@") && valor.includes(".");
  }

  /*
    Revisão da IA
    Antes: cada if do login repetia setMensagem, setTipoMensagem e alert.
    Agora: uma função recebe o texto e o tipo (erro ou sucesso).
    Motivo: a mensagem da tela e o alerta saíam diferentes quando alguém alterava só um dos três.
  */
  function mostrarStatus(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);
    alert(texto);
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

    mostrarStatus("Login validado com sucesso. Os dados ficam salvos no localStorage.", "sucesso");
    setEmail("");
    setSenha("");
  }

  if (props.usuario) {
    return (
      <div className="aviso">
        <p>
          Você está autenticado como <strong>{props.usuario.nome}</strong> ({props.usuario.email}).
        </p>
        <button className="btn btn-sec" type="button" onClick={props.onSair}>
          Sair
        </button>
      </div>
    );
  }

  return (
    <form className="formulario" onSubmit={enviarLogin}>
      <label htmlFor="email">E-mail</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="exemplo@email.com"
        value={email}
        onChange={function (evento) { setEmail(evento.target.value); }}
      />

      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        name="senha"
        placeholder="mínimo de 6 caracteres"
        value={senha}
        onChange={function (evento) { setSenha(evento.target.value); }}
      />

      <button className="btn" type="submit">
        Validar login
      </button>
      <p className={"mensagem" + (tipoMensagem ? " " + tipoMensagem : "")}>{mensagem}</p>
    </form>
  );
}

export default FormLogin;
