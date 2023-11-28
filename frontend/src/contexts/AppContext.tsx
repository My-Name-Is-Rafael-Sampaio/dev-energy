import React, { createContext, useState, ReactNode } from "react";

type AppContextType = {
  userIsLoggedIn: boolean | null;
  setUserIsLoggedIn: (newState: boolean | null) => void;
};

const initialValue: AppContextType = {
  userIsLoggedIn: null,
  setUserIsLoggedIn: () => {},
};

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContextType>(initialValue);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean | null>(
    initialValue.userIsLoggedIn
  );

  return (
    <AppContext.Provider
      value={{
        userIsLoggedIn,
        setUserIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
