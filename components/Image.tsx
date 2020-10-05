import React, { Fragment, useState } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import { getApiMediaUrl } from "../lib/api";
import useStyles from "../assets/jss/components/layout";

export interface MediaType {
  url: string;
  alternativeText: string;
  caption: string;
}

interface SliderProps {
  media: MediaType;
}

const Image = (props: SliderProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const openMediaDialog = () => setShowDialog(true);
  const closeMediaDialog = () => setShowDialog(false);

  const classes = useStyles();

  return (
    <Fragment>
      <ButtonBase className={classes.galleryItem} onClick={openMediaDialog}>
        <Card className={classes.galleryItemCard}>
          <CardMedia
            className={classes.galleryItemMedia}
            image={getApiMediaUrl(props.media.url)}
            title={props.media.alternativeText}
          />
          <Typography variant="h5">{props.media.alternativeText}</Typography>
        </Card>
      </ButtonBase>
      <Dialog
        aria-describedby="scroll-dialog-description"
        aria-labelledby="scroll-dialog-title"
        maxWidth="xl"
        scroll="body"
        open={showDialog}
        onClick={closeMediaDialog}
        onClose={closeMediaDialog}>
        {showDialog ? (
          <Fragment>
            {props.media.alternativeText ? (
              <DialogTitle>
                <Typography variant="h3">
                  {props.media.alternativeText}
                </Typography>
              </DialogTitle>
            ) : (
              ""
            )}
            <DialogContent>
              {props.media.caption ? (
                <Typography variant="body1" gutterBottom>
                  {props.media.caption}
                </Typography>
              ) : (
                ""
              )}
              <img
                src={getApiMediaUrl(props.media.url)}
                alt={props.media.alternativeText}
              />
            </DialogContent>
          </Fragment>
        ) : (
          ""
        )}
      </Dialog>
    </Fragment>
  );
};

export default Image;
