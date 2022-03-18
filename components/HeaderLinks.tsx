import React, { ReactElement } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useTheme } from "@mui/material/styles";
import { Button, List, ListItem, Tooltip } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEmail, mdiGithub, mdiTwitter } from "@mdi/js";

import { CategoryType, GraphQLData } from "../lib/types/graphql";
import useStyles from "../assets/jss/components/headerLinks";

interface HeaderLinksProps {
  categories: Array<GraphQLData<CategoryType>>;
}

function HeaderLinks({ categories }: HeaderLinksProps): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/about">
          <Button variant="text" className={classes.navLink}>
            <span className={classes.listItemText}>About Me</span>
          </Button>
        </Link>
      </ListItem>
      <ListItem className={clsx(classes.listItem, classes.divider)} />
      {categories.map(
        ({ id, attributes }: GraphQLData<CategoryType>, index: number) => (
          <ListItem key={index} className={classes.listItem}>
            <Link href={{ pathname: "/category", query: { id } }}>
              <Button variant="text" className={classes.navLink}>
                <span className={classes.listItemText}>{attributes.name}</span>
              </Button>
            </Link>
          </ListItem>
        )
      )}
      <ListItem className={clsx(classes.listItem, classes.divider)} />
      <ListItem className={classes.listItem}>
        <Tooltip title="GitHub" classes={{ tooltip: classes.tooltip }}>
          <Button
            variant="text"
            className={classes.navLink}
            href="https://github.com/timmo001"
            target="_blank">
            <Icon
              path={mdiGithub}
              color={theme.palette.text.primary}
              size={1}
            />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip title="Twitter" classes={{ tooltip: classes.tooltip }}>
          <Button
            variant="text"
            className={classes.navLink}
            href="https://twitter.com/timmo001"
            target="_blank">
            <Icon
              path={mdiTwitter}
              color={theme.palette.text.primary}
              size={1}
            />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip title="Email" classes={{ tooltip: classes.tooltip }}>
          <Button
            variant="text"
            className={classes.navLink}
            href="mailto:contact@timmo.xyz"
            target="_blank">
            <Icon color={theme.palette.text.primary} path={mdiEmail} size={1} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default HeaderLinks;
