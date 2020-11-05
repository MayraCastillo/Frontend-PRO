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

const baseUrl = `http://localhost:8092/restaurantes/crear-restaurante`;
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
export default function CrearRestaurante() {
	const classes = useStyles();
	const [nitRest, setNitRest] = React.useState('');
	const [nombreRest, setNombreRest] = React.useState('');
	const [descRest, setDescRest] = React.useState('');
	const [telefonoRest, setTelefonoRest] = React.useState('');

	const [categoriaPlato, setCategoriaPlato] = React.useState('');

	const [validarExistenciaPlato, setValidarExistenciaPlato] = React.useState();
	// const [errorNombre, setErrorNombre] = React.useState("");
	/*
	async function validarExistencia() {
		let response;
		var authOptions = {
			method: 'GET',
			url: `http://localhost:8091/platos/buscar-por-nombre/` + nombrePlato,
			data: {
				nombrePlato: nombrePlato,
			},
			json: true,
		};
		//console.log(authOptions);
		await Axios(authOptions)
			.then(function (response) {
				//setLoading(false);
				//setValidarExistenciaPlato(response.data[0].nombrePlato);
        //console.log(validarExistenciaPlato);
        /*
				if (response.data[0].nombrePlato == nombrePlato) {
					setValidarExistenciaPlato('Existe');
				}
			})
			.catch(function (error) {
				//setLoading(false);
				//console.log("2")
				setValidarExistenciaPlato('No existe');
				// console.log("No existee");
			});
	}
*/
	async function sendData() {
		/*
		if (validarExistenciaPlato == 'Existe') {
			toast.error('El usuario ya existe');
		} else {*/
		let response;
		var authOptions = {
			method: 'POST',
			url: baseUrl,
			data: {
				nitRest: nitRest,
				nombreRest: nombreRest,
				descRest: descRest,
				telefonoRest: telefonoRest,
				categoriaRest: 'vacia',
			},
			json: true,
		};
		console.log(authOptions);
		await Axios(authOptions)
			.then(function (response) {
				//setLoading(false);

				toast.success('Se creo el restaurante');
				//console.log("1")
			})
			.catch(function (error) {
				//setLoading(false);
				console.log(error);
			});
		//}
	}

	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Datos del Restaurante</h4>
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
										label="Nombre del Restaurante"
										variant="outlined"
										onChange={(e) => setNombreRest(e.target.value)}
										//onBlur={validarExistencia}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required="true"
										fullWidth
										label="Nit del Restaurante"
										variant="outlined"
										onChange={(e) => setNitRest(e.target.value)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Dirección del Restaurante"
										variant="outlined"
										onChange={(e) => setDescRest(e.target.value)}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Teléfono del Restaurante"
										variant="outlined"
										onChange={(e) => setTelefonoRest(e.target.value)}
									/>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
			<div className={classes.sendData}>
				<Button onClick={sendData} variant="contained" color="warning">
					Crear
				</Button>
			</div>
		</div>
	);
}
