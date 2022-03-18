import React, { ReactElement } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import {
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
  getHomepage,
} from "../lib/api";
import {
  ArticleType,
  CategoryType,
  GeneralType,
  GraphQLData,
  HomepageType,
} from "../lib/types/graphql";
import ArticlesComponent from "../components/Articles";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";

interface QueryType {
  page: string;
}

interface ArticlesInitialProps {
  query: QueryType;
}

interface ArticlesProps {
  articles: Array<GraphQLData<ArticleType>>;
  categories: Array<GraphQLData<CategoryType>>;
  general: GeneralType;
  homepage: HomepageType;
  query: QueryType;
}

function Articles({
  articles,
  categories,
  general,
  homepage,
  query,
}: ArticlesProps): ReactElement {
  const page: number = Number(query.page) || 0;
  const startFrom: number = page * 9;

  const classes = useStyles();
  return (
    <Layout
      classes={classes}
      title={`Page ${page + 1} - Articles`}
      url={`https://timmo.dev/articles?page=${page}`}
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
        <Card>
          <CardContent>
            <Typography align="center" variant="h3">
              Articles
            </Typography>
            <Typography align="center" component="h4" variant="h5" gutterBottom>
              Page {page + 1}
            </Typography>
            <ArticlesComponent
              articles={articles.slice(startFrom, startFrom + 9)}
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
                disabled={articles.length <= startFrom + 9}
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

Articles.getInitialProps = async ({ query }: ArticlesInitialProps) => {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const homepage = await getHomepage();
  return { articles, categories, general, homepage, query };
};

export default Articles;
