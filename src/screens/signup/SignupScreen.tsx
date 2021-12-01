import React, { useContext, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { KeyboardAvoidingView, Platform } from "react-native";
import styles from "./SignupScreen.styles";
import { Context as AuthContext } from "@context/AuthContext";
import { Context as ContentContext } from "@context/ContentContext";
import { AuthForm, NavLink } from "@components";

type SignupProps = {
  navigation: StackNavigationProp<StackNavigatorParams>;
};

const SignupScreen = ({ navigation }: SignupProps) => {
  const {
    state: authState,
    signup,
    clearErrorMessage,
  } = useContext(AuthContext);
  const { state: contentState, getContent } = useContext(ContentContext);

  const t = contentState.Signup;

  useEffect(() => {
    getContent("Signup");
  }, [contentState.selectedLanguage]);

  useEffect(() => {
    const listener = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return listener;
  }, []);

  if (Object.keys(t).length === 0) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <AuthForm
        headerText={t.title}
        errorMessage={authState.errorMessage}
        buttonText={t.buttonText}
        emailLabel={t.email}
        passwordLabel={t.password}
        onSubmit={signup}
      />
      <NavLink linkText={t.linkText} routeName="Signin" />
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
