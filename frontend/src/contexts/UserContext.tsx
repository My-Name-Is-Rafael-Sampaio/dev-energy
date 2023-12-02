import React, { createContext, useState, ReactNode } from "react";

type UserContextType = {
  token: string | null;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  availableMenuOptions: number[] | null;
  setToken: (newState: string | null) => void;
  setUserId: (newState: string | null) => void;
  setUserEmail: (newState: string | null) => void;
  setUserName: (newState: string | null) => void;
  setAvailableMenuOptions: (newState: number[] | null) => void;
};

const initialValue: UserContextType = {
  token: null,
  userId: null,
  userEmail: null,
  userName: null,
  availableMenuOptions: null,
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

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(initialValue.token);
  const [userId, setUserId] = useState<string | null>(initialValue.userId);
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
