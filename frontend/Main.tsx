import React from "react";

// Registra o componente em questão se tornando o padrão(Main.tsx).
import registerRootComponent from "expo/build/launch/registerRootComponent";

// Delimita a área que a aplicação abrange.
import { SafeAreaView } from "react-native-safe-area-context";

// Barra de notificação do app.
import { StatusBar } from "expo-status-bar";

// Design de materiais para React Native.
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

// Componente app principal.
import App from "./src/App";

// Constante de estilização onde define a cor padrão do aplicativo.
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E90FF",
  },
};

// Função principal que abriga toda a estrutura do aplicativo.
const Main = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E90FF" }}>
      <StatusBar style="inverted" />
      <PaperProvider theme={theme}>
        <App />
        {/* O componente App precisa ficar dentro do PaperProvider, senão não é possível utilizar os designs de materiais */}
      </PaperProvider>
    </SafeAreaView>
  );
};

registerRootComponent(Main);

export default Main;
