import React, { ReactElement } from "react";
import Moment from "react-moment";
import Link from "next/link";
import {
  ButtonBase,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";

import { getApiMediaUrl } from "../lib/api";
import { ArticleType, GraphQLData, TagType } from "../lib/types/graphql";
import useStyles from "../assets/jss/components/card";

interface CardProps {
  article: GraphQLData<ArticleType>;
}

function Card({ article }: CardProps): ReactElement {
  const classes = useStyles();

  return (
    <Link href={{ pathname: "/article", query: { id: article.id } }}>
      <ButtonBase className={classes.button}>
        <MuiCard className={classes.card} elevation={2} square={false}>
          <CardMedia
            className={classes.media}
            image={getApiMediaUrl(
              article.attributes.thumbnail.data?.attributes?.url
            )}
            title={
              article.attributes.thumbnail.data?.attributes?.alternativeText
            }
          />
          <CardContent>
            <Typography color="textSecondary" component="span" variant="button">
              {article.attributes.category.data?.attributes.name}
            </Typography>
            <Typography color="primary" component="h3" variant="h4">
              {article.attributes.title}
            </Typography>
            {article.attributes.publishedAt ? (
              <Typography
                color="textSecondary"
                component="span"
                variant="subtitle1">
                <Moment format="Do MMMM YYYY">
                  {article.attributes.publishedAt}
                </Moment>
              </Typography>
            ) : (
              ""
            )}
            <Typography component="div">
              {article.attributes.tags.data.map((tag: GraphQLData<TagType>) => (
                <Chip
                  key={tag.id}
                  label={tag.attributes.name}
                  style={{ backgroundColor: tag.attributes.color }}
                />
              ))}
            </Typography>
          </CardContent>
        </MuiCard>
      </ButtonBase>
    </Link>
  );
}

export default Card;
