import * as UserAction from "./UserAction";

export default function reducer(state = [], action) {
  switch (action.type) {
    case UserAction.USER_LOGIN:
      return [
        ...state,
        {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName,
        },
      ];
    case UserAction.USER_LOGOUT:
      return [
        ...state,
        {
          firstName: "",
          lastName: "",
          userName: "",
        },
      ];
    default:
      return state;
  }
}
