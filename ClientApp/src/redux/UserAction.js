export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function userLogin() {
  return {
    type: USER_LOGIN,
    info: "USER_LOGIN",
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
    info: "USER_LOGOUT",
  };
}
