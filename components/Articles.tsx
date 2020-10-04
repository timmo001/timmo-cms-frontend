import React from "react";
import Grid from "@material-ui/core/Grid";

import Card from "./Card";

const Articles = ({ articles }) => {
  return (
    <Grid container direction="row" alignItems="stretch" justify="space-around">
      {articles.map((article, index) => (
        <Grid key={index} item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Card article={article} key={`article__${article.id}`} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;
