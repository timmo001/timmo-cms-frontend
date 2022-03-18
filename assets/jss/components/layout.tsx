import { makeStyles } from "@mui/styles";

const layoutStyle = makeStyles(() => ({
  alert: {
    marginTop: 16,
  },
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
    height: "280px !important",
    width: "280px !important",
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
    margin: "32px 16px",
  },
  sliderMediaContainer: {
    padding: 8,
  },
  sliderMedia: {
    height: 420,
    backgroundSize: "contain",
  },
  galleryItem: {
    width: "100%",
  },
  galleryItemCard: {
    width: "100%",
  },
  galleryItemMedia: {
    width: "100%",
    height: 420,
    backgroundSize: "contain",
  },
  welcomeMessage: {
    margin: "16px 8px",
  },
  title: {
    marginTop: "16px",
  },
  flex: { flex: 1 },
}));

export default layoutStyle;
