import { makeStyles, Theme } from "@material-ui/core/styles";

const cardStyle = makeStyles((_theme: Theme) => ({
  button: {
    width: "100%",
  },
  card: {
    width: "100%",
  },
  media: {
    height: 320,
    backgroundSize: "contain",
  },
}));

export default cardStyle;
