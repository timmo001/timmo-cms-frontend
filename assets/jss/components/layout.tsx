import { makeStyles, Theme } from "@material-ui/core/styles";

const layoutStyle = makeStyles((theme: Theme) => ({
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: 160,
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  name: {
    marginTop: 80,
  },
  mainRaised: {
    position: "relative",
    marginTop: -60,
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center",
  },
  footer: {
    marginTop: 16,
  },
  slider: {
    margin: theme.spacing(4, 2),
  },
  sliderMediaContainer: {
    padding: theme.spacing(1),
  },
  sliderMedia: {
    height: 420,
    backgroundSize: "contain",
  },
  welcomeMessage: {
    margin: theme.spacing(2, 1),
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default layoutStyle;
