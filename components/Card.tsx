import React from "react";
import Moment from "react-moment";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MuiCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { getApiMediaUrl } from "../lib/api";
import styles from "../assets/jss/components/card";

const useStyles = makeStyles(styles);

const Card = ({ article }) => {
  const classes = useStyles();

  return (
    <Link as={`/article/${article.id}`} href="/article/[id]">
      <ButtonBase>
        <MuiCard className={classes.card} elevation={2} square={false}>
          {article.image ? (
            <CardMedia
              className={classes.media}
              image={getApiMediaUrl(article.image.url)}
              title={article.image.alternativeText}
            />
          ) : (
            ""
          )}
          <CardContent>
            <Typography variant="button" color="textSecondary">
              {article.category?.name}
            </Typography>
            <Typography variant="h4" color="textPrimary">
              {article.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
            </Typography>
          </CardContent>
        </MuiCard>
      </ButtonBase>
    </Link>
  );
};

export default Card;
