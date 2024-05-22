import { useEffect, useState } from "react";
import { Container, FormCheck, Stack, Form, Button } from "react-bootstrap";
import useToken from "../hooks/useToken";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { fetchSpecialitys } from "../lib/fetchs";
const baseUrl = import.meta.env.VITE_HEALTH_LINK_API_URL;

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const { fullname, email, sex, speciality, role } = useToken(
    "health_link_user_token"
  );
  const [specialitys, setSpecialitys] = useState([]);
  const [inSubmit, setInSubmit] = useState(false);
  const [cookies] = useCookies(["health_link_user_token"]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      genre: "",
      speciality: "",
      newSpecialityName: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setInSubmit(true);
    let newSpeciality;

    if (data.newSpecialityName) {
      const { data: id_universal_catalogue } = await (
        await axios.post(`${baseUrl}/universal_catalogue/speciality`, {
          name: data.newSpecialityName,
        })
      ).data;

      newSpeciality = id_universal_catalogue;
    }

    let body = {
      ...data,
      sex: data.genre,
      id_speciality: "",
    };

    if (role === "doctor")
      body.id_speciality = newSpeciality
        ? newSpeciality
        : !data.speciality
        ? speciality.id_universal_catalogu
        : data.speciality;

    const { error } = await (
      await axios.put(
        `${baseUrl}/${role === "doctor" ? "doctors" : "patients"}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${cookies.health_link_user_token}`,
          },
        }
      )
    ).data;

    if (error)
      toast.error(
        "No se puedieron modificar los datos de la cuenta, intentelo mas tarde..."
      );
    else {
      toast.success(
        "Los datos han sido modificados con exito! Por favor, cierre la sesion e inicie sesion nuevamente para verificar los cambios..."
      );
      navigate("/home");
    }
    setInSubmit(false);
  });

  const disabledCondition =
    !watch("fullname") ||
    !watch("email") ||
    !watch("genre") ||
    (role === "doctor" && !watch("speciality")) ||
    (role === "doctor" &&
      watch("speciality") === "other" &&
      !watch("newSpecialityName")) ||
    inSubmit;

  useEffect(() => {
    setValue("fullname", fullname);
    setValue("email", email);
    setValue("genre", sex);
    if (role === "doctor") setValue("speciality", speciality.id_speciality);

    fetchSpecialitys()
      .then((data) => setSpecialitys(data))
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
      <h3 className="text-center">Editar datos del perfil</h3>
      <Container fluid>
        <Stack gap={2} className="col-md-5 mx-auto">
          {/* fullname */}
          <div>
            <Form.Label column="lg" className="pb-0">
              Nombre Completo
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              {...register("fullname", {
                required: "Campo requerido",
                maxLength: {
                  value: 60,
                  message: "Debe contener menos de 60 caracteres",
                },
                minLength: {
                  value: 5,
                  message: "Debe contener al menos de 5 caracteres",
                },
              })}
            />
            {errors?.fullname && (
              <p className="text-danger">*{errors.fullname.message}</p>
            )}
          </div>

          {/* email */}
          <div>
            <Form.Label column="lg" className="pb-0">
              Email
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              className=""
              placeholder="Mariabelen@outlook.com"
              {...register("email", {
                required: "Campo requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Debe ser un email",
                },
              })}
            />
            {errors?.email && (
              <p className="text-danger">*{errors.email.message}</p>
            )}
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-center pt-3">
            <FormCheck
              type="radio"
              label="Masculino"
              value="male"
              id="male-genre"
              {...register("genre")}
            />
            <FormCheck
              type="radio"
              label="Femenino"
              value="female"
              id="female-genre"
              {...register("genre")}
            />
          </div>

          {/* speciality */}
          {role === "doctor" && (
            <div>
              <Form.Label column="lg" className="pb-0" htmlFor="speciality">
                Especialidad
              </Form.Label>

              <select
                className="form-select"
                {...register("speciality")}
                id="speciality"
              >
                <option value="">{speciality.name}</option>
                {specialitys
                  .filter(
                    ({ id_universal_catalogue }) =>
                      id_universal_catalogue !==
                      speciality.id_universal_catalogue
                  )
                  .map(({ id_universal_catalogue, name }) => (
                    <option
                      key={id_universal_catalogue}
                      value={id_universal_catalogue}
                      selected={
                        id_universal_catalogue ===
                        speciality.id_universal_catalogue
                      }
                    >
                      {name}
                    </option>
                  ))}
                <option value="other">Otro</option>
              </select>

              {/* other speciality */}
              {watch("speciality") === "other" && (
                <div>
                  <Form.Label column="lg" className="pb-0">
                    Nombre de la especialidad
                  </Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Ginecologia"
                    {...register("newSpecialityName", {
                      required: "Campo requerido",
                      minLength: {
                        value: 5,
                        message: "Debe contener al menos 5 caracteres",
                      },
                      pattern: {
                        value: /^[A-Z].*$/,
                        message: "Debe empezar con una mayuscula",
                      },
                    })}
                  />
                  {errors.newSpecialityName && (
                    <p className="text-danger">
                      *{errors.newSpecialityName.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="d-grid gap-2 d-md-flex justify-content-md-center pt-3">
            <Button
              variant="primary"
              style={{ backgroundColor: "#087990", border: "none" }}
              className="w-100"
              type="submit"
              disabled={disabledCondition}
              onClick={onSubmit}
            >
              {inSubmit ? (
                <div className="button-loading">
                  <div className="button-circle"></div>
                </div>
              ) : (
                "Modificar datos"
              )}
            </Button>
          </div>
        </Stack>
      </Container>
    </section>
  );
}

export default ProfileEdit;
