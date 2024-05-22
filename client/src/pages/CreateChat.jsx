import { useEffect, useState } from "react";
import { Form, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

import { fetchSpecialitys, fetchDoctors, fetchPostChat } from "../lib/fetchs";

function CreateChat() {
  const [isLoading, setIsLoading] = useState(true);
  const [specialitys, setSpecialitys] = useState([]);
  const [filter, setFilter] = useState({
    fullname: "",
    sex: "",
    speciality: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [doctorSelected, setDoctorSelected] = useState("");
  const [consultReason, setConsultReason] = useState("");
  const [inSubmit, setInSubmit] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["health_link_user_token"]);

  useEffect(() => {
    fetchSpecialitys().then((data) => setSpecialitys(data));
  }, []);

  useEffect(() => {
    fetchDoctors(filter.fullname, filter.sex, filter.speciality)
      .then((data) => setDoctors(data))
      .finally(() => setIsLoading(false));
  }, [filter.fullname, filter.sex, filter.speciality]);

  const handleFilter = (event) => {
    setFilter({
      ...filter,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onSubmit = async () => {
    setInSubmit(true);
    const token = cookies.health_link_user_token;

    const { error } = await fetchPostChat(token, consultReason, doctorSelected);

    if (error)
      toast.error("No se pudo crear el chat, intentelo de nuevo mas tarde");
    else {
      toast.success("El chat fue creado con exito!");
      navigate("/chats");
    }
    setInSubmit(false);
  };

  if (isLoading)
    return (
      <div style={{ minHeight: "80vh" }} className="loading">
        <div className="loading-circle"></div>
      </div>
    );

  return (
    <section>
      <h3 className="text-center">Crear chat</h3>
      <div className="d-flex flex-wrap justify-content-around">
        <div>
          <Form.Label column="lg" className="pb-0" htmlFor="fullname-input">
            Nombre Completo
          </Form.Label>
          <Form.Control
            size="md"
            type="text"
            placeholder="Nombre"
            id="fullname-input"
            name="fullname"
            value={filter.fullname}
            onChange={handleFilter}
          />
        </div>

        <div>
          <Form.Label column="lg" className="pb-0" htmlFor="genre-select">
            Genero
          </Form.Label>

          <select
            className="form-select"
            id="genre-select"
            name="sex"
            value={filter.sex}
            onChange={handleFilter}
          >
            <option value="">Genero</option>
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
          </select>
        </div>

        <div>
          <Form.Label column="lg" className="pb-0" htmlFor="speciality-select">
            Especialidad
          </Form.Label>

          <select
            className="form-select"
            id="speciality-select"
            name="speciality"
            value={filter.speciality}
            onChange={handleFilter}
          >
            <option value="">Elige una especialidad</option>
            {specialitys?.map(({ id_universal_catalogue, name }) => (
              <option
                key={id_universal_catalogue}
                value={id_universal_catalogue}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center gap-3 m-2 mt-3">
        <h4 className="mb-0">Selecciona un medico</h4>
        {doctors.length ? (
          doctors.map(
            ({ id_doctor, fullname, speciality, profile_image, sex }) => (
              <article
                key={id_doctor}
                className="chat p-2 rounded d-flex gap-3"
                style={{
                  backgroundColor:
                    doctorSelected === id_doctor ? "#007bff" : "#f8f9fa",
                }}
                onClick={() =>
                  setDoctorSelected(
                    doctorSelected === id_doctor ? "" : id_doctor
                  )
                }
              >
                <Image
                  src={profile_image}
                  width={75}
                  className="rounded-circle"
                />
                <div className="d-flex flex-column">
                  <h4>{fullname}</h4>
                  <p className="mb-0">
                    Genero: {sex === "male" ? "Hombre" : "Mujer"}
                  </p>
                  <p className="mb-0">Especialidad: {speciality.name}</p>
                </div>
              </article>
            )
          )
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "10em" }}
          >
            <h5>No hay doctores que coincidan con los datos seleccionados</h5>
          </div>
        )}{" "}
      </div>
      <div className="my-3 mx-2">
        <Form.Label column="lg" className="pb-0" htmlFor="consult-reason-input">
          Motivo de la consulta
        </Form.Label>
        <Form.Control
          size="md"
          type="text"
          placeholder="Motivo"
          id="consult-reason-input"
          name="fullname"
          value={consultReason}
          onChange={(event) => setConsultReason(event.currentTarget.value)}
        />
      </div>
      <Button
        variant="primary"
        style={{ backgroundColor: "#087990", border: "none" }}
        className="w-100"
        type="submit"
        disabled={!doctorSelected || !consultReason || inSubmit}
        onClick={onSubmit}
      >
        {inSubmit ? (
          <div className="button-loading">
            <div className="button-circle"></div>
          </div>
        ) : (
          "Crear chat"
        )}
      </Button>
    </section>
  );
}

export default CreateChat;
