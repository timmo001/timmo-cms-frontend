import React, { ReactElement } from "react";
import { GetStaticProps } from "next";
import Moment from "react-moment";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";

import {
  getAbout,
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
} from "../lib/api";
import { AboutType, CategoryType, GeneralType } from "../components/Types";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Parallax from "../components/Parallax";
import Slider from "../components/Slider";
import useStyles from "../assets/jss/components/layout";

export interface AboutProps {
  about: AboutType;
  categories: CategoryType[];
  general: GeneralType;
}

function About(props: AboutProps): ReactElement {
  const classes = useStyles();

  return (
    <Layout
      {...props}
      classes={classes}
      description={`About Me - ${props.about.profile_name} - ${props.about.profile_subtitle}`}
      keywords="Timmo, Aidan Timson, About Me, Bio, Portfolio"
      title="About Me"
      url="https://timmo.dev/about">
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
            style={{
              position: "absolute",
              top: -160,
              left: "calc(50% - 140px)",
            }}
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
            {props.about.updated_at ? (
              <Typography variant="subtitle1" color="textSecondary">
                {"Last updated: "}
                <Moment format="Do MMMM YYYY">{props.about.updated_at}</Moment>
              </Typography>
            ) : (
              ""
            )}
            <Typography component="div">
              <Markdown source={props.about.content} escapeHtml={false} />
            </Typography>
          </CardContent>
        </Card>
        {props.about.showcase_media.length > 0 ? (
          <Card>
            <CardContent>
              <Slider
                media={props.about.showcase_media}
                slides={props.about.showcase_slides}
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
