import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { deepPurple, indigo } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";

import Header from "./Header";
import HeaderLinks from "./HeaderLinks";

let theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
    secondary: indigo,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiCardContent: {
      root: {
        padding: "24px 32px",
        "&:last-child": {
          paddingBottom: 16,
        },
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
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header
          {...props}
          color="transparent"
          brand="Timmo"
          rightLinks={<HeaderLinks {...props} />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "primary",
          }}
        />
        {props.children}
        {props.general.footer_content ? (
          <Container
            className={classes.footer}
            component="footer"
            maxWidth="xl"
          >
            <Card>
              <CardContent>
                <ReactMarkdown
                  source={props.general.footer_content}
                  escapeHtml={false}
                />
              </CardContent>
            </Card>
          </Container>
        ) : (
          ""
        )}
      </ThemeProvider>
    </>
  );
};

export default Layout;
