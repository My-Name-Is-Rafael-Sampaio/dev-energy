import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
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
    headerTintColor: "#ffffff",
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
      backgroundColor: "#ffffff",
    },
    headerStyle: {
      backgroundColor: "#008037",
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
  headerTintColor: "#ffffff",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#008037",
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
    primary: "#008037",
    secondary: "#ffffff",
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
    flex: 1,
    backgroundColor: "#ffffff",
  },
  5: {
    width: 300,
    padding: 5,
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
