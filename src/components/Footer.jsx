import { Link, useLocation } from "react-router-dom";

function Footer() {
  const localizacao = useLocation();
  const caminho = localizacao.pathname;

  if (caminho === "/tecnico") {
    return (
      <footer className="mt-auto border-t border-gray-300 bg-gray-100 px-4 py-5 text-center text-sm text-gray-600">
        FIAP · configure <code className="font-mono">CHAVE_API</code> no script Python ·{" "}
        <Link to="/funcionamento" className="text-brand-600 underline hover:text-brand-700">
          Fluxo do usuário
        </Link>
      </footer>
    );
  }

  if (caminho === "/funcionamento") {
    return (
      <footer className="mt-auto border-t border-gray-300 bg-gray-100 px-4 py-5 text-center text-sm text-gray-600">
        FIAP ·{" "}
        <Link to="/" className="text-brand-600 underline hover:text-brand-700">
          Início
        </Link>
        {" · "}
        <Link to="/tecnico" className="text-brand-600 underline hover:text-brand-700">
          Técnico
        </Link>
      </footer>
    );
  }

  if (caminho === "/sobre") {
    return (
      <footer className="mt-auto border-t border-gray-300 bg-gray-100 px-4 py-5 text-center text-sm text-gray-600">
        FIAP · Event Horizon Scanner · documentação convertida para React
      </footer>
    );
  }

  if (caminho === "/central") {
    return (
      <footer className="mt-auto border-t border-gray-300 bg-gray-100 px-4 py-5 text-center text-sm text-gray-600">
        FIAP · Central de conteúdo salva no <code className="font-mono">localStorage</code> do navegador
      </footer>
    );
  }

  return (
    <footer className="mt-auto border-t border-gray-300 bg-gray-100 px-4 py-5 text-center text-sm text-gray-600">
      FIAP · protótipo inspirado em <code className="font-mono">AppScanner</code> ·{" "}
      <Link to="/sobre" className="text-brand-600 underline hover:text-brand-700">
        Sobre e requisitos
      </Link>
    </footer>
  );
}

export default Footer;
