import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";

import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { StackNavigationOptions } from "@react-navigation/stack";

import { DefaultTheme } from "react-native-paper";

// style do stack AuthPages
const stackScreenAuthPagesOptions: StackNavigationOptions = {
  headerShown: false,
};

// style do stack Drawer
const stackScreenDrawerOptions: StackNavigationOptions = {
  headerShown: false,
};

// style do drawer container
const drawerNavigatorOptions = (): DrawerNavigationOptions => {
  return {
    headerTintColor: "#FFFFFF",
    drawerItemStyle: {
      padding: 2,
    },
  };
};

// lógica para estabelecer o ícone das páginas do drawer
type IconName =
  | keyof (typeof Feather)["glyphMap"]
  | keyof (typeof Ionicons)["glyphMap"];

const getIconComponent = (icon: IconName, size: number, color: string) => {
  if (Feather.glyphMap[icon]) {
    const FeatherIcon = Feather as any;
    return <FeatherIcon name={icon} size={size} color={color} />;
  }
  if (Ionicons.glyphMap[icon]) {
    const IoniconsIcon = Ionicons as any;
    return <IoniconsIcon name={icon} size={size} color={color} />;
  }
};

// style das páginas autorizadas do drawer
const drawerAuthorizedScreenOptions = (page: {
  icon: IconName;
  title: string;
}): DrawerNavigationOptions => {
  return {
    drawerIcon: () => getIconComponent(page.icon, 20, "#000000"),
    drawerStyle: {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      backgroundColor: "#FFFFFF",
    },
    headerStyle: {
      backgroundColor: "#1E90FF",
    },
    headerTitleStyle: {
      color: "#ffffff",
      textAlign: "center",
    },
    headerTitleAlign: "center",
    title: page.title,
  };
};

// style das páginas stack
const stackScreenOptions: StackNavigationOptions = {
  headerTintColor: "#FFFFFF",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#1E90FF",
  },
  headerTitleStyle: {
    color: "#ffffff",
    textAlign: "center",
  },
};

// style da página Logger
const stackScreenLoggerOptions = (): StackNavigationOptions => {
  return {
    ...stackScreenOptions,
    title: "Cadastrar",
  };
};

// style da página Login
const stackScreenLoginOptions = (): StackNavigationOptions => {
  return {
    ...stackScreenOptions,
    title: "Login",
  };
};

// style dos inputs
const inputTheme = {
  ...DefaultTheme,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E90FF",
    text: "#000000",
  },
};

const styles = StyleSheet.create({
  1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  2: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
  },
  3: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  4: {
    backgroundColor: "#ffffff",
  },
  5: {
    textAlign: "center",
  },
  6: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  7: {
    flexDirection: "column",
    alignItems: "center",
    padding: 2,
  },
  8: {
    width: 200,
    backgroundColor: "#ff0000",
    padding: 2,
  },
  9: {
    backgroundColor: "#000000",
  },
  10: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },
  11: {
    width: 300,
    backgroundColor: "#44a444",
    padding: 5,
  },
  12: {
    width: 190,
    height: 40,
  },
  13: {
    textAlign: "center",
    fontSize: 15,
    color: "#000000",
    padding: 5,
  },
  14: {
    width: 300,
    backgroundColor: "#1E90FF",
    padding: 5,
  },
  15: {
    fontSize: 16,
    color: "#696969",
  },
  16: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    bottom: 20,
  },
  17: {
    width: 101,
    backgroundColor: "#ff0000",
  },
  18: {
    width: 101,
    backgroundColor: "#44a444",
  },
  19: {
    flex: 1,
    justifyContent: "center",
  },
  20: {
    flex: 1,
  },
  21: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
  },
  22: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  23: {
    flex: 1,
    padding: 5,
  },
  24: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  25: {
    fontWeight: "bold",
    fontSize: 17,
  },
  26: {
    padding: 5,
    width: 300,
  },
  27: {
    width: 300,
  },
  28: {
    fontWeight: "bold",
    fontSize: 16,
  },
  29: {
    flexDirection: "row",
    alignItems: "center",
  },
  30: {
    flexDirection: "column",
    padding: 12,
  },
  31: {
    backgroundColor: "#b0c4de",
    borderColor: "#d3d3d3",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  32: {
    fontSize: 14,
    textAlign: "center",
  },
  33: {
    backgroundColor: "#F8F8FF",
  },
  34: {
    margin: 20,
    padding: 10,
  },
  35: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  36: {
    flexDirection: "column",
    alignItems: "center",
  },
  37: {
    justifyContent: "center",
  },
  38: {
    flexDirection: "column",
  },
  39: {
    flexDirection: "column",
    padding: 2,
  },
  40: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  41: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  42: {
    width: 200,
    padding: 5,
  },
  43: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#1E90FF",
  },
  44: {
    flex: 6,
  },
  45: {
    color: "#ff0000",
  },
  46: {
    color: "#44a444",
  },
  47: {
    flex: 1,
    position: "relative",
  },
  48: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  49: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  50: {
    flexDirection: "row",
    flex: 1.5,
  },
  51: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  52: {
    width: 50,
    height: 50,
  },
  53: {
    position: "absolute",
    bottom: 65,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
  },
  54: {
    position: "absolute",
    bottom: 0,
  },
  55: {
    width: 300,
    padding: 5,
  },
  56: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  57: {
    alignItems: "center",
    margin: 25,
  },
  58: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 65,
    backgroundColor: "#FFC436",
  },
  59: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  60: {
    fontSize: 22,
    textAlign: "center",
  },
});

export {
  stackScreenAuthPagesOptions,
  stackScreenDrawerOptions,
  drawerNavigatorOptions,
  drawerAuthorizedScreenOptions,
  IconName,
};

export {
  stackScreenLoggerOptions,
  stackScreenLoginOptions,
  inputTheme,
  styles,
};
