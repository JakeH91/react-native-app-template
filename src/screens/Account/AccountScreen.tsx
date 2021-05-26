import React, { useContext } from "react";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "@context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./AccountScreen.styles";

const HomeScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 48 }}>{"AccountScreen"}</Text>
      <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

export default HomeScreen;
