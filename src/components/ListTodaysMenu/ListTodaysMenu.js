import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useDispatch, useSelector } from "react-redux";
import { addTodaysMenuAction } from "../../redux/Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers() {
  const classes = useStyles();
  const todaysMenu = useSelector((state) => state.todaysmenu);
  const dispatch = useDispatch();

  const addTodaysMenu = (nameTodaysMenu) => {
    let newTodaysMenu = { id: todaysMenu.length, name: nameTodaysMenu };
    dispatch(addTodaysMenuAction(newTodaysMenu));
  };

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <p>Sopas</p>
      <ListItem button onClick={() => addTodaysMenu("Inbox")}>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider />
      <ListItem button divider onClick={() => addTodaysMenu("Drafts")}>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button onClick={() => addTodaysMenu("Drafts")}>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
}