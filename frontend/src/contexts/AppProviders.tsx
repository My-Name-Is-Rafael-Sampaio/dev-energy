import React from "react";

import { AppContextProvider } from "./AppContext";
import { UserContextProvider } from "./UserContext";

const providers = [AppContextProvider, UserContextProvider];

const AppProviders = ({ children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};

export default AppProviders;
