import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Slider from "react-slick";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import {
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
  getHomepage,
} from "../lib/api";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";

const Home = (props) => {
  const classes = useStyles();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: props.homepage.showcase_slides || 3,
    slidesToScroll: props.homepage.showcase_slides || 3,
  };

  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          props.homepage.header_media
            ? props.homepage.header_media.url
            : props.general.header_media?.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        {props.homepage.welcome_message ? (
          <Card>
            <CardContent>
              <Typography
                className={clsx("welcome-message", classes.welcomeMessage)}
                align="center"
                color="textPrimary"
                component="div"
                variant="h4">
                <ReactMarkdown
                  source={props.homepage.welcome_message}
                  escapeHtml={false}
                />
              </Typography>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
        {props.homepage.showcase_media.length > 0 ? (
          <Card>
            <CardContent>
              {props.homepage.showcase_heading ? (
                <Typography
                  className={classes.title}
                  align="center"
                  color="textPrimary"
                  variant="h3"
                  gutterBottom>
                  {props.homepage.showcase_heading}
                </Typography>
              ) : (
                ""
              )}
              {props.homepage.showcase_media.length > 0 ? (
                <Slider className={classes.slider} {...sliderSettings}>
                  {props.homepage.showcase_media.map(
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
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        ) : (
          ""
        )}
        <Card>
          <CardContent>
            <Typography align="center" variant="h3" gutterBottom>
              {props.homepage.articles_heading}
            </Typography>
            <Articles articles={props.articles.slice(0, 9)} />
          </CardContent>
          <CardActions>
            <Link href={{ pathname: "/articles", query: { page: 1 } }}>
              <Button
                disabled={props.articles.length <= 9}
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

export const getStaticProps: GetStaticProps = async () => {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const homepage = await getHomepage();
  return {
    props: { articles, categories, general, homepage },
    revalidate: 1,
  };
};

export default Home;
