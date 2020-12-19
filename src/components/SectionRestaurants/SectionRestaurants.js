import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

const URL = `http://localhost:8092/restaurantes`;

const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	},
	button: {
	  color: 'white',
	  background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
	},

	contentText:{
		height: '135px',
		textAlign: 'justify',
    },
  }));

  /**
   * Esta funcion permite visualizar informacion basica (Nombre, imagen y descripcion) de cada
   * uno de los restaurantes que se encuentran suscritos en la aplicacion y ofrecen sus servicios
   * a los diversos clientes que hacen uso de la aplicacion PRO.
   */
export default function SectionRestaurants() {
	
	const classes = useStyles();
	const [data, setData] = useState([]);
	
	/**
	 * Solicitud GET que se realiza a la base de datos y se obtiene como resultad
	 * un listado de todos los restaurantes dque se encuentran registrados en la aplicacion.
	 */
	const GetRestaurants = async () => {
		await Axios.get(URL)
			.then((response) => {
				console.log(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		GetRestaurants();
	}, []);

	/**
	 * Guarda en dos variables locales (localstorage) la informacion relevante del restaurante seleccionado.
	 * @param {*ID del restaurante seleccionado por el cliente} idRestaurant 
	 * @param {*Nombre del restaurante seleccionado por el cliente} nameRestaurant 
	 */
	const selectRestaurant = (idRestaurant, nameRestaurant) => {
		localStorage.setItem('idRestSelect', idRestaurant);
		localStorage.setItem('nameRestSelect', nameRestaurant);
	};

	return (
		<div className="container servicios">
			<div className="row">
				{data.map((rest) => (
					<div 
						className="col-lg-4 shadow-sm"
						style={{ padding: 30, marginTop: 30}}
						key={rest.nitRest}
					>
						<img 
							className="bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={rest.imgRest}
							title={rest.nombreRest}
						/>
						
						<h2>{rest.nombreRest}</h2>
						<p className={classes.contentText}>{rest.descRest}</p>
						
						<Button 
							className={classes.button}
							onClick={() => selectRestaurant(rest.nitRest, rest.nombreRest)}
							href = "/restaurantes/productos"
						>
							Ver Productos &raquo;
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
