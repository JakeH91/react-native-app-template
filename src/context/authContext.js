import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import AuthApi from "../api/AuthApi";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
    case "signup":
      return { ...state, errorMessage: "", token: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    case "signout":
      return {
        ...state,
        errorMessage: "",
        token: null,
        autoAuthAttempted: false,
      };
    case "begin_auth_flow":
      return { ...state, autoAuthAttempted: true };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    dispatch({ type: "signin", payload: token });
  } else {
    dispatch({ type: "begin_auth_flow" });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await AuthApi.post("/signup", {
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
      const response = await AuthApi.post("/signin", {
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

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    tryLocalSignin,
  },
  {
    token: null,
    errorMessage: "",
    autoAuthAttempted: false,
  }
);
