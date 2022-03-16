import React, { ReactElement } from "react";
import Head from "next/head";
import { teal, indigo } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Container,
  NoSsr,
  Typography,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import { CategoryType, GeneralType, GraphQLData } from "../lib/types/graphql";
import Header from "./Header";
import HeaderLinks from "./HeaderLinks";
import Markdown from "./Markdown";

let theme = createTheme({
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
  categories: Array<GraphQLData<CategoryType>>;
  children?: Array<ReactElement>;
  classes: ClassNameMap;
  description?: string;
  general: GeneralType;
  keywords?: string;
  title?: string;
  url?: string;
}

function Layout({
  categories,
  children,
  classes,
  description,
  general,
  keywords,
  title,
  url,
}: LayoutProps): ReactElement {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Timmo` : `Timmo`}</title>
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
        <link rel="canonical" href={url} />
        <meta name="author" content="Aidan Timson" />
        <meta
          name="description"
          content={
            description
              ? `${description}`
              : title
              ? `${title} - Timmo`
              : `Timmo`
          }
        />
        <meta
          name="keywords"
          content={keywords ? `${keywords}` : `timmo, developer`}
        />
        <meta name="msapplication-TileColor" content="#009688" />
        <meta name="theme-color" content="#009688" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NoSsr>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            brand="Timmo"
            changeColorOnScroll={{
              height: 200,
              color: "primary",
            }}
            color="transparent"
            fixed
            rightLinks={<HeaderLinks categories={categories} />}
          />
          {children}
          {general.footer ? (
            <Container
              className={classes.footer}
              component="footer"
              maxWidth="xl">
              <Card>
                <CardContent>
                  <Typography component="div">
                    <Markdown source={general.footer} escapeHtml={false} />
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
