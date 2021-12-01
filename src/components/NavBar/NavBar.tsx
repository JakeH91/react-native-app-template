import React, { ReactElement, useState, useContext } from "react";
import { Context as ContentContext } from "@context/ContentContext";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./NavBar.styles";
import { LanguageType } from "@common/types";

const NavBar = (): ReactElement => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { state: contentState, changeLanguage } = useContext(ContentContext);

  return (
    <>
      <View style={styles.barStyle}>
        <TouchableOpacity
          style={styles.langSelector}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text>{contentState.selectedLanguage.toUpperCase()}</Text>
          <AntDesign name="caretdown" />
        </TouchableOpacity>
      </View>
      {showDropdown && (
        <View style={styles.dropdown}>
          {contentState.languages.map((language: LanguageType) => {
            return (
              <TouchableOpacity
                key={`lang-${language}`}
                style={styles.dropdownItem}
                onPress={() => changeLanguage(language)}
              >
                <Text>{language}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

export default NavBar;
