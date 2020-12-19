import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '../../../components/Menu/Menu2';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
    backgroundMenu:{
        background: 'rgba(0,0,0,0.6)',
    },

    content:{
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.6)',
    },

    contentHome: {
        width: '80%',
        height: '650px',
        margin: 'auto',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },

    button: {
        color: 'white',
		background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
	},

    footerHome: {
        width: '80%',
        bottom: '20px',
        position: 'absolute',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },

    footerElement: {
        width: '33%',
        display: 'flex',
        alignItems: 'center',
    },
      
    footerIcon: {
        width: '60px',
        height: '60px',
        float: 'left',
    },
      
    footerText: {
        width: '70%',
        float: 'left',
        marginTop: '15px',
        marginLeft: '10px',
        fontSize: '12px',
        textAlign: 'left',
    },
}));

export default function Home() {
    const classes = useStyles();
    return(<>
        <Menu />
        <main role="main" className="background-base">
          <div className={classes.content}>
            <div className={classes.contentHome}>
                <div >
                    <h1>
                        ¿AÚN NO SABES QUE ORDENAR?
                    </h1>
                    <p>
                        Comienza conociendo los restaurantes diponibles en nuestra aplicación
                    </p>

                    <Button
                        variant="contained"
                        className={classes.button}
                        href = "/restaurantes"
                    >
                        Ver Restaurantes
                    </Button>
                </div>

                <div className={classes.footerHome}>
                    <div className={classes.footerElement}>
                        <LocalDiningIcon className={classes.footerIcon}/>
                        <div className={classes.footerText}>
                            <p>
                                <b>¡Selecciona un Establecimiento!</b>
                                <br/>Todos los restaurantes con delivery online.
                            </p>
                        </div>
                    </div>

                    <div className={classes.footerElement}>
                        <LocalGroceryStoreIcon className={classes.footerIcon}/>
                        <div className={classes.footerText}>
                            <p>
                                <b>¡Realiza tu Pedido!</b>
                                <br/>Es fácil y rápido. Puedes seleccionar desde el menú del día hasta platos especiales.
                            </p>
                        </div>
                    </div>

                    <div className={classes.footerElement}>
                        <MonetizationOnIcon className={classes.footerIcon}/>
                        <div className={classes.footerText}>
                            <p>
                                <b>¡Finaliza tu Pedido!</b>
                                <br/>Realiza tu pago online y recibe el pedido en la puerta de tu casa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </main>
    </>)
}