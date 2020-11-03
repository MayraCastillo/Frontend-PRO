import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import Menu from '../../../components/Menu/Menu';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import Tabs from "../../../components/Tabs/Tabs";
import CardOrder from "../../../components/CardOrder/CardOrder";

const useStyles = makeStyles((theme) => ({
    justify: {
        textAlign: "justify",
    },
  }));

export default function Orders() {
    const classes = useStyles();
    return(<>
        <Menu />
        <Header />
        <main role="main" className="containerBase">
            <div className={classes.justify}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Tabs />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <GridItem>
                        <CardOrder />
                    </GridItem>
                </GridItem>
            </GridContainer>
            </div>
        </main>
        <Footer />
    </>)
}