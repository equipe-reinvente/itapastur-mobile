import { createContext, useState, useContext } from "react";

const EnterpriseContext = createContext();

export const EnterpriseProvider = ({ children }) => {
  const [enterpriseData, setEnterpriseData] = useState({
    name: "",
    category: "Ponto Turístico",
    description: "",
    phoneNumber: "",
    streetAddress: "",
    addressNumber: "",
    neighborhoodAddress: "",
    images: [],
  });

  return (
    <EnterpriseContext.Provider value={{ enterpriseData, setEnterpriseData }}>
      {children}
    </EnterpriseContext.Provider>
  );
};

export const useEnterprise = () => {
  return useContext(EnterpriseContext);
};
