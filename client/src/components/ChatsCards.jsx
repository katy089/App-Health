import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChatsCards({ chats, limit }) {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const hasLimit = limit > 0;

  return (
    <div className="d-flex flex-column justify-content-center gap-3">
      {role === "doctor"
        ? chats.map(({ id_chat, patient_chat, consult_reason }, i) => {
            if (!limit || i < limit)
              return (
                <article
                  key={id_chat}
                  className="chat p-2 rounded d-flex gap-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/chats/${id_chat}`)}
                >
                  <Image
                    className="rounded-circle"
                    src={patient_chat.profile_image}
                    width={75}
                  />
                  <div>
                    <h4>{patient_chat.fullname}</h4>
                    <p>Motivo de consulta: {consult_reason}</p>
                  </div>
                </article>
              );
          })
        : chats.map(({ id_chat, doctor_chat, consult_reason }, i) => {
            if (!limit || i < limit)
              return (
                <article
                  key={id_chat}
                  className="chat p-2 rounded d-flex gap-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/chats/${id_chat}`)}
                >
                  <Image
                    className="rounded-circle"
                    src={doctor_chat.profile_image}
                    width={75}
                  />
                  <div>
                    <h4>{doctor_chat.fullname}</h4>
                    <p>Razon de consulta: {consult_reason}</p>
                  </div>
                </article>
              );
          })}
      {hasLimit && chats.length > limit && (
        <button
          className="btn btn-primary text-center"
          onClick={() => navigate("/chats")}
        >
          Ver todas los chats
        </button>
      )}
      {!chats.length && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "10em" }}
        >
          <h5>No tenes chats disponibles</h5>
        </div>
      )}
    </div>
  );
}

export default ChatsCards;
