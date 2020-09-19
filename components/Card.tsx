import React from "react";
import Moment from "react-moment";
import Link from "next/link";
import ButtonBase from "@material-ui/core/ButtonBase";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import MuiCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { getApiMediaUrl } from "../lib/api";
import useStyles from "../assets/jss/components/card";

const Card = ({ article }) => {
  const classes = useStyles();

  return (
    <Link as={`/article/${article.id}`} href="/article/[id]">
      <ButtonBase className={classes.button}>
        <MuiCard className={classes.card} elevation={2} square={false}>
          {article.thumbnail_media ? (
            <CardMedia
              className={classes.media}
              image={getApiMediaUrl(article.thumbnail_media.url)}
              title={article.thumbnail_media.alternativeText}
            />
          ) : (
            ""
          )}
          <CardContent>
            <Typography color="textSecondary" component="span" variant="button">
              {article.category?.name}
            </Typography>
            <Typography color="primary" component="h3" variant="h4">
              {article.title}
            </Typography>
            <Typography
              color="textSecondary"
              component="span"
              variant="subtitle1">
              <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
            </Typography>
            <Typography component="div">
              {article.tags
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((tag, index) => (
                  <Chip key={index} label={tag.name} />
                ))}
            </Typography>
          </CardContent>
        </MuiCard>
      </ButtonBase>
    </Link>
  );
};

export default Card;
