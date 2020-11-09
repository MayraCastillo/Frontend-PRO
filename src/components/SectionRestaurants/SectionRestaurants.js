import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';

import imgRestaurant from "../../assets/img/logoRestauranteEjemplo.jpg"

const URL = `http://localhost:8092/restaurantes`;

export default function SectionRestaurants() {
	
	const [data, setData] = useState([]);

	//Lista los Restaurantes
	const GetRestaurants = async () => {
		await Axios.get(URL)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		GetRestaurants();
	}, []);

	const selectRestaurant = (idRestaurant, nameRestaurant) => {
		localStorage.setItem('idRestSelect', idRestaurant);
		localStorage.setItem('nameRestSelect', nameRestaurant);
	};

	return (
		<div className="container servicios">
			<div className="row">
				{data.map((rest) => (
					<div className="col-lg-4" key={rest.nitRest}>
						<img 
							className="bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={imgRestaurant}
							title={rest.nombreRest}
						/>
						<h2>{rest.nombreRest}</h2>
						<p>{rest.descRest}</p>
						<p>
							<a
								className="btn btn-info"
								href="/cliente/restaurantes/productos"
								role="button"
								onClick={() => selectRestaurant(rest.nitRest, rest.nombreRest)}
							>
								Ver Productos &raquo;
							</a>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
