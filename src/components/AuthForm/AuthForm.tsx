import React, { useState } from "react";
import { Text, Button, Input } from "react-native-elements";
import styles from "./AuthForm.styles";

type OnSubmitParams = {
  email: string;
  password: string;
};

type AuthFormProps = {
  headerText: string;
  errorMessage: string;
  buttonText: string;
  onSubmit: ({}: OnSubmitParams) => void;
};

const AuthForm = ({
  headerText,
  errorMessage,
  buttonText,
  onSubmit,
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Text h3 style={styles.header}>
        {headerText}
      </Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage={errorMessage}
        secureTextEntry
      />
      <Button
        title={buttonText}
        onPress={() => onSubmit({ email, password })}
      />
    </>
  );
};

export default AuthForm;
