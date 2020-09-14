import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
import useStyles from "../../assets/jss/components/layout";

const Article = (props) => {
  const classes = useStyles();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: props.article.showcase_slides || 3,
    slidesToScroll: props.article.showcase_slides || 3,
  };

  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          props.article.header_media
            ? props.article.header_media.url
            : props.general.header_media.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography variant="h3">{props.article.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Moment format="Do MMMM YYYY">
                {props.article.published_at}
              </Moment>
            </Typography>
            <ReactMarkdown source={props.article.content} escapeHtml={false} />
          </CardContent>
        </Card>
        {props.article.showcase_media.length > 0 ? (
          <Card>
            <CardContent>
              <Slider className={classes.slider} {...sliderSettings}>
                {props.article.showcase_media.map(
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
    revalidate: 1,
  };
};

export default Article;
