import React from "react";

import { UserContextProvider } from "./UserContext";

const providers = [UserContextProvider];

const AppProviders = ({ children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};

export default AppProviders;
