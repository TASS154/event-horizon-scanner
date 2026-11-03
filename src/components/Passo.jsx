function Passo(props) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-3 md:min-w-[120px] md:flex-1 md:basis-36">
      <strong className="mb-1.5 block text-sm text-brand-600">{props.numero}</strong>
      <h3 className="m-0 mb-1 text-base font-bold">{props.titulo}</h3>
      <p className="m-0 text-sm text-gray-700">{props.texto}</p>
    </div>
  );
}

export default Passo;
