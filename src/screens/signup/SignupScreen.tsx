import React, { useContext, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { KeyboardAvoidingView, Platform } from "react-native";
import styles from "./SignupScreen.styles";
import { Context as AuthContext } from "@context/AuthContext";
import { AuthForm, NavLink } from "@components";
import { useContent } from "@common/hooks";

type SignupProps = {
  navigation: StackNavigationProp<StackNavigatorParams>;
};

const SignupScreen = ({ navigation }: SignupProps) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  const c = useContent("Signup");

  useEffect(() => {
    const listener = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return listener;
  }, []);

  if (!c) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <AuthForm
        headerText={c.title}
        errorMessage={state.errorMessage}
        buttonText={c.buttonText}
        emailLabel={c.email}
        passwordLabel={c.password}
        onSubmit={signup}
      />
      <NavLink linkText={c.linkText} routeName="Signin" />
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
