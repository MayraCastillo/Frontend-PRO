import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Menu from '../../../components/Menu/Menu';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Stepper from '../../../components/Stepper/Stepper3';
import Button from 'components/CustomButtons/Button.js';
import CountdownTimer from '../../../components/CountdownTimer/CountdownTimer';

const useStyles = makeStyles((theme) => ({
    justify: {
        textAlign: "justify",
    },
    button: {
        color: 'white',
		background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
	},
}));

export default function WaitingShift() {
    const classes = useStyles();
    return(<>
        <Menu />
        <Header />
        <main role="main" className="container-base">
			<Stepper /><br/>
			<section className="text-center">
				<h1 className="jumbotron-heading">¡Pedido Realizado!</h1>
                <p>Tu pedido se encuentra en proceso y pronto estará a la puerta de tu casa</p>
                <CountdownTimer />
			</section>
			<Button 
				className={classes.button}
				href="/inicio"
			>
               Volver al Inicio
            </Button>
		</main>
        <Footer />
    </>)
}