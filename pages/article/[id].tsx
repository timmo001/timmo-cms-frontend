import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getApiMediaUrl,
  getArticle,
  getArticles,
  getCategories,
  getGeneral,
  getPages,
} from "../../lib/api";
import Layout from "../../components/Layout";
import Parallax from "../../components/Parallax";
import styles from "../../assets/jss/components/layout";

const useStyles = makeStyles(styles);

const Article = (props) => {
  const classes = useStyles();

  return (
    <Layout {...props} classes={classes}>
      <Parallax small filter image={getApiMediaUrl(article.image.url)} />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl"
      >
        <Card>
          <CardContent>
            <Typography variant="h3">{article.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
            </Typography>
            <ReactMarkdown source={article.content} escapeHtml={false} />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = (await getArticles()) || [];
  return {
    paths: articles.map((article) => ({
      params: {
        id: article.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const article = (await getArticle(context.params.id)) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const pages = (await getPages()) || [];
  return {
    props: { article, categories, general, pages },
    unstable_revalidate: 1,
  };
};

export default Article;
