import registerRootComponent from "expo/build/launch/registerRootComponent";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import App from "./src/App";

const containerStyle = { flex: 1, backgroundColor: "#008037" };

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#008037",
    secondary: "#ffffff",
  },
};

const Main = () => {
  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar style="inverted" />
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </SafeAreaView>
  );
};

registerRootComponent(Main);

export default Main;
