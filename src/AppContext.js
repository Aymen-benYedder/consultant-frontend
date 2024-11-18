import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [consultants, setConsultants] = useState([]);
  const [services, setServices] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, consultants, setConsultants, services, setServices }}>
      {children}
    </AppContext.Provider>
  );
}; 