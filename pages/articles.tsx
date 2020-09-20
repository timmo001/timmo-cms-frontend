import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
  getHomepage,
} from "../lib/api";
import ArticlesComponent from "../components/Articles";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";

const Articles = (props) => {
  const page: number = Number(props.query.page) || 0;
  const startFrom: number = page * 6;

  const classes = useStyles();
  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          props.homepage.header_media
            ? props.homepage.header_media.url
            : props.general.header_media?.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography align="center" variant="h3" gutterBottom>
              {props.homepage.articles_heading} - Page {page + 1}
            </Typography>
            <ArticlesComponent
              articles={props.articles.slice(startFrom, startFrom + 6)}
            />
          </CardContent>
          <CardActions>
            <Link href={{ pathname: "/articles", query: { page: page - 1 } }}>
              <Button
                disabled={startFrom === 0}
                color="primary"
                size="large"
                variant="text">
                Newer Articles
              </Button>
            </Link>
            <div className={classes.flex} />
            <Link href={{ pathname: "/articles", query: { page: page + 1 } }}>
              <Button
                disabled={props.articles.length <= startFrom + 6}
                color="primary"
                size="large"
                variant="text">
                Older Articles
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Container>
    </Layout>
  );
};

Articles.getInitialProps = async ({ query }) => {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const homepage = await getHomepage();
  return { articles, categories, general, homepage, query };
};

export default Articles;
