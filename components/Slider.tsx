import React, { ReactElement } from "react";
import Slick from "react-slick";

import { GraphQLData, MediaAttributes } from "../lib/types/graphql";
import Image from "./Image";
import useStyles from "../assets/jss/components/layout";

interface SliderProps {
  media: Array<GraphQLData<MediaAttributes>>;
  slides: number;
}

function Slider(props: SliderProps): ReactElement {
  const classes = useStyles();

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToScroll: props.slides || 3,
    slidesToShow: props.slides || 3,
    speed: 500,
    swipeToSlide: true,
  };

  return (
    <Slick className={classes.slider} {...sliderSettings}>
      {props.media.map((media: GraphQLData<MediaAttributes>) => (
        <div className={classes.sliderMediaContainer} key={media.id}>
          <Image media={media.attributes} />
        </div>
      ))}
    </Slick>
  );
}

export default Slider;
