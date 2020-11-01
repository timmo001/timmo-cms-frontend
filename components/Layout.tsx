import React, { ReactElement } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { teal, indigo } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";
import { NoSsr } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Header from "./Header";
import HeaderLinks from "./HeaderLinks";
import { CategoryType, GeneralType } from "./Types";

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
    MuiCardActions: {
      root: {
        justifyContent: "flex-end",
      },
    },
  },
});
theme = responsiveFontSizes(theme);

interface LayoutProps {
  categories: CategoryType[];
  children?: ReactElement[];
  classes: ClassNameMap;
  description?: string;
  general: GeneralType;
  keywords?: string;
  title?: string;
}

function Layout(props: LayoutProps): ReactElement {
  const classes = props.classes;

  return (
    <>
      <Head>
        <title>{props.title ? `${props.title} - Timmo` : `Timmo`}</title>
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
        <meta
          name="description"
          content={
            props.description
              ? `${props.description}`
              : props.title
              ? `${props.title} - Timmo`
              : `Timmo`
          }
        />
        <meta
          name="keywords"
          content={props.keywords ? `${props.keywords}` : `timmo, developer`}
        />
        <meta name="msapplication-TileColor" content="#009688" />
        <meta name="theme-color" content="#009688" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
}

export default Layout;
