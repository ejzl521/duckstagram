import jwtDecode from "jwt-decode";

export class jwtUtils {
  static isAuth(token) {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    } else {
      return false;
    }
  }

  static getId(token) {
    const decoded = jwtDecode(token);
    return decoded.user_id;
  }

  static getUserName(token) {
    const decoded = jwtDecode(token);
    return decoded.user_name;
  }
}
