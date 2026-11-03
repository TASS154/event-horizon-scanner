import { NavLink } from "react-router-dom";

const linkBase = "font-bold text-brand-600 hover:text-brand-700";
const linkAtual = "text-gray-900 underline";

function Header(props) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-gray-200 py-4">
      <p className="m-0 text-lg">
        <NavLink to="/" className={linkBase + " no-underline"}>
          Event Horizon Scanner
        </NavLink>
      </p>
      <nav>
        <ul className="m-0 flex flex-wrap gap-x-4 gap-y-2 p-0">
          <li>
            <NavLink
              to="/"
              end
              className={function (estado) {
                return estado.isActive ? linkBase + " " + linkAtual : linkBase;
              }}
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/funcionamento"
              className={function (estado) {
                return estado.isActive ? linkBase + " " + linkAtual : linkBase;
              }}
            >
              Como funciona
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tecnico"
              className={function (estado) {
                return estado.isActive ? linkBase + " " + linkAtual : linkBase;
              }}
            >
              Técnico
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/central"
              className={function (estado) {
                return estado.isActive ? linkBase + " " + linkAtual : linkBase;
              }}
            >
              Central
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sobre"
              className={function (estado) {
                return estado.isActive ? linkBase + " " + linkAtual : linkBase;
              }}
            >
              Sobre
            </NavLink>
          </li>
        </ul>
      </nav>
      {props.usuario ? <p className="m-0 text-sm text-gray-600">Olá, {props.usuario.nome}</p> : null}
    </header>
  );
}

export default Header;
