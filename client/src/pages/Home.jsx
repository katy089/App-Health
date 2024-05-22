import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchTeleconsultations, fetchChats } from "../lib/fetchs";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TeleconsultationsCards from "../components/TeleconsultationsCards";
import ChatsCards from "../components/ChatsCards";

function Home() {
  const [teleconsultations, setTeleconsultations] = useState([]);
  const [chats, setChats] = useState([]);
  const [cookies] = useCookies(["health_link_user_token"]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    const token = cookies.health_link_user_token;

    if (token) {
      fetchTeleconsultations(token)
        .then((teleconsultations) => setTeleconsultations(teleconsultations))
        .catch(() => setTeleconsultations([]));

      fetchChats(token)
        .then((chats) => setChats(chats))
        .catch(() => setChats([]))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading)
    return (
      <div style={{ minHeight: "80vh" }} className="loading">
        <div className="loading-circle"></div>
      </div>
    );

  return (
    <div className="row">
      <section className="col-md-5 col-11 mx-auto mt-3 mt-md-0">
        <div className="d-flex justify-content-between mb-1">
          <h3>Chats</h3>
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
        <div>
          <ChatsCards chats={chats} limit={3} />
        </div>
      </section>

      <section className="col-sm-7 col-11 mx-auto mt-4 mt-sm-0">
        <h3 className="text-center">Proximas teleconsultas</h3>
        <div className="border border-2 border-primary rounded-3 p-3">
          {isLoading ? (
            <div style={{ minHeight: "10rem" }} className="loading">
              <div className="loading-circle"></div>
            </div>
          ) : (
            <TeleconsultationsCards
              teleconsultations={teleconsultations}
              limit={3}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
