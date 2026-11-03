function Cartao(props) {
  return (
    <div className="flex-1 basis-60 rounded-lg border border-gray-300 bg-white p-4">
      <h3 className="m-0 mb-2 text-base font-bold">{props.titulo}</h3>
      <p className="m-0 text-sm text-gray-700">{props.texto}</p>
    </div>
  );
}

export default Cartao;
