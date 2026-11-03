import { Route, Routes } from "react-router-dom";
import PaginaInicio from "./PaginaInicio.jsx";
import PaginaFuncionamento from "./PaginaFuncionamento.jsx";
import PaginaTecnico from "./PaginaTecnico.jsx";
import PaginaSobre from "./PaginaSobre.jsx";
import PaginaCentral from "./PaginaCentral.jsx";
import RotaPrivada from "./RotaPrivada.jsx";
import PaginaNaoEncontrada from "./PaginaNaoEncontrada.jsx";

function Corpo(props) {
  return (
    <main className="flex-1 pt-6">
      <Routes>
        <Route path="/" element={<PaginaInicio onSimular={props.onSimular} />} />
        <Route path="/funcionamento" element={<PaginaFuncionamento />} />
        <Route path="/tecnico" element={<PaginaTecnico />} />
        <Route
          path="/sobre"
          element={<PaginaSobre usuario={props.usuario} onLogin={props.onLogin} onSair={props.onSair} />}
        />
        <Route
          path="/central"
          element={
            <RotaPrivada usuario={props.usuario}>
              <PaginaCentral
                documentos={props.documentos}
                lixeira={props.lixeira}
                historico={props.historico}
                onAlternarVisibilidade={props.onAlternarVisibilidade}
                onMoverLixeira={props.onMoverLixeira}
                onRecuperar={props.onRecuperar}
                onExcluirDefinitivo={props.onExcluirDefinitivo}
              />
            </RotaPrivada>
          }
        />
        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Routes>
    </main>
  );
}

export default Corpo;
