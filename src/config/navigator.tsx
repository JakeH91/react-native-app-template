import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SigninScreen, SignupScreen } from "@screens";

export type StackNavigatorParams = {
  Signin: undefined;
  Signup: undefined;
};

const AuthStack = createStackNavigator<StackNavigatorParams>();

const LoginFlow = (): ReactElement => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={"Signup"} component={SignupScreen} />
    <AuthStack.Screen name={"Signin"} component={SigninScreen} />
  </AuthStack.Navigator>
);

export type TabNavigatorParams = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();

const MainFlow = (): ReactElement => (
  <Tab.Navigator>
    <Tab.Screen name={"Home"} component={HomeScreen} />
  </Tab.Navigator>
);

export default function Navigator(): ReactElement {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      {!isLoggedIn && <LoginFlow />}
      {isLoggedIn && <MainFlow />}
    </NavigationContainer>
  );
}
