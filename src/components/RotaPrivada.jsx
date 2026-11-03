import { Navigate, useLocation } from "react-router-dom";

function RotaPrivada(props) {
  const localizacao = useLocation();

  if (!props.usuario) {
    return (
      <Navigate
        to="/sobre"
        replace
        state={{
          motivo: "central",
          destino: {
            pathname: localizacao.pathname,
            search: localizacao.search,
            hash: localizacao.hash
          }
        }}
      />
    );
  }

  return props.children;
}

export default RotaPrivada;
