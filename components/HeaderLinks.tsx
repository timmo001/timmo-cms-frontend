import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@mdi/react";
import { mdiGithub, mdiTwitter, mdiHomeAssistant, mdiTwitch } from "@mdi/js";

import styles from "../assets/jss/components/headerLinks";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/">
          <Button variant="text" className={classes.navLink}>
            <span className={classes.listItemText}>Home</span>
          </Button>
        </Link>
      </ListItem>
      {props.pages.map(({ id, title }) => {
        <ListItem className={classes.listItem}>
          <Link as={`/page/${id}`} href="/page/[id]">
            <Button variant="text" className={classes.navLink}>
              <span className={classes.listItemText}>{title}</span>
            </Button>
          </Link>
        </ListItem>;
      })}
      <ListItem className={clsx(classes.listItem, classes.divider)} />
      <ListItem className={classes.listItem}>
        <Tooltip
          title="Home Assistant Community"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            variant="text"
            className={classes.navLink}
            href="https://community.home-assistant.io/u/timmo001/summary"
            target="_blank"
          >
            <Icon
              path={mdiHomeAssistant}
              color={theme.palette.text.primary}
              size={1}
            />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          title="Twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            variant="text"
            className={classes.navLink}
            href="https://twitter.com/timmo001"
            target="_blank"
          >
            <Icon
              path={mdiTwitter}
              color={theme.palette.text.primary}
              size={1}
            />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          title="Twitch"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            variant="text"
            className={classes.navLink}
            href="https://twitch.tv/timmo001"
            target="_blank"
          >
            <Icon
              path={mdiTwitch}
              color={theme.palette.text.primary}
              size={1}
            />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          title="GitHub"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            variant="text"
            className={classes.navLink}
            href="https://github.com/timmo001"
            target="_blank"
          >
            <Icon
              path={mdiGithub}
              color={theme.palette.text.primary}
              size={1}
            />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
