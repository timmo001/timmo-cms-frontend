import React, { ReactElement } from "react";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import {
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
} from "../lib/api";
import {
  ArticleType,
  CategoryType,
  GeneralType,
  QueryType,
  TagType,
} from "../components/Types";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Parallax from "../components/Parallax";
import Slider from "../components/Slider";
import useStyles from "../assets/jss/components/layout";

export interface ArticleProps {
  articles: ArticleType[];
  categories: CategoryType[];
  general: GeneralType;
  query: QueryType;
}

function Article(props: ArticleProps): ReactElement {
  const article: ArticleType = props.articles.find(
    (article) => article.id === props.query.id
  );

  const classes = useStyles();

  if (!article)
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
                Could not find article
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    );

  return (
    <Layout
      {...props}
      classes={classes}
      description={`${article.title} - ${article.content.split("\n")[0]}`}
      keywords={article.tags.map((tag: TagType) => tag.name).join(", ")}
      title={article.title}
      url={`https://timmo.dev/article?id=${article.id}`}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          article.header_media
            ? article.header_media.url
            : props.general.header_media?.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography component="h1" variant="h3">
              {article.title}
            </Typography>
            {article.published_at ? (
              <Typography variant="subtitle1" color="textSecondary">
                <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
              </Typography>
            ) : (
              ""
            )}
            <Typography component="div" gutterBottom>
              {article.tags.map((tag: TagType, index: number) => (
                <Chip
                  key={index}
                  label={tag.name}
                  style={{ backgroundColor: tag.color }}
                />
              ))}
            </Typography>
            {article.tags.findIndex((tag: TagType) =>
              tag.name.includes("WIP")
            ) > -1 ? (
              <Alert
                className={classes.alert}
                severity="warning"
                variant="outlined">
                This article is a work in progress. The contents of the article
                will change and there will likely be missing content.
              </Alert>
            ) : (
              ""
            )}
            <Typography component="div">
              <Markdown source={article.content} escapeHtml={false} />
            </Typography>
          </CardContent>
        </Card>
        {article.showcase_media.length > 0 ? (
          <Card>
            <CardContent>
              <Slider
                media={article.showcase_media}
                slides={article.showcase_slides}
              />
            </CardContent>
          </Card>
        ) : (
          ""
        )}
      </Container>
    </Layout>
  );
}

Article.getInitialProps = async ({ query }) => {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return { articles, categories, general, query };
};
export default Article;
