import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layouts'
import UnAuthorized from '../components/guards/UnAuthorized';
import React, { useEffect } from 'react';
import { AppProvider, AppContext } from '../providers/AppProvider';
import { useState } from 'react';
import Authorized from '../components/guards/Authorized';
import Home from './admin';
import "@fontsource/montserrat";
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import { setCookie, getCookie } from 'cookies-next';

// import { configureAbly } from '@ably-labs/react-hooks'

const prefix = process.env.API_ROOT || ''
const clientId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)

// configureAbly({
//   authUrl: `${prefix}/api/createTokenRequest?clientId=${clientId}`,
//   clientId: clientId,
// })
export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  useEffect(()=> {
    if(typeof window !== 'undefined' && localStorage.getItem('mode')){
      setMode(localStorage.getItem('mode'))
    }

  }, [])


  useEffect(()=> {
    if(typeof window !== 'undefined' ){
      localStorage.setItem('mode', mode)
    }

  }, [mode])

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {

          body2: {
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 200,
            lineHeight: '14px'

          },
          h4: {
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: '17px',

          },
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',].join(','),
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                ...(mode === 'light'
                  ? {
                    backgroundColor: "#FFFFFF"
                  }
                  : {
                    backgroundColor: "#121212"
                    // backgroundColor: "#FFFFFF"
                  }),
              }

            }
          },
        },
        palette: {
          mode,
          primary: {
            main: '#495BE7',
            light: '#495BE7',
          },
          secondary: {
            main: '#fff',
          },
          
        },
        shape: {
          borderRadius: 16,
        },
      }),
    [mode],
  );



  if ([`/auth/code-confirm`, `/auth/login`, `/auth/register`, `/auth/code-confirm`].includes(appProps.router.pathname))
    return <AppProvider {...pageProps}>
      <UnAuthorized><Component {...pageProps} /></UnAuthorized>
    </AppProvider>


  // if ([`/admin`].includes(appProps.router.pathname))
  //   return <AppProvider {...pageProps}>
  //     <Authorized><Home {...pageProps}></Home></Authorized>
  //   </AppProvider>;

  return (
    <AppProvider  {...pageProps}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppProvider>


  )
}