import React, { ReactElement, useMemo } from "react";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import { Alert } from '@mui/material';

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
  GraphQLData,
  TagType,
} from "../lib/types/graphql";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Parallax from "../components/Parallax";
import Slider from "../components/Slider";
import useStyles from "../assets/jss/components/layout";

interface QueryType {
  id: string;
}

interface ArticleInitialProps {
  query: QueryType;
}

interface ArticleProps {
  articles: Array<GraphQLData<ArticleType>>;
  categories: Array<GraphQLData<CategoryType>>;
  general: GeneralType;
  query: QueryType;
}

function Article({
  articles,
  categories,
  general,
  query,
}: ArticleProps): ReactElement {
  const article = useMemo<GraphQLData<ArticleType> | undefined>(
    () =>
      articles.find(
        (article: GraphQLData<ArticleType>) => article.id === query.id
      ),
    [articles, query]
  );

  const classes = useStyles();

  if (!article)
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
                Could not find article
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    );

  return (
    <Layout
      classes={classes}
      description={`${article.attributes.title} - ${
        article.attributes.content.split("\n")[0]
      }`}
      keywords={article.attributes.tags.data
        .map(({ attributes }: GraphQLData<TagType>) => attributes.name)
        .join(", ")}
      title={article.attributes.title}
      url={`https://timmo.dev/article?id=${article.id}`}
      categories={categories}
      general={general}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          article.attributes.header
            ? article.attributes.header.data?.attributes.url
            : general.header.data?.attributes.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography component="h1" variant="h3">
              {article.attributes.title}
            </Typography>
            {article.attributes.publishedAt ? (
              <Typography variant="subtitle1" color="textSecondary">
                <Moment format="Do MMMM YYYY">
                  {article.attributes.publishedAt}
                </Moment>
              </Typography>
            ) : (
              ""
            )}
            <Typography component="div" gutterBottom>
              {article.attributes.tags.data.map(
                ({ id, attributes }: GraphQLData<TagType>) => (
                  <Chip
                    key={id}
                    label={attributes.name}
                    style={{ backgroundColor: attributes.color }}
                  />
                )
              )}
            </Typography>
            {article.attributes.tags.data.findIndex(
              ({ attributes }: GraphQLData<TagType>) =>
                attributes.name.includes("WIP")
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
              <Markdown
                source={article.attributes.content}
                escapeHtml={false}
              />
            </Typography>
          </CardContent>
        </Card>
        {article.attributes.showcase.data.length > 0 ? (
          <Card>
            <CardContent>
              <Slider
                media={article.attributes.showcase.data}
                slides={article.attributes.showcaseSlides}
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

Article.getInitialProps = async ({ query }: ArticleInitialProps) => {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return { articles, categories, general, query };
};
export default Article;
