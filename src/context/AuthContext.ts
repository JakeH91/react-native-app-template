import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import AuthApi from "../api/AuthApi";

export type State = {
  token: string | null;
  errorMessage: string;
  autoAuthAttempted: boolean;
};

export type Action =
  | {
      type: "signin";
      payload: string;
    }
  | { type: "signup"; payload: string }
  | { type: "signout" }
  | { type: "add_error"; payload: string }
  | { type: "clear_error" }
  | { type: "begin_auth_flow" };

export type Actions = {
  tryLocalSignin: () => void;
  clearErrorMessage: () => void;
  signout: () => void;
  signup: ({ email, password }: AuthType) => void;
  signin: ({ email, password }: AuthType) => void;
};

type AuthType = {
  email: string;
  password: string;
};

const authReducer = (state: State, action: Action) => {
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

const tryLocalSignin = (dispatch: React.Dispatch<Action>) => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    dispatch({ type: "signin", payload: token });
  } else {
    dispatch({ type: "begin_auth_flow" });
  }
};

const clearErrorMessage = (dispatch: React.Dispatch<Action>) => async () => {
  dispatch({ type: "clear_error" });
};

const signup =
  (dispatch: React.Dispatch<Action>) =>
  async ({ email, password }: AuthType) => {
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
  (dispatch: React.Dispatch<Action>) =>
  async ({ email, password }: AuthType) => {
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

const signout = (dispatch: React.Dispatch<Action>) => async () => {
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
