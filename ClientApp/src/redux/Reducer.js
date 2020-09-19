export default function reducer(state = [], action) {
  switch (action.type) {
    case "login":
      return [
        ...state,
        {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName,
          password: action.payload.password,
        },
      ];
    case "logout":
      return [
        ...state,
        {
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
        },
      ];
    default:
      return state;
  }
}
