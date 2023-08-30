import React, { createContext, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

const Context = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(require("../images/profilePhoto.png"));
  const [user, setUser] = useState({});
  const [placesData, setPlacesData] = useState({});
  const [currentPlaceData, setCurrentPlaceData] = useState({});
  const [canReturnFromSearch, setCanReturnFromSearch] = useState(true);

  const login = (userObject) => {
    setAuthToken(userObject['token']);
    setUser(userObject);
    SecureStore.setItemAsync('userData', JSON.stringify(userObject));
  };

  const logout = () => {
    setAuthToken(null);
    setUser({});
  };

  return (
    <Context.Provider value={{ authToken, login, logout, profilePhoto, setProfilePhoto, user, setUser, placesData, setPlacesData, currentPlaceData, setCurrentPlaceData, canReturnFromSearch, setCanReturnFromSearch }}>
      {children}
    </Context.Provider>
  );
}

export function GetContext() {
  return useContext(Context);
}