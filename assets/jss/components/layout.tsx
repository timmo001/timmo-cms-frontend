import { makeStyles, Theme } from "@material-ui/core/styles";

const layoutStyle = makeStyles((theme: Theme) => ({
  cardOverflow: {
    overflow: "visible",
  },
  cardContentOverflow: {
    paddingTop: 140,
    "& h2": {
      textAlign: "center",
    },
    "& h3": {
      textAlign: "center",
    },
  },
  profile: {
    position: "absolute",
    top: -160,
    left: "calc(50% - 140px)",
    height: 280,
    width: 280,
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
  flex: { flex: 1 },
}));

export default layoutStyle;
