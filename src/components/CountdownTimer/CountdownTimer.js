import React, { useRef, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    button: {
        color: 'white',
		background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
    },

    countdownTimerContainer: {
        width: '70%',
        margin: 'auto',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    countdownTimerElement: {
        width: '15%',
        alignItems: 'center',
        color: '#1394A8',
    },
}));

/**
 * Se establece un temporizador, el cual le informa al cliente en horas, minutos y segundos,
 * un tiempo aproximado para que el pedido realizado llegue a su destino.
 */
export default function CountdownTimer() {
    const classes = useStyles();
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();
    
    const startTimer = () => {
        const countdownDate = new Date('May 30, 2021 17:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(distance % (1000 * 60) / 1000);

            if(distance < 0){
                //Stop our timer
                clearInterval(interval.current);
            }else{
                //Update Timer
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }

        }, 1000)
    }

    useEffect(() => {
        startTimer();
        return() =>{
            clearInterval(interval.current);
        };
    })

    return(<>
        <main role="main" className="container-base">
            <div className={classes.countdownTimerContainer}>
                <section className={classes.countdownTimerElement}>
                    <h1>{timerHours}</h1>
                    <p><small>Horas</small></p>
                </section>

                <section className={classes.countdownTimerElement}>
                    <h1>:</h1>
                    <p><small>.</small></p>
                </section>

                <section className={classes.countdownTimerElement}>
                    <h1>{timerMinutes}</h1>
                    <p><small>Minutos</small></p>
                </section>
                
                <section className={classes.countdownTimerElement}>
                    <h1>:</h1>
                    <p><small>.</small></p>
                </section>

                <section className={classes.countdownTimerElement}>
                    <h1>{timerSeconds}</h1>
                    <p><small>Segundos</small></p>
                </section>
            </div>
		</main>
    </>)
}