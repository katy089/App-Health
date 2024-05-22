import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchDeleteMeet } from "../lib/fetchs";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

import { IoCloseOutline } from "react-icons/io5";
import { SiGooglemeet } from "react-icons/si";

function TeleconsultationsCards({ teleconsultations, limit }) {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cookies] = useCookies(["health_link_user_token"]);
  const token = cookies.health_link_user_token;
  const hasLimit = limit > 0;

  return (
    <>
      {teleconsultations.length ? (
        <div className="d-flex flex-column gap-2" style={{ minHeight: "50vh" }}>
          {teleconsultations.map(
            (
              { id_meeting, date, link, doctor_meeting, patient_meeting },
              i
            ) => {
              if (!limit || i < limit)
                return (
                  <article
                    key={id_meeting}
                    className="p-2 rounded d-flex justify-content-between align-items-center gap-3"
                    style={{ backgroundColor: "#afd5ee" }}
                  >
                    <span className="text-center">{`${dayjs(date).format(
                      "DD/MM/YYYY HH:mm"
                    )}hs`}</span>
                    <a className="text-center" href={link} target="_blank">
                      <SiGooglemeet size={20} />
                    </a>
                    <span className="d-none d-sm-block text-center">
                      {role === "doctor"
                        ? `Paciente ${patient_meeting.fullname}`
                        : `Dr. ${doctor_meeting.fullname} - ${doctor_meeting.speciality.name}`}
                    </span>
                    <span
                      className="text-center text-hover"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/teleconsults/${id_meeting}`)}
                    >
                      Ver mas
                    </span>
                    <span
                      className="text-center"
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        const { error } = await fetchDeleteMeet(
                          token,
                          id_meeting
                        );

                        if (!error) {
                          toast.success(
                            "La teleconsulta puso ser eliminada con exito!"
                          );
                          navigate("/teleconsults");
                        } else
                          toast.error(
                            "La teleconsulta no pudo ser eliminada, intentelo mas tarde"
                          );
                      }}
                    >
                      <IoCloseOutline size={20} />
                    </span>
                  </article>
                );
            }
          )}
          {hasLimit && (
            <button
              className="btn btn-primary text-center"
              onClick={() => navigate("/teleconsults")}
            >
              Ver todas las teleconsultas
            </button>
          )}
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "10em" }}
        >
          <h5>No tenes teleconsultas disponibles</h5>
        </div>
      )}
    </>
  );
}

export default TeleconsultationsCards;
