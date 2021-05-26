import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import Api from "../api/api";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await Api.post("/signup", {
        email: email.trim(),
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);

      dispatch({
        type: "signup",
        payload: response.data.token,
      });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await Api.post("/signin", {
        email: email.trim(),
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);

      dispatch({
        type: "signin",
        payload: response.data.token,
      });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

const signout = (dispatch) => () => {
  // make api request to sign out
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
  },
  {
    token: null,
    errorMessage: "",
  }
);
