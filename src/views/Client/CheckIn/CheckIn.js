import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Menu from '../../../components/Menu/Menu';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import CardOrderConfirm from "../../../components/CardOrder/CardOrderConfirm";
import SectionCheckIn from "../../../components/SectionCheckIn/SectionCheckIn";
import Stepper from '../../../components/Stepper/Stepper3';

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
        <main role="main" className="container-base">
            <Stepper /><br/>
            <div className={classes.justify}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <SectionCheckIn />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <GridItem>
                        <CardOrderConfirm />
                    </GridItem>
                </GridItem>
            </GridContainer>
            </div>
        </main>
        <Footer />
    </>)
}