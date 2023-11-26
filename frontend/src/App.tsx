import React from "react";

import { AppProviders } from "./contexts/Main";
import Navigation from "./components/navigation/Navigation";

const App = () => {
  return (
    <AppProviders>
      <Navigation />
    </AppProviders>
  );
};

export default App;
