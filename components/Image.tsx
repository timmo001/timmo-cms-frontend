import React, { Fragment, ReactElement, useState } from "react";
import {
  ButtonBase,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { getApiMediaUrl } from "../lib/api";
import { MediaAttributes } from "../lib/types/graphql";
import useStyles from "../assets/jss/components/layout";

interface SliderProps {
  hideCaption?: boolean;
  hidePaper?: boolean;
  hideTitle?: boolean;
  media: Partial<MediaAttributes>;
  showAsImage?: boolean;
}

function Image({
  hideCaption,
  hidePaper,
  hideTitle,
  media,
  showAsImage,
}: SliderProps): ReactElement {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const openMediaDialog = () => setShowDialog(true);
  const closeMediaDialog = () => setShowDialog(false);

  const classes = useStyles();

  return (
    <Fragment>
      <ButtonBase
        className={!showAsImage ? classes.galleryItem : ""}
        onClick={openMediaDialog}>
        <Card className={classes.galleryItemCard} elevation={hidePaper ? 0 : 1}>
          {showAsImage ? (
            <img src={getApiMediaUrl(media.url)} alt={media.alternativeText} />
          ) : (
            <CardMedia
              className={classes.galleryItemMedia}
              image={getApiMediaUrl(media.url)}
              title={media.alternativeText}
            />
          )}
          {!hideTitle ? (
            <Typography variant="h5">{media.alternativeText}</Typography>
          ) : (
            ""
          )}
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
            {!hideTitle && media.alternativeText ? (
              <DialogTitle>
                <Typography variant="h3">{media.alternativeText}</Typography>
              </DialogTitle>
            ) : (
              ""
            )}
            <DialogContent>
              {!hideCaption && media.caption ? (
                <Typography variant="body1" gutterBottom>
                  {media.caption}
                </Typography>
              ) : (
                ""
              )}
              <img
                src={getApiMediaUrl(media.url)}
                alt={media.alternativeText}
              />
            </DialogContent>
          </Fragment>
        ) : (
          ""
        )}
      </Dialog>
    </Fragment>
  );
}

export default Image;
