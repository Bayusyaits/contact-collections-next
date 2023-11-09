import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { unregister } from "next-offline/runtime";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "hooks/theme";
import createEmotionCache from "hooks/create-emotion-cache";
import { sha256 } from 'crypto-hash';

import Offline from "./offline";
import Layout from "base-components/layout";
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { REACT_APP_API_URL } from "config";
import { AppBar, Grid, Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Box, Container } from "@mui/system";

const httpLink = createPersistedQueryLink({ sha256 }).concat(
  new createHttpLink({ uri: REACT_APP_API_URL }),
);

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

Router.events.on("routeChangeComplete", () => {
  // Workaround to load scss on page change
  if (process.env.NODE_ENV !== "production") {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]'
    );
    const timestamp = new Date().valueOf();
    els.forEach(
      (el: any) =>
        (el.href = `/_next/static/css/styles.chunk.css?v=${timestamp}`)
    );
  }
});

const titleStyle =
  "font-family:arial;color:#23AB96;font-weight:bold;font-size:3rem";
const taglineStyle =
  "font-family:arial;color:#23AB96;font-weight:bold;font-size:1rem";
console.info("%cContactlist", titleStyle);
console.info("%cList Contact | #ContactIndonesia", taglineStyle);
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps & {
  emotionCache: any;
}) {
  const [isDisconnected, setDisconnected] = useState<boolean>(false);
  const handleConnectionChange = () => {
    if (!navigator.onLine) {
      setDisconnected(true);
    } else {
      setDisconnected(false);
    }
  };
  useEffect(() => {
    unregister();
    const style: any = document.getElementById("server-side-styles");
    if (style) {
      style.parentNode.removeChild(style);
    }
    window.addEventListener("offline", handleConnectionChange);
    window.addEventListener("online", handleConnectionChange);
  });
  const setComponent = () => {
    let d: any = <Component {...pageProps} />;
    if (isDisconnected) {
      d = <Offline />;
    }
    return d;
  };
  return (
    <ApolloProvider client={client as any}>
      <CacheProvider value={emotionCache}>
          <Layout>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBar position="relative">
                <Toolbar
                  sx={{
                    pr: '24px', // keep right padding when drawer closed
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Contact List
                  </Typography>

                </Toolbar>
              </AppBar>
              <Box>
                <Container maxWidth="lg" sx={{ px: '24px', mt: 4, mb: 4 }}>
                  <Grid container spacing={1}>
                    {setComponent()}
                  </Grid>
                </Container>
              </Box>
            </ThemeProvider>
          </Layout>
      </CacheProvider>
    </ApolloProvider>
  );
}
