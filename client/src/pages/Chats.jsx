import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchChats } from "../lib/fetchs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

import ChatsCards from "../components/ChatsCards";

function Chats() {
  const [chats, setChats] = useState([]);
  const [cookies] = useCookies(["health_link_user_token"]);
  const [isLoading, setIsLoading] = useState(true);
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.health_link_user_token;

    if (token) {
      fetchChats(token)
        .then((chats) => setChats(chats))
        .catch(() => setChats([]))
        .finally(() => setIsLoading(false));
    }
  }, [cookies.health_link_user_token]);

  if (isLoading)
    return (
      <div style={{ minHeight: "80vh" }} className="loading">
        <div className="loading-circle"></div>
      </div>
    );

  return (
    <div className="row">
      <section className="col-md-8 col-11 mx-auto">
        <div className="d-flex justify-content-between mb-1">
          <h2 className="text-start">Chats</h2>
          {role === "patient" && (
            <button
              type="button"
              className="btn btn-primary px-2 py-0 d-flex justify-content-center align-items-center"
              title="Crear un chat"
              onClick={() => navigate("/chats/create")}
            >
              <IoAdd size={25} />{" "}
              <span className="d-none d-sm-inline">Crear un chat</span>
            </button>
          )}
        </div>
        <ChatsCards chats={chats} limit={0} />
      </section>
    </div>
  );
}

export default Chats;
