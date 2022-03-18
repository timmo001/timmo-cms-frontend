import React, { ReactElement } from "react";
import { Grid } from "@mui/material";

import { ArticleType, GraphQLData } from "../lib/types/graphql";
import Card from "./Card";

interface ArticlesProps {
  articles: Array<GraphQLData<ArticleType>>;
}

function Articles({ articles }: ArticlesProps): ReactElement {
  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      justifyContent="space-around">
      {articles.map((article: GraphQLData<ArticleType>) => (
        <Grid key={article.id} item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Card article={article} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Articles;
