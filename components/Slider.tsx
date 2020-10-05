import React from "react";
import Slick from "react-slick";

import Image, { MediaType } from "./Image";
import useStyles from "../assets/jss/components/layout";

interface SliderProps {
  media: MediaType[];
  slides: number;
}

const Slider = (props: SliderProps) => {
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
      {props.media.map((media: MediaType, index: number) => (
        <div className={classes.sliderMediaContainer} key={index}>
          <Image media={media} />
        </div>
      ))}
    </Slick>
  );
};

export default Slider;
