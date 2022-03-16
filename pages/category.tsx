import React, { ReactElement, useMemo } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";

import { CategoryType, GeneralType, GraphQLData } from "../lib/types/graphql";
import { getApiMediaUrl, getCategories, getGeneral } from "../lib/api";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";

interface QueryType {
  id: string;
  page: string;
}

interface CategoryInitialProps {
  query: QueryType;
}

interface ArticlesProps {
  categories: Array<GraphQLData<CategoryType>>;
  general: GeneralType;
  query: QueryType;
}

function Category({ categories, general, query }: ArticlesProps): ReactElement {
  const category = useMemo<GraphQLData<CategoryType> | undefined>(
    () => categories.find((category) => category.id === query.id),
    [categories, query]
  );

  const page: number = Number(query.page) || 0;
  const startFrom: number = page * 9;

  const classes = useStyles();

  if (!category)
    return (
      <Layout classes={classes} categories={categories} general={general}>
        <Parallax
          small
          filter
          image={getApiMediaUrl(general.header.data?.attributes.url)}
        />
        <Container
          className={classes.mainRaised}
          component="article"
          maxWidth="xl">
          <Card>
            <CardContent>
              <Typography align="center" variant="h3">
                Could not find category
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    );

  return (
    <Layout
      classes={classes}
      title={category.attributes.name}
      url={`https://timmo.dev/category?id=${category.id}`}
      categories={categories}
      general={general}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          category.attributes.header
            ? category.attributes.header.data?.attributes.url
            : general.header.data?.attributes.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography align="center" component="h1" variant="h3">
              {category.attributes.name}
            </Typography>
            <Typography align="center" component="h4" variant="h5" gutterBottom>
              Page {page + 1}
            </Typography>
            <Articles
              articles={category.attributes.articles.data.slice(
                startFrom,
                startFrom + 9
              )}
            />
          </CardContent>
          <CardActions>
            <Link
              href={{
                pathname: "/category",
                query: { id: category.id, page: page - 1 },
              }}>
              <Button
                disabled={startFrom === 0}
                color="primary"
                size="large"
                variant="text">
                Newer Articles
              </Button>
            </Link>
            <div className={classes.flex} />
            <Link
              href={{
                pathname: "/category",
                query: { id: category.id, page: page + 1 },
              }}>
              <Button
                disabled={
                  category.attributes.articles.data.length <= startFrom + 9
                }
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

Category.getInitialProps = async ({ query }: CategoryInitialProps) => {
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return { categories, general, query };
};

export default Category;
