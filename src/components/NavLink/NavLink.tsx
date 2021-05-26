import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import styles from "./NavLink.styles";
import { StackNavigatorParams, TabNavigatorParams } from "@config/navigator";

type NavLinkProps = {
  linkText: string;
  routeName: keyof StackNavigatorParams | keyof TabNavigatorParams;
};

const NavLink = ({ linkText, routeName }: NavLinkProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}>{linkText}</Text>
    </TouchableOpacity>
  );
};

export default NavLink;
