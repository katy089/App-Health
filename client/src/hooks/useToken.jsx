import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

function useToken(name) {
  const [cookies] = useCookies([name]);
  const token = cookies[name];

  if (token) return jwtDecode(token);
  else return false;
}

export default useToken;
