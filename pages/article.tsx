import React from "react";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
            <Typography variant="subtitle1" color="textSecondary">
              <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
              {article.tags
                .sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1))
                .map((tag: Tag, index: number) => (
                  <Chip key={index} label={tag.name} />
                ))}
            </Typography>
            <Typography>
              <ReactMarkdown source={article.content} escapeHtml={false} />
            </Typography>
          </CardContent>
        </Card>
        {article.showcase_media.length > 0 ? (
          <Card>
            <CardContent>
              <Slider className={classes.slider} {...sliderSettings}>
                {article.showcase_media.map(
                  ({ url, alternativeText }, index: number) => (
                    <div className={classes.sliderMediaContainer} key={index}>
                      <CardMedia
                        className={classes.sliderMedia}
                        image={getApiMediaUrl(url)}
                        title={alternativeText}
                      />
                    </div>
                  )
                )}
              </Slider>
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
