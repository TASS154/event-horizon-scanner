import Header from "./components/Header.jsx";
import Corpo from "./components/Corpo.jsx";
import Footer from "./components/Footer.jsx";
import { useHistorico } from "./hooks/useHistorico.js";
import { useAuth } from "./hooks/useAuth.js";
import { useDocumentos } from "./hooks/useDocumentos.js";

function App() {
  const { historico, registrarHistorico } = useHistorico();
  const { usuario, fazerLogin, sair } = useAuth(registrarHistorico);
  const {
    documentos,
    lixeira,
    simularCaptura,
    alternarVisibilidade,
    moverLixeira,
    recuperar,
    excluirDefinitivo
  } = useDocumentos(registrarHistorico, usuario);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-[900px] flex-1 flex-col px-4 pb-8">
        <Header usuario={usuario} />
        <Corpo
          usuario={usuario}
          onLogin={fazerLogin}
          onSair={sair}
          onSimular={simularCaptura}
          documentos={documentos}
          lixeira={lixeira}
          historico={historico}
          onAlternarVisibilidade={alternarVisibilidade}
          onMoverLixeira={moverLixeira}
          onRecuperar={recuperar}
          onExcluirDefinitivo={excluirDefinitivo}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
