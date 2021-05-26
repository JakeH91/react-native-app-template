import React, { ReactElement } from "react";
import Navigator from "@config/navigator";
import { Provider as AuthProvider } from "@context/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
