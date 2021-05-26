import React, { useState, useRef } from "react";
import { TextInput } from "react-native";
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
  const passwordRef = useRef<TextInput | null>(null);

  return (
    <>
      <Text h3 style={styles.header}>
        {headerText}
      </Text>
      <Input
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => {
          passwordRef.current?.focus();
        }}
      />
      <Input
        label="Password"
        ref={passwordRef}
        returnKeyType="done"
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
