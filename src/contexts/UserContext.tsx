import React, { createContext, useState, ReactNode } from "react";

// São variáveis do usuário.
type UserContextType = {
  isLoggedIn: boolean | null;
  token: string | null;
  userId: number | null;
  userEmail: string | null;
  userName: string | null;
  availableMenuOptions: number[] | null;
  setIsLoggedIn: (newState: boolean | null) => void;
  setToken: (newState: string | null) => void;
  setUserId: (newState: number | null) => void;
  setUserEmail: (newState: string | null) => void;
  setUserName: (newState: string | null) => void;
  setAvailableMenuOptions: (newState: number[] | null) => void;
};

const initialValue: UserContextType = {
  isLoggedIn: null,
  token: null,
  userId: null,
  userEmail: null,
  userName: null,
  availableMenuOptions: null,
  setIsLoggedIn: () => {},
  setToken: () => {},
  setUserId: () => {},
  setUserEmail: () => {},
  setUserName: () => {},
  setAvailableMenuOptions: () => {},
};

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType>(initialValue);

// Iniciando as variáveis com os valores padrões.
const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(
    initialValue.isLoggedIn
  );
  const [token, setToken] = useState<string | null>(initialValue.token);
  const [userId, setUserId] = useState<number | null>(initialValue.userId);
  const [userEmail, setUserEmail] = useState<string | null>(
    initialValue.userEmail
  );
  const [userName, setUserName] = useState<string | null>(
    initialValue.userName
  );
  const [availableMenuOptions, setAvailableMenuOptions] = useState<
    number[] | null
  >(initialValue.availableMenuOptions);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userId,
        setUserId,
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        availableMenuOptions,
        setAvailableMenuOptions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
