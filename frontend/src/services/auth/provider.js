import {createContext, useEffect, useMemo, useState} from 'react';
import {AUTHORIZATION_TOKEN_KEY, USER_DATA_KEY} from '@/constants';
import {localeStore} from '@/services/storage';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(localeStore.get(USER_DATA_KEY));
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(localeStore.get(AUTHORIZATION_TOKEN_KEY));

  useEffect(() => {
    if (token) {
      localeStore.set(AUTHORIZATION_TOKEN_KEY, token);
    } else {
      localeStore.remove(AUTHORIZATION_TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localeStore.set(USER_DATA_KEY, user);
    } else {
      localeStore.remove(USER_DATA_KEY);
    }
  }, [user]);

  useEffect(() => {
    setAuthenticated(!!token);
  }, [token]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      token,
      authenticated,
      setToken,
    }),
    [authenticated, token, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
