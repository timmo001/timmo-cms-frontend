import React from "react";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
} from "../lib/api";
import { Tag } from "../components/Card";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import Slider from "../components/Slider";
import useStyles from "../assets/jss/components/layout";

const Article = (props) => {
  const article = props.articles.find(
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: article.showcase_slides || 3,
    slidesToScroll: article.showcase_slides || 3,
  };

  return (
    <Layout {...props} classes={classes}>
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
            <Typography variant="h3">{article.title}</Typography>
            {article.published_at ? (
              <Typography variant="subtitle1" color="textSecondary">
                <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
              </Typography>
            ) : (
              ""
            )}
            <Typography component="div">
              {article.tags.map((tag: Tag, index: number) => (
                <Chip
                  key={index}
                  label={tag.name}
                  style={{ backgroundColor: tag.color }}
                />
              ))}
            </Typography>
            <Typography component="div">
              <ReactMarkdown source={article.content} escapeHtml={false} />
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
};

Article.getInitialProps = async ({ query }) => {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return { articles, categories, general, query };
};
export default Article;
