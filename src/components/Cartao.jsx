function Cartao(props) {
  return (
    <div className="cartao">
      <h3>{props.titulo}</h3>
      <p>{props.texto}</p>
    </div>
  );
}

export default Cartao;
