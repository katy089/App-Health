import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { Image } from "react-bootstrap";

import { fetchMeetById } from "../lib/fetchs";

function Teleconsult() {
  const { id } = useParams();
  const [cookies] = useCookies(["health_link_user_token"]);
  const token = cookies.health_link_user_token;
  const [isLoading, setIsLoading] = useState(true);
  const [meet, setMeet] = useState({});

  useEffect(() => {
    fetchMeetById(token, id)
      .then((meetData) => setMeet(meetData))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div style={{ minHeight: "80vh" }} className="loading">
        <div className="loading-circle"></div>
      </div>
    );

  return (
    <section>
      <h3 className="text-start py-1 border-bottom">Teleconsulta</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Motivo de consulta</th>
            <th>Fecha de la reunion</th>
            <th>Link de la reunion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{meet.consult_reason}</td>
            <td>{dayjs(meet.date).format("DD/MM/YYYY HH:mm")}</td>
            <td>
              <a href={meet.link}> {meet.link}</a>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <div className="d-flex flex-column flex-sm-row justify-content-between">
        <h5>Motivo de consulta: {meet.consult_reason}</h5>
        <h5>Fecha: {dayjs(meet.date).format("DD/MM/YYYY HH:mm")}</h5>
        <h5>
          Link:{" "}
          <a href={meet.link} target="_blank">
            {meet.link}
          </a>
        </h5>
      </div> */}
      <div className="container row my-3 gap-5">
        <div className="col-sm-5 col-11 d-flex flex-column align-items-center mx-auto">
          <h5 className="text-center">Medico</h5>
          <Image
            src={meet.doctor_meeting.profile_image}
            width={75}
            className="rounded-circle"
          />
          <h6 className="mt-2">{meet.doctor_meeting.fullname}</h6>
          <h6>{meet.doctor_meeting.email}</h6>
          <h6>{meet.doctor_meeting.sex === "male" ? "Hombre" : "Mujer"}</h6>
          <h6>{meet.doctor_meeting.speciality.name}</h6>
        </div>
        <div className="col-sm-5 col-11 d-flex flex-column align-items-center mx-auto">
          <h5 className="text-center">Paciente</h5>
          <Image
            src={meet.patient_meeting.profile_image}
            width={75}
            className="rounded-circle"
          />
          <h6 className="mt-2">{meet.patient_meeting.fullname}</h6>
          <h6>{meet.patient_meeting.email}</h6>
          <h6>{meet.patient_meeting.sex === "male" ? "Hombre" : "Mujer"}</h6>
        </div>
      </div>
    </section>
  );
}

export default Teleconsult;
