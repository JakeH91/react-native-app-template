import React, { ReactElement } from "react";
import Navigator from "@config/navigator";
import { Provider as AuthProvider } from "@context/authContext";

export default function App(): ReactElement {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
