import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from "../ListTodaysMenu/ListTodaysMenu";
import TodaysMenu from "../TodaysMenu/TodaysMenu";
import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer";
import { Provider } from "react-redux";
import { store } from "../../redux/Store";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Provider store={store}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <List />
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <TodaysMenu />
          </GridItem>
        </GridContainer>
      </Provider>
    </div>
  );
}