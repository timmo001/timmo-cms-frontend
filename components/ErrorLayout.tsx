import React, { ReactElement } from "react";
import Head from "next/head";
import { teal, indigo } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material/styles";
import { ClassNameMap } from "@mui/styles";
import { Card, CardContent, Container, NoSsr, Typography } from "@mui/material";

import Header from "./Header";
import Markdown from "./Markdown";
import Parallax from "./Parallax";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

let theme = createTheme(
  adaptV4Theme({
    palette: {
      mode: "dark",
      primary: teal,
      secondary: indigo,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    overrides: {
      MuiCard: {
        root: {
          margin: 8,
        },
      },
      MuiCardContent: {
        root: {
          padding: "24px 32px",
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
      MuiChip: {
        root: {
          margin: 4,
        },
      },
      MuiCardActions: {
        root: {
          justifyContent: "flex-end",
        },
      },
    },
  })
);
theme = responsiveFontSizes(theme);

interface ErrorLayoutProps {
  classes: ClassNameMap;
}

function ErrorLayout(props: ErrorLayoutProps): ReactElement {
  const classes = props.classes;

  return (
    <>
      <Head>
        <title>Error - Timmo</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#009688" />
        <meta name="author" content="Aidan Timson" />
        <meta name="description" content="Error - Timmo" />
        <meta name="keywords" content="timmo, developer" />
        <meta name="msapplication-TileColor" content="#009688" />
        <meta name="theme-color" content="#009688" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NoSsr>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header
              {...props}
              brand="Timmo"
              changeColorOnScroll={{
                height: 200,
                color: "primary",
              }}
              color="transparent"
              fixed
            />
            <Parallax small filter />
            <Container
              className={classes.mainRaised}
              component="article"
              maxWidth="xl">
              <Card>
                <CardContent>
                  <Typography align="center" variant="h4" gutterBottom>
                    There was an error while fetching data from the server
                  </Typography>
                </CardContent>
              </Card>
            </Container>
            <Container
              className={classes.footer}
              component="footer"
              maxWidth="xl">
              <Card>
                <CardContent>
                  <Typography component="div">
                    <Markdown
                      source={`Developed by [Aidan Timson](https://timmo.dev)

Source avaliable on [GitHub](https://github.com/search?q=user%3Atimmo001+timmo-cms&type=repositories)

Copyright © Aidan Timson`}
                      escapeHtml={false}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          </ThemeProvider>
        </StyledEngineProvider>
      </NoSsr>
    </>
  );
}

export default ErrorLayout;
