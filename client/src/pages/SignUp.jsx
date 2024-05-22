import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, FormCheck, Stack, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

import axios from "axios";
import { fetchSpecialitys } from "../lib/fetchs";
const baseUrl = import.meta.env.VITE_HEALTH_LINK_API_URL;

function SignUp() {
  const [specialitys, setSpecialitys] = useState([]);
  const [cookies, setCookie] = useCookies(["health_link_user_token"]);
  const [inSubmit, setInSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      genre: "",
      role: "",
      speciality: "",
      newSpecialityName: "",
    },
  });

  const disabledCondition =
    !watch("fullname") ||
    !watch("email") ||
    !watch("password") ||
    !watch("genre") ||
    !watch("role") ||
    (watch("role") === "doctor" && !watch("speciality")) ||
    (watch("speciality") === "other" && !watch("newSpecialityName")) ||
    inSubmit;

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const {
      fullname,
      email,
      password,
      genre,
      role,
      speciality,
      newSpecialityName,
    } = data;
    setInSubmit(true);

    let responseError = false;

    if (speciality === "other") {
      const { data: id_universal_catalogue } = await (
        await axios.post(`${baseUrl}/universal_catalogue/speciality`, {
          name: newSpecialityName,
        })
      ).data;

      const { error } = await (
        await axios.post(`${baseUrl}/auth/signup`, {
          fullname,
          email,
          password,
          sex: genre,
          role,
          id_speciality: id_universal_catalogue,
        })
      ).data;

      responseError = error;
    } else {
      const { error } = await (
        await axios.post(`${baseUrl}/auth/signup`, {
          fullname,
          email,
          password,
          sex: genre,
          role,
          id_speciality: speciality,
        })
      ).data;

      responseError = error;
    }

    setInSubmit(false);
    if (!responseError) {
      const { data } = await (
        await axios.post(`${baseUrl}/auth/login`, {
          email,
          password,
          role,
        })
      ).data;

      setCookie("health_link_user_token", data);
      toast.success("Bienvenido!");
      navigate("/home");
    } else toast.error("Ha ocurrido un error, intentalo de nuevo mas tarde...");
  });

  useEffect(() => {
    if (cookies.health_link_user_token) navigate("/home");

    fetchSpecialitys().then((specialitys) => setSpecialitys(specialitys));
  }, [cookies, navigate]);

  return (
    <>
      <Container fluid>
        <h3 className="text-center m-3p-3">Registro</h3>
        <Stack gap={2} className="col-md-5 mx-auto">
          {/* fullname */}
          <div>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Nombre Completo"
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
            <Form.Control
              size="sm"
              type="text"
              className=""
              placeholder="Email"
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

          <div className="gap-2 d-flex justify-content-center py-2">
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

          {/* password */}
          <div>
            <Form.Control
              size="sm"
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "Campo requerido",
                minLength: {
                  value: 5,
                  message: "Debe contener al menos 5 caracteres",
                },
                maxLength: {
                  value: 15,
                  message: "Debe contener menos de 15 caracteres",
                },
              })}
            />
            {errors?.password && (
              <p className="text-danger">*{errors.password.message}</p>
            )}
          </div>

          <div className="gap-2 d-flex justify-content-center py-2">
            <Form.Check
              type="radio"
              value="patient"
              label="Soy paciente"
              id="patient-role"
              {...register("role")}
            />

            <Form.Check
              type="radio"
              value="doctor"
              label="Soy Doctor"
              id="doctor-role"
              {...register("role")}
            />
          </div>

          {/* speciality */}
          {watch("role") === "doctor" && (
            <div>
              <select
                className="form-select"
                {...register("speciality")}
                id="speciality"
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
                <option value="other">Otro</option>
              </select>

              {watch("speciality") === "other" && <div></div>}
            </div>
          )}

          {/* other speciality */}
          {watch("speciality") === "other" && watch("role") === "doctor" && (
            <div>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Nombre de la especialidad"
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
                <div className="loading">
                  <div className="circle"></div>
                </div>
              ) : (
                "Crear cuenta"
              )}
            </Button>
          </div>
        </Stack>
      </Container>
    </>
  );
}

export default SignUp;
