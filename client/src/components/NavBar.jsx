import { Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import NavItem from "./NavItem";

const links = [
  {
    name: "Inicio",
    link: "/home",
  },
  {
    name: "Teleconsultas",
    link: "/teleconsults",
  },
  {
    name: "Chats",
    link: "/chats",
  },
  {
    name: "Perfil",
    link: "/profile",
  },
];

const noAuthenticated = ["/", "/login", "/signup"];

function NavBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [cookies] = useCookies(["health_link_user_token"]);
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => setCollapse(!collapse);

  useEffect(() => {
    const token = cookies.health_link_user_token;
    if (token) dispatch(logIn(jwtDecode(token)));
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top bg-light border-bottom p-0 m-0 container-fluid"
      id="navBar"
    >
      <div className="container-fluid">
        <div className="navbar-brand ms-2" href="/">
          <Image src="/logo.png" alt="logo" height={50} />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
          aria-controls="menu"
          aria-expanded="true"
          aria-label="Toggle navigation"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="w-100"></div>
        <div
          className={
            collapse
              ? "navbar-collapse collapse show"
              : "navbar-collapse collapse"
          }
          id="menu"
        >
          {!noAuthenticated.includes(pathname) && (
            <ul className="navbar-nav">
              {links.map(({ name, link }, i) => (
                <NavItem key={`${name} ${i}`} name={name} link={link} />
              ))}
            </ul>
          )}
          <ul className="navbar-nav ms-auto"></ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
