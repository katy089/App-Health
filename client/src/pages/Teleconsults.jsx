import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchTeleconsultations } from "../lib/fetchs";

import TeleconsultationsCards from "../components/TeleconsultationsCards";

function Teleconsults() {
  const [teleconsultations, setTeleconsultations] = useState([]);
  const [cookies] = useCookies(["health_link_user_token"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // teleconsultations
    const token = cookies.health_link_user_token;

    if (token)
      fetchTeleconsultations(token)
        .then((teleconsultations) => setTeleconsultations(teleconsultations))
        .catch(() => setTeleconsultations([]))
        .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <h3 className="text-center">Teleconsultas</h3>
      <div className="border border-2 border-primary rounded-3 p-3">
        {isLoading ? (
          <div style={{ minHeight: "10rem" }} className="loading">
            <div className="loading-circle"></div>
          </div>
        ) : (
          <TeleconsultationsCards
            teleconsultations={teleconsultations}
            limit={0}
          />
        )}
      </div>
    </section>
  );
}

export default Teleconsults;
