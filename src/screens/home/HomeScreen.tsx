import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import styles from "./HomeScreen.styles";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 48 }}>{"Adulting!"}</Text>
      <Text style={{ fontSize: 24 }}>{"For all your adult needs ;)"}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
