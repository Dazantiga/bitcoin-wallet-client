const initialState = {
  token: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload.token, isAuthenticated: true };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
