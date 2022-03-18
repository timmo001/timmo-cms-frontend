import React, { ReactElement } from "react";
import { GetStaticProps } from "next";
import Moment from "react-moment";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import {
  getAbout,
  getApiMediaUrl,
  getArticles,
  getCategories,
  getGeneral,
} from "../lib/api";
import { AboutType, CategoryType, GeneralType, GraphQLData } from "../lib/types/graphql";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Parallax from "../components/Parallax";
import Slider from "../components/Slider";
import useStyles from "../assets/jss/components/layout";

export interface AboutProps {
  about: AboutType;
  categories: Array<GraphQLData<CategoryType>>;
  general: GeneralType;
}

function About({ about, categories, general }: AboutProps): ReactElement {
  const classes = useStyles();

  return (
    <Layout
      classes={classes}
      description={`About Me - ${about.name} - ${about.subtitle}`}
      keywords="Timmo, Aidan Timson, About Me, Bio, Portfolio"
      title="About Me"
      url="https://timmo.dev/about"
      categories={categories}
      general={general}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          about.header
            ? about.header.data?.attributes.url
            : general.header.data?.attributes.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card className={classes.cardOverflow}>
          <Avatar
            className={classes.profile}
            alt={about.name}
            src={about.profile?.data.attributes.url}
            style={{
              position: "absolute",
              top: -160,
              left: "calc(50% - 140px)",
            }}
          />
          <CardContent className={classes.cardContentOverflow}>
            <Typography component="h2" variant="h3">
              {about.name}
            </Typography>
            <Typography component="h3" variant="h5">
              {about.subtitle}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {about.updatedAt ? (
              <Typography variant="subtitle1" color="textSecondary">
                {"Last updated: "}
                <Moment format="Do MMMM YYYY">{about.updatedAt}</Moment>
              </Typography>
            ) : (
              ""
            )}
            <Typography component="div">
              <Markdown source={about.content} escapeHtml={false} />
            </Typography>
          </CardContent>
        </Card>
        {about.showcase.data.length > 0 ? (
          <Card>
            <CardContent>
              <Slider
                media={about.showcase.data}
                slides={about.showcaseSlides}
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
