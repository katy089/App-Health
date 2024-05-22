import { useState } from "react";
import { fetchPostMeet } from "../lib/fetchs";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

function CreateTeleconsult() {
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const [hour, setHour] = useState(dayjs(new Date()).format("HH:mm"));
  const [cookies] = useCookies(["health_link_user_token"]);
  const token = cookies.health_link_user_token;
  const { id_patient, consult_reason } = JSON.parse(
    localStorage.getItem("previous_meet_data")
  );
  const [inSubmit, setInSubmit] = useState(false);
  const navigate = useNavigate();

  const submitMeet = async () => {
    setInSubmit(true);
    const error = await fetchPostMeet(
      token,
      consult_reason,
      `${date} ${hour}`,
      id_patient
    ).finally(() => setInSubmit(false));

    if (error)
      toast.error(
        "No se pudo crear la teleconsulta. Por favor, intentelo mas tarde..."
      );
    else {
      toast.success("La teleconsulta fue creada con exito!");
      localStorage.removeItem("previous_meet_data");
      navigate("/home");
    }
  };

  return (
    <section className="d-flex flex-column gap-3">
      <h2 className="text-center">Teleconsultas</h2>
      <div>
        <h5>Calendario de citas</h5>
        <div className="h-100 d-flex flex-column">
          <div>
            <label htmlFor="teleconsult-date">Fecha</label>
            <input
              type="date"
              value={date}
              min={date}
              onChange={(event) => setDate(event.currentTarget.value)}
              className="form-control"
              id="teleconsult-date"
            />
          </div>
          <div>
            <label htmlFor="teleconsult-hour">Hora</label>
            <input
              type="time"
              value={hour}
              onChange={(event) => setHour(event.currentTarget.value)}
              className="form-control"
              id="teleconsult-hour"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary float-end"
        onClick={submitMeet}
        disabled={!date || !hour || !id_patient || !consult_reason}
      >
        {inSubmit ? (
          <div className="button-loading">
            <div className="button-circle"></div>
          </div>
        ) : (
          "Confirmar"
        )}
      </button>
    </section>
  );
}

export default CreateTeleconsult;
