import React from "react";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getAbout,
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
} from "../lib/api";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";

const About = (props) => {
  const classes = useStyles();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: props.about.showcase_slides || 3,
    slidesToScroll: props.about.showcase_slides || 3,
  };
  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          props.about.header_media
            ? props.about.header_media.url
            : props.general.header_media?.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card className={classes.cardOverflow}>
          <Avatar
            className={classes.profile}
            alt={props.about.profile_name}
            src={props.about.profile_media?.url}
          />
          <CardContent className={classes.cardContentOverflow}>
            <Typography component="h2" variant="h3">
              {props.about.profile_name}
            </Typography>
            <Typography component="h3" variant="h5">
              {props.about.profile_subtitle}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
              <ReactMarkdown source={props.about.content} escapeHtml={false} />
            </Typography>
          </CardContent>
        </Card>
        {props.about.showcase_media.length > 0 ? (
          <Card>
            <CardContent>
              <Slider className={classes.slider} {...sliderSettings}>
                {props.about.showcase_media.map(
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

export const getStaticProps: GetStaticProps = async () => {
  const about = await getAbout();
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return {
    props: { about, articles, categories, general },
    revalidate: 1,
  };
};

export default About;