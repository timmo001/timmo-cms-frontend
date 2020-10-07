import React, { ReactElement } from "react";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getAbout,
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
} from "../lib/api";
import { AboutType, CategoryType, GeneralType } from "../components/Types";
import Layout from "../components/Layout";
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
                {"Last updated on "}
                <Moment format="Do MMMM YYYY">{props.about.updated_at}</Moment>
              </Typography>
            ) : (
              ""
            )}
            <Typography component="div">
              <ReactMarkdown source={props.about.content} escapeHtml={false} />
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
