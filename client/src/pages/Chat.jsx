import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchChatById,
  fetchPostMessage,
  fetchAuthGoogleUrl,
  fetchDeleteChat,
} from "../lib/fetchs";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { IoAdd, IoTrash } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

function Chat() {
  const { id } = useParams();
  const [cookies] = useCookies(["health_link_user_token"]);
  const [chat, setChat] = useState({});
  const { role } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [inSubmit, setInSubmit] = useState(false);
  const navigate = useNavigate();

  const token = cookies.health_link_user_token;

  useEffect(() => {
    if (token) {
      fetchChatById(token, id)
        .then((chat) => setChat(chat))
        .catch(() => setChat({}))
        .finally(() => setIsLoading(false));
    }
  }, [token, id]);

  const submitMessage = async (event) => {
    event.preventDefault();
    setInSubmit(true);

    const error = await fetchPostMessage(token, chat.id_chat, newMessage).then(
      () => {
        fetchChatById(token, id).then((chat) => setChat(chat));
      }
    );

    setInSubmit(false);
    if (error) {
      toast.error("El mensaje no pudo ser enviado, intentalo mas tarde");
    } else {
      toast.success("El mensaje fue enviado!");
      setNewMessage("");
    }
  };

  const redirectToMeetForm = (id_patient, consult_reason) => {
    localStorage.setItem(
      "previous_meet_data",
      JSON.stringify({ id_patient, consult_reason })
    );

    fetchAuthGoogleUrl().then((url) => (window.location.href = url));
  };

  if (isLoading)
    return (
      <div style={{ minHeight: "80vh" }} className="loading">
        <div className="loading-circle"></div>
      </div>
    );

  return (
    <section className="section">
      <div className="border-bottom d-flex justify-content-between align-items-center pb-2 m-2">
        <h3 className="pt-2">
          {role === "doctor"
            ? chat.patient_chat.fullname
            : chat.doctor_chat.fullname}
        </h3>
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-danger p-2 d-flex justify-content-center align-items-center"
            title="Eliminar chat"
            onClick={async () => {
              const { error } = await fetchDeleteChat(token, chat.id_chat);

              if (!error) {
                toast.success("El chat fue eliminado con exito!");
                navigate("/chats");
              } else
                toast.error(
                  "El chat no pudo ser eliminado, intentelo mas tarde..."
                );
            }}
          >
            <IoTrash size={22} />{" "}
            <span className="d-none d-sm-inline">Eliminar chat</span>
          </button>
          {role === "doctor" && (
            <button
              type="button"
              className="btn btn-primary p-2 d-flex justify-content-center align-items-center"
              title="Crear una teleconsulta"
              onClick={() =>
                redirectToMeetForm(
                  chat.patient_chat.id_patient,
                  chat.consult_reason
                )
              }
            >
              <IoAdd size={25} />{" "}
              <span className="d-none d-sm-inline">Crear una teleconsulta</span>
            </button>
          )}
        </div>
      </div>

      <div
        className="px-3"
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          scrollbarGutter: "revert",
        }}
      >
        {role === "doctor"
          ? chat.messages.map(({ id_chat_message, message, sender_role }) => (
              <article
                key={id_chat_message}
                className={`d-flex ${
                  sender_role === "patient"
                    ? "justify-content-start"
                    : "justify-content-end"
                }`}
              >
                <p
                  className={`${
                    sender_role === "patient"
                      ? "bg-light"
                      : "bg-primary text-white"
                  } p-1 border rounded`}
                >
                  {message}
                </p>
              </article>
            ))
          : chat.messages.map(({ id_chat_message, message, sender_role }) => (
              <article
                key={id_chat_message}
                className={`d-flex ${
                  sender_role === "patient"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <p
                  className={`${
                    sender_role === "patient"
                      ? "bg-light"
                      : "bg-primary text-white"
                  } p-1 border rounded`}
                >
                  {message}
                </p>
              </article>
            ))}
      </div>

      <div className="d-flex align-items-center gap-2 border-top py-2 bg-white">
        <input
          type="text"
          className="w-100"
          style={{ height: "40px" }}
          value={newMessage}
          onChange={(event) => setNewMessage(event.currentTarget.value)}
          placeholder="Mensaje..."
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitMessage}
          disabled={!newMessage || inSubmit}
        >
          {inSubmit ? (
            <div className="button-loading">
              <div className="button-circle"></div>
            </div>
          ) : (
            <IoIosSend size={25} />
          )}
        </button>
      </div>
    </section>
  );
}

export default Chat;
