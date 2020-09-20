import Articles from "../components/Articles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { getApiMediaUrl, getCategories, getGeneral } from "../lib/api";
import Layout from "../components/Layout";
import Parallax from "../components/Parallax";
import useStyles from "../assets/jss/components/layout";

const Category = (props) => {
  const category = props.categories.find(
    (category) => category.id === props.query.id
  );

  const classes = useStyles();

  if (!category)
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
                Could not find category
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    );

  return (
    <Layout {...props} classes={classes}>
      <Parallax
        small
        filter
        image={getApiMediaUrl(
          category.header_media
            ? category.header_media.url
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
              {category.name}
            </Typography>
            <Articles articles={category.articles} />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

Category.getInitialProps = async ({ query }) => {
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  return { categories, general, query };
};

export default Category;
