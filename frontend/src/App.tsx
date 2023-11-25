import React from "react";

// Possibilita a manipulação de variáveis em um contexto global.
import { AppProviders } from "./contexts/Main";

// Junção de componentes responsavéis pela navegação no app.
import Navigation from "./components/navigation/Navigation";

// Função app.
const App = () => {
  return (
    <AppProviders>
      <Navigation />
    </AppProviders>
  );
};

export default App;
