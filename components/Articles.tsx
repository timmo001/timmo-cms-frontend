import React from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

import Card from "./Card";

const Articles = ({ articles }) => {
  articles.sort((a, b) =>
    moment(a.published_at) < moment(b.published_at) ? 1 : -1
  );

  return (
    <Grid container direction="row" alignItems="center" justify="space-around">
      {articles.map((article, index) => (
        <Grid key={index} item lg={3} md={6} sm={8} xs={12}>
          <Card article={article} key={`article__${article.id}`} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;
