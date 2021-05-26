import React, { useContext, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { KeyboardAvoidingView, Platform } from "react-native";
import styles from "./SigninScreen.styles";
import { Context as AuthContext } from "@context/authContext";
import { AuthForm, NavLink } from "@components";

type SigninProps = {
  navigation: StackNavigationProp<StackNavigatorParams>;
};

const SigninScreen = ({ navigation }: SigninProps) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    const listener = navigation.addListener("transitionStart", () => {
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
        headerText="Sign In"
        errorMessage={state.errorMessage}
        buttonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        linkText="Don't have an account? Sign up instead"
        routeName="Signup"
      />
    </KeyboardAvoidingView>
  );
};

export default SigninScreen;
