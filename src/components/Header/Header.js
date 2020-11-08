import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import imglogoPRO from "../../assets/img/logoPROEjemplo.png"

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
});

export default function Header() {
  
    const classes = useStyles();

    return (
        <header className="App-header">
            <div className="container-header">
                <div className="restaurant-information">
                    <div className="restaurant-logo">
                        <img className={classes.root} src={imglogoPRO}/>
                    </div> 
                    <div className="restaurant-name"><h2><b>Project Restaurant Online</b></h2></div> 
                </div>
            </div>
        </header>
    )
}