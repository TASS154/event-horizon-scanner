function Passo(props) {
  return (
    <div className="passo">
      <strong>{props.numero}</strong>
      <h3>{props.titulo}</h3>
      <p>{props.texto}</p>
    </div>
  );
}

export default Passo;
