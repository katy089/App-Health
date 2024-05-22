import { Container, Stack, Image, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import axios from "axios";
const baseUrl = import.meta.env.VITE_HEALTH_LINK_API_URL;

function Login() {
  const [cookies, setCookie] = useCookies(["health_link_user_token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inSubmit, setInSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { email, password, role } = data;
    setInSubmit(true);

    if (email && password && role) {
      const { data } = await (
        await axios
          .post(`${baseUrl}/auth/login`, {
            email,
            password,
            role,
          })
          .catch(() => toast.error("El email, contraseña o rol es incorrecto!"))
          .finally(() => setInSubmit(false))
      ).data;

      if (data) {
        setCookie("health_link_user_token", data);
        dispatch(logIn(jwtDecode(data)));
        navigate("/home");
        toast.success("Bienvenido!");
      }
    }
  });

  useEffect(() => {
    if (cookies.health_link_user_token) navigate("/home");
  }, [cookies, navigate]);

  return (
    <Container fluid="md">
      <Stack gap={2} className="col-md-5 mx-auto mt-3">
        <div className="w-100 d-flex justify-content-center">
          <Image
            src="../assets/medicoPaciente.png"
            style={{ width: 250, height: 200 }}
            alt="medicoPaciente"
            className="mx-auto"
          />
        </div>
        <div className="w-100 d-flex flex-column justify-content-center">
          <h3 className="mb-4 text-center">Iniciar sesión</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Campo requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Debe ser un email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">*{errors.email.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
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
              {errors.password && (
                <p className="text-danger">*{errors.password.message}</p>
              )}
            </Form.Group>

            <div className="gap-2 d-flex justify-content-center pt-3">
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

            <Stack gap={2} className="pt-3">
              <Button
                variant="primary"
                style={{ backgroundColor: "#087990", border: "none" }}
                disabled={
                  !watch("email") ||
                  !watch("password") ||
                  !watch("role") ||
                  inSubmit
                }
                onClick={onSubmit}
              >
                {inSubmit ? (
                  <div className="button-loading">
                    <div className="button-circle"></div>
                  </div>
                ) : (
                  "Ingresar"
                )}
              </Button>

              <Form.Text className="text-center">
                ¿Olvidaste tu contraseña?
              </Form.Text>
              <Form.Text className="text-center">
                ¿No tenes cuenta? <a href="/signup">Registrate</a>
              </Form.Text>
            </Stack>
          </Form>
        </div>
      </Stack>
    </Container>
  );
}

export default Login;
