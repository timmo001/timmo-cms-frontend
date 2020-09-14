import React from "react";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getApiMediaUrl,
  getCategories,
  getGeneral,
  getPage,
  getPages,
} from "../../lib/api";
import Layout from "../../components/Layout";
import Parallax from "../../components/Parallax";
import useStyles from "../../assets/jss/components/layout";

const Page = (props) => {
  const classes = useStyles();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: props.page.showcase_slides || 3,
    slidesToScroll: props.page.showcase_slides || 3,
  };
  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          props.page.header_media
            ? props.page.header_media.url
            : props.general.header_media?.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography variant="h3">{props.page.title}</Typography>
            <ReactMarkdown source={props.page.content} escapeHtml={false} />
          </CardContent>
        </Card>
        {props.page.showcase_media.length > 0 ? (
          <Card>
            <CardContent>
              <Slider className={classes.slider} {...sliderSettings}>
                {props.page.showcase_media.map(
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

export async function getStaticPaths() {
  const pages = (await getPages()) || [];
  return {
    paths: pages.map((page) => ({
      params: {
        id: page.id,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const page = await getPage(context.params.id);
  const pages = (await getPages()) || [];
  return {
    props: { categories, general, page, pages },
    revalidate: 1,
  };
};

export default Page;
