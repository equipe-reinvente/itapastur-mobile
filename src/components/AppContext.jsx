import React, { createContext, useState, useContext } from 'react';

const Context = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(require("../images/profilePhoto.png"));
  const [username, setUsername] = useState("Unknown");
  const [email, setEmail] = useState("unknown@gmail.com");

  const login = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  return (
    <Context.Provider value={{ authToken, login, logout, profilePhoto, setProfilePhoto, username, setUsername, email, setEmail }}>
      {children}
    </Context.Provider>
  );
}

export function GetContext() {
  return useContext(Context);
}