import React, { ReactElement } from "react";
import Navigator from "@config/navigator";
import { Provider as AuthProvider } from "@context/AuthContext";
import { Provider as ContentProvider } from "@context/ContentContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavBar } from "@components";

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ContentProvider>
          <NavBar />
          <Navigator />
        </ContentProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
