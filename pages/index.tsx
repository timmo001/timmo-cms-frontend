import React from "react";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
                className={classes.welcomeMessage}
                align="center"
                color="textPrimary"
                variant="h4">
                {props.homepage.welcome_message}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
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
        <Card>
          <CardContent>
            <Typography align="center" variant="h3" gutterBottom>
              {props.homepage.articles_heading}
            </Typography>
            <Articles articles={props.articles.slice(0, 6)} />
          </CardContent>
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
