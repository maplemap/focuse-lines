import {createContext, useMemo, useState} from 'react';

export const AppContext = createContext({});

export const AppStoreProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState(null);

  const contextValue = useMemo(
    () => ({
      loading,
      setLoading,
      lines,
      setLines,
    }),
    [lines, loading],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
