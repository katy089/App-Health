import { useForm } from "react-hook-form";
import { Container, Stack, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { fetchPutUserPassword } from "../lib/fetchs";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [inSubmit, setInSubmit] = useState(false);
  const [cookies] = useCookies(["health_link_user_token"]);
  const token = cookies.health_link_user_token;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    newPassword: "",
    confirmNewPassword: "",
  });

  const onSubmit = handleSubmit(async (data) => {
    const { newPassword } = data;
    setInSubmit(true);

    const { error } = await fetchPutUserPassword(token, newPassword);

    if (!error) {
      toast.success("La contraseña fue editada con exito!");
      navigate("/home");
    } else
      toast.error("La contraseña no puedo se editada, intentelo mas tarde");

    setInSubmit(false);
  });

  return (
    <section>
      <h3 className="text-center">Cambiar contraseña</h3>
      <Container fluid>
        <Stack gap={2} className="col-md-5 mx-auto">
          <div>
            <Form.Label column="lg" className="pb-0">
              Nueva contraseña
            </Form.Label>
            <Form.Control
              size="sm"
              type="password"
              {...register("newPassword", {
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
            {errors.newPassword && (
              <p className="text-danger">*{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <Form.Label column="lg" className="pb-0">
              Confirmar nueva contraseña
            </Form.Label>
            <Form.Control
              size="sm"
              type="password"
              {...register("confirmNewPassword", {
                required: "Campo requerido",
                minLength: {
                  value: 5,
                  message: "Debe contener al menos 5 caracteres",
                },
                maxLength: {
                  value: 15,
                  message: "Debe contener menos de 15 caracteres",
                },
                validate: (value) => {
                  if (watch("newPassword") === value) return true;
                  else return "Debe ser igual a la nueva contraseña";
                },
              })}
            />
            {errors.confirmNewPassword && (
              <p className="text-danger">
                *{errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-center pt-3">
            <Button
              variant="primary"
              style={{ backgroundColor: "#087990", border: "none" }}
              className="w-100"
              type="submit"
              disabled={
                !watch("newPassword") ||
                !watch("confirmNewPassword") ||
                inSubmit
              }
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

export default ChangePassword;
