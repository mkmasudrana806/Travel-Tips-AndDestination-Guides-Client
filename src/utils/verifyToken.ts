import { jwtDecode } from "jwt-decode";

// verify token
const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export default verifyToken;
