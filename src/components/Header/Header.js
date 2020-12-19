import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import imglogoPRO from "../../assets/img/logoPROEjemplo.png"

const useStyles = makeStyles({

    backgroundHeader:{
        background: 'url("https://i.imgur.com/sr2iokx.png") no-repeat fixed center',
        width: '100%',
    },

    containerHeader :{
        width: '100%',
        height: '180px',
        background: 'rgba(0,0,0,0.6)',
        marginTop: '56px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },

    restaurantInformation: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
    },
      
    restaurantLogo: {
        width: '130px',
        height: '130px',
        float: 'left',
    },
      
    restaurantName: {
        width: '50%',
        height: '70px',
        float: 'left',
    },

    image: {
        width: '100%',
    },
  
});

export default function Header() {
  
    const classes = useStyles();

    return (
        <header >
            <div className={classes.backgroundHeader}>
                <div className={classes.containerHeader}>
                    <div className={classes.restaurantInformation}>
                        <div className={classes.restaurantLogo}>
                            <img className={classes.image} src={imglogoPRO}/>
                        </div> 
                        <div cclassName={classes.restaurantName}><h2><b>Project Restaurant Online</b></h2></div> 
                    </div>
                </div>
            </div>
        </header>
    )
}