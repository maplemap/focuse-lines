import {createContext, useMemo, useState} from 'react';

export const AppContext = createContext({});

export const AppStoreProvider = ({children}) => {
  const [loading, setLoading] = useState(false);

  const contextValue = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
