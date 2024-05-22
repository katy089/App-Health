import { useLocation } from "react-router-dom";

function NavItem({ name, link }) {
  const { pathname } = useLocation();
  const isThisLink = pathname === link;

  return (
    <li className="nav-item">
      <a
        href={link}
        className="nav-link mx-1 py-3"
        id="nav-link"
        style={{
          borderBottom: isThisLink ? "2px solid #7749f8" : "",
          color: isThisLink ? "#7749f8" : "",
        }}
      >
        {name}
      </a>
    </li>
  );
}

export default NavItem;
