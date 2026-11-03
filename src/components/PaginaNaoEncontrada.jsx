import { Link } from "react-router-dom";

function PaginaNaoEncontrada() {
  return (
    <section className="mx-auto max-w-2xl py-12 text-center">
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-600">Erro 404</p>
      <h1 className="mb-4 text-3xl font-bold">Página não encontrada</h1>
      <p className="mb-6 text-gray-700">
        O endereço acessado não existe ou foi movido. Confira o endereço ou volte para a página inicial.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 font-bold text-white hover:bg-brand-700"
      >
        Voltar ao início
      </Link>
    </section>
  );
}

export default PaginaNaoEncontrada;
