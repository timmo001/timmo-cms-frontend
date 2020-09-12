import React from "react";
import { GetStaticProps } from "next";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
  getHomepage,
  getPages,
} from "../lib/api";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import styles from "../assets/jss/components/layout";

const useStyles = makeStyles(styles);

const Home = (props) => {
  const classes = useStyles();

  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(props.homepage.header_media.url)}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl"
      >
        <Card>
          <CardContent>
            <Typography
              className={classes.welcomeMessage}
              align="center"
              variant="h4"
            >
              {props.homepage.welcome_message}
            </Typography>
            <Typography align="center" variant="h3">
              {props.homepage.articles_heading}
            </Typography>
            <Articles articles={props.articles.slice(0, 6)} />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const homepage = await getHomepage();
  const pages = (await getPages()) || [];
  return {
    props: { articles, categories, general, homepage, pages },
    unstable_revalidate: 1,
  };
};

export default Home;
