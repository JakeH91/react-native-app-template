import React, { useContext, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { KeyboardAvoidingView, Platform } from "react-native";
import styles from "./SignupScreen.styles";
import { Context as AuthContext } from "@context/authContext";
import { AuthForm, NavLink } from "@components";

type SignupProps = {
  navigation: StackNavigationProp<StackNavigatorParams>;
};

const SignupScreen = ({ navigation }: SignupProps) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    const listener = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return listener;
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <AuthForm
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        buttonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        linkText="Already have an account? Sign in instead"
        routeName="Signin"
      />
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
