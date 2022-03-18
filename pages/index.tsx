import React, { ReactElement } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import clsx from "clsx";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import {
  getAbout,
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
  getHomepage,
} from "../lib/api";
import {
  AboutType,
  ArticleType,
  CategoryType,
  GeneralType,
  GraphQLData,
  HomepageType,
} from "../lib/types/graphql";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";
import ErrorLayout from "../components/ErrorLayout";

interface HomeProps {
  about: AboutType;
  articles: Array<GraphQLData<ArticleType>>;
  categories: Array<GraphQLData<CategoryType>>;
  general: GeneralType;
  homepage: HomepageType;
}

function Home({
  about,
  articles,
  categories,
  general,
  homepage,
}: HomeProps): ReactElement {
  const classes = useStyles();

  if (!about || !articles || !categories || !general || !homepage)
    return <ErrorLayout classes={classes} />;

  return (
    <Layout
      classes={classes}
      title="Home"
      url="https://timmo.dev"
      description={`${about.name} - ${about.subtitle}`}
      categories={categories}
      general={general}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(general.header?.data.attributes.url)}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        {homepage.subheading ? (
          <Card>
            <CardContent>
              <Typography
                className={clsx("welcome-message", classes.welcomeMessage)}
                align="center"
                color="textPrimary"
                component="div"
                variant="h4">
                <Markdown source={homepage.subheading} escapeHtml={false} />
              </Typography>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
        <Card>
          <CardContent>
            <Typography align="center" variant="h3" gutterBottom>
              {homepage.heading}
            </Typography>
            <Articles articles={articles.slice(0, 9)} />
          </CardContent>
          <CardActions>
            <Link href={{ pathname: "/articles", query: { page: 1 } }}>
              <Button
                disabled={articles.length <= 9}
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
}

export const getStaticProps: GetStaticProps = async () => {
  const about = await getAbout();
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const homepage = await getHomepage();
  return {
    props: { about, articles, categories, general, homepage },
    revalidate: 1,
  };
};

export default Home;
