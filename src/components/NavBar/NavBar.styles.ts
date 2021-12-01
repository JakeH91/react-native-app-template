import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  barStyle: {
    width: "100%",
    height: 50,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  langSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    zIndex: 1,
    top: 49,
    right: 0,
    backgroundColor: "white",
    paddingTop: 5,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
});

export default styles;
