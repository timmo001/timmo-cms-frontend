import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { teal, indigo } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { NoSsr } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Header from "./Header";
import HeaderLinks from "./HeaderLinks";

let theme = createMuiTheme({
  palette: {
    type: "dark",
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
  },
});
theme = responsiveFontSizes(theme);

const Layout = (props) => {
  const classes = props.classes;

  return (
    <>
      <Head>
        <title>Timmo</title>
        <meta name="description" content="Aidan Timson aka Timmo" />
      </Head>
      <NoSsr>
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
            rightLinks={<HeaderLinks {...props} />}
          />
          {props.children}
          {props.general.footer_content ? (
            <Container
              className={classes.footer}
              component="footer"
              maxWidth="xl">
              <Card>
                <CardContent>
                  <Typography component="div">
                    <ReactMarkdown
                      source={props.general.footer_content}
                      escapeHtml={false}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          ) : (
            ""
          )}
        </ThemeProvider>
      </NoSsr>
    </>
  );
};

export default Layout;
