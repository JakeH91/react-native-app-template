import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { View, Text, Button } from "react-native";
import styles from "./SignupScreen.styles";

type SignupProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Signup">;
};

const SignupScreen = ({ navigation }: SignupProps) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>{"SignupScreen"}</Text>
      <Button
        title="Go to Signin"
        onPress={() => navigation.navigate("Signin")}
      />
    </>
  );
};

export default SignupScreen;
