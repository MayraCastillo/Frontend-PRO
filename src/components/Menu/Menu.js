import React from 'react';
import {NavLink} from "react-router-dom";

export default function Menu() {

    const cerrarSesion = () => {
		localStorage.setItem('token', '');
		localStorage.setItem('idUsuario', '');
		localStorage.setItem('nombreRol', '');
        localStorage.setItem('correo', '');
        
        window.location.href = '/login';
	};
  
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

            <NavLink to="/" className="navbar-brand">PRO</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Inicio </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/nosotros" className="nav-link">Nosotros </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/contacto" className="nav-link">Contacto </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/restaurantes" className="nav-link">Restaurantes </NavLink>
                    </li>
                </ul>

                <button 
                    className="btn btn-outline-success my-2 my-sm-0"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={() => cerrarSesion()}
                >Cerrar Sesión</button>
            </div>
        </nav>
    )
}