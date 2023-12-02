import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { StackNavigationOptions } from "@react-navigation/stack";

import { DefaultTheme } from "react-native-paper";

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

// style da página SignUp
const stackScreenSignUpOptions = (): StackNavigationOptions => {
  return {
    ...stackScreenOptions,
    title: "Cadastrar",
  };
};

// style da página SignIn
const stackScreenSignInOptions = (): StackNavigationOptions => {
  return {
    ...stackScreenOptions,
    title: "Login",
  };
};

// style do stack AuthPages
const stackScreenAuthPagesOptions: StackNavigationOptions = {
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

// style do stack Drawer
const stackScreenDrawerOptions: StackNavigationOptions = {
  headerShown: false,
};

// style da página CalculateEnergyConsumption
const stackScreenCalculateEnergyConsumptionOptions =
  (): StackNavigationOptions => {
    return {
      ...stackScreenOptions,
      title: "Calcular Consumo de Energia",
    };
  };

// style do stack EnergyConsumptionPages
const stackScreenEnergyConsumptionPagesOptions: StackNavigationOptions = {
  headerShown: false,
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

export {
  stackScreenAuthPagesOptions,
  stackScreenSignUpOptions,
  stackScreenSignInOptions,
  IconName,
  drawerNavigatorOptions,
  drawerAuthorizedScreenOptions,
  stackScreenDrawerOptions,
  stackScreenCalculateEnergyConsumptionOptions,
  stackScreenEnergyConsumptionPagesOptions,
  styles,
  inputTheme,
};
