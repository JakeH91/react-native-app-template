import { useEffect, useContext, useState } from "react";
import { Context as AuthContext } from "@context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";

type LoadingProps = {
  navigation: StackNavigationProp<StackNavigatorParams>;
};

const LoadingScreen = ({ navigation }: LoadingProps) => {
  const { state, tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    if (state.autoAuthAttempted) {
      navigation.navigate("Signup");
    } else {
      tryLocalSignin();
    }
  }, [state.autoAuthAttempted]);
  return null;
};

export default LoadingScreen;
