import {ConfigProvider} from 'antd';

export const ThemeProvider = ({children}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          fontFamily: 'Nunito, sans-serif',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
