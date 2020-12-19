import React from 'react';
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
    },

    text: {
        marginBottom: '0px',
        marginLeft: '12px',
	},
}));

export default function SimpleMenu() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const cerrarSesion = () => {
		localStorage.setItem('token', '');
		localStorage.setItem('idUsuario', '');
		localStorage.setItem('nombreRol', '');
        localStorage.setItem('correo', '');
        localStorage.setItem('idRestSelect', '');
        localStorage.setItem('nameRestSelect', '');
        
        window.location.href = '/login';
	};
  
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <NavLink to="/inicio" className="navbar-brand">PRO</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <NavLink to="/inicio" className="nav-link">Inicio </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/nosotros" className="nav-link">Nosotros </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/contacto" className="nav-link">Contacto </NavLink>
                    </li>
                </ul>

                <Button
                    className={classes.button}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    textColor="white"
                    onClick={handleClick}
                >
                    <Avatar src="/broken-image.jpg" />
                    <p className={classes.text}>Cristian Lopez</p>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem disabled><PermIdentityIcon /> Perfil</MenuItem>
                    <MenuItem disabled><EventNoteIcon /> Mis Pedidos</MenuItem>
                    <MenuItem disabled><FavoriteBorderIcon /> Mis Favoritos</MenuItem>
                    <MenuItem onClick={() => cerrarSesion()}><ExitToAppIcon /> Salir</MenuItem>
                </Menu>
            </div>
        </nav>
    )
}