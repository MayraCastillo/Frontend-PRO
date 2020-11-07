import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Axios from 'axios';
import { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';
const baseUrl = `http://localhost:8091/restaurantes/buscar-por-nit/1`;
const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	row: {
		display: 'flex',
		spacing: 10,
		marginBottom: 25,
	},
	item: {
		marginRight: '5%',
	},
	select: {
		width: '30%',
		marginRight: '5%',
	},
	selectRight: {
		width: '30%',
	},
	sendData: {
		width: '100%',
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		alignContent: 'flex-end',
		flexDirection: 'row',
		display: 'flex',
	},
}));

toast.configure();
export default function ActualizarInfoRest() {
	const classes = useStyles();
	//Hook para capturar la data

	const [dataOfClient, setDataOfClient] = useState({
		nombreRest: '',
		descRest: '',
	});
	function setInfo(field, value) {
		setDataOfClient({ ...dataOfClient, [field]: value });
	}

	async function sendData() {
		let response;
		const baseUrlPut = `http://localhost:8092/restaurantes/actualizar-restaurante/1`;
		var authOptions = {
			method: 'PUT',
			url: baseUrlPut,
			data: {
				nombreRest: dataOfClient.nombreRest,
				descRest: dataOfClient.descRest,
				telefonoRest: '12345',
				categoriaRest: 'Almuerzos caseros',
			},
			json: true,
		};
		console.log(authOptions);
		await Axios(authOptions)
			.then(function (response) {
				toast.success('Actualización Exitosa');
			})
			.catch(function (error) {
				//setLoading(false);
				console.log(error);
			});
	}
	const peticionGet = async () => {
		await Axios.get(baseUrl)
			.then((response) => {
				setDataOfClient(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		peticionGet();
	}, []);

	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>
								INFORMACIÓN RESTAURANTE
							</h4>
							<p className={classes.cardCategoryWhite}>Complete los campos</p>
						</CardHeader>
						<CardBody>
							<GridContainer>
								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										//label="Nombre del Restaurante"

										variant="outlined"
										onChange={(e) => setInfo('nombreRest', e.target.value)}
										value={dataOfClient.nombreRest}
										label="Nombre Del Restaurante"
										//onBlur={validarExistencia}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										variant="outlined"
										onChange={(e) => setInfo('descRest', e.target.value)}
										value={dataOfClient.descRest}
										label="Descripción"
									/>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>

			<div className={classes.sendData}>
				<Button onClick={sendData} variant="contained" color="primary">
					Actualizar
				</Button>
			</div>
		</div>
	);
}
