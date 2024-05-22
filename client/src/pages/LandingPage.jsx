import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import logo from "../../public/logo.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <section
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Image src={logo} width={100} />
        <h1>Somos Health Link</h1>
        <p>Conectamos a medicos con pacientes</p>
        <div className="d-flex gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Iniciar sesion
          </button>
          <button
            type="button"
            className="btn button-purple text-white"
            onClick={() => navigate("/signup")}
          >
            Registrarse
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
