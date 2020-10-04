import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { getApiMediaUrl, getCategories, getGeneral } from "../lib/api";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";

const Category = (props) => {
  const category = props.categories.find(
    (category) => category.id === props.query.id
  );
  const page: number = Number(props.query.page) || 0;
  const startFrom: number = page * 8;

  const classes = useStyles();

  if (!category)
    return (
      <Layout {...props} classes={classes}>
        <Parallax
          small
          filter
          image={getApiMediaUrl(props.general.header_media?.url)}
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
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          category.header_media
            ? category.header_media.url
            : props.general.header_media?.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography align="center" variant="h3">
              {category.name}
            </Typography>
            <Typography align="center" component="h4" variant="h5" gutterBottom>
              Page {page + 1}
            </Typography>
            <Articles
              articles={category.articles.slice(startFrom, startFrom + 8)}
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
                disabled={category.articles.length <= startFrom + 8}
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

Category.getInitialProps = async ({ query }) => {
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return { categories, general, query };
};

export default Category;
