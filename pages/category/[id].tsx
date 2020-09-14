import { GetStaticProps } from "next";
import Articles from "../../components/Articles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  getApiMediaUrl,
  getCategories,
  getCategory,
  getGeneral,
} from "../../lib/api";
import Layout from "../../components/Layout";
import Parallax from "../../components/Parallax";
import useStyles from "../../assets/jss/components/layout";

const Category = (props) => {
  const classes = useStyles();

  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          props.category.header_media
            ? props.category.header_media.url
            : props.general.header_media?.url
        )}
      />
      <Container
        className={classes.mainRaised}
        component="article"
        maxWidth="xl">
        <Card>
          <CardContent>
            <Typography align="center" variant="h3" gutterBottom>
              {props.category.name}
            </Typography>
            <Articles articles={props.category.articles} />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categories = (await getCategories()) || [];
  return {
    paths: categories.map((category) => ({
      params: {
        id: category.id,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const category = (await getCategory(context.params.id)) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return {
    props: { category, categories, general },
    revalidate: 1,
  };
};

export default Category;
