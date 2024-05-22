import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/userSlice";

import { FaEdit } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

function Profile() {
  const { profile_image, fullname, sex } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [cookies, setCookie, deleteCookie] = useCookies([
    "health_link_user_token",
  ]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    deleteCookie("health_link_user_token");
    navigate("/");
  };

  useEffect(() => {
    if (profile_image && fullname && sex) setIsLoading(false);
  }, [profile_image, fullname, sex]);

  if (isLoading)
    return (
      <div style={{ minHeight: "80vh" }} className="loading">
        <div className="loading-circle"></div>
      </div>
    );

  return (
    <section className="d-flex flex-column align-items-center">
      <h2>
        Bienvenid{sex === "male" ? "o" : "a"} {fullname.split(" ").shift()}
      </h2>
      <Image
        src={profile_image}
        width={150}
        className="rounded-circle border border-black"
      />

      <ul
        className="d-flex flex-column justify-content-center p-0 gap-3 mt-4 text-bold fs-5"
        style={{ listStyle: "none" }}
      >
        <li>
          <a
            href="/profile/edit"
            style={{ textDecoration: "none" }}
            className="text-black"
          >
            <FaEdit /> Editar perfil
          </a>
        </li>
        <li>
          <a
            href="/profile/edit/password"
            style={{ textDecoration: "none" }}
            className="text-black"
          >
            <FaEdit /> Cambiar contraseña
          </a>
        </li>
        <li onClick={handleLogOut} style={{ cursor: "pointer" }}>
          <RiLogoutBoxLine size={22} /> Cerrar sesion
        </li>
      </ul>
    </section>
  );
}

export default Profile;
