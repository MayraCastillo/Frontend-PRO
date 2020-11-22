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
import { Modal } from '@material-ui/core';

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
	modal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
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

	const [validarExistenciaRest, setValidarExistenciaRest] = React.useState();
	const [openModalStreet, setOpenModalStreet] = React.useState(false);
	//HandleOpen se usa para abrir el modal de la direccion
	const handleOpen = () => {
		setOpenModalStreet(true);
	};
	//HandleOpen se usa para cerrar el modal de la direccion
	const handleClose = () => {
		setOpenModalStreet(false);
	};

	//Cuerpo del Modal para direccion
	const body = (
		<div className={classes.modal}>
			<h2 id="simple-modal-title">Text in a modal</h2>
			<p id="simple-modal-description">
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
			</p>
		</div>
	);
	async function validarExistencia() {
		let response;
		var authOptions = {
			method: 'GET',
			url: `http://localhost:8091/restaurantes/buscar-por-nit/` + nitRest,
			data: {
				nitRest: nitRest,
			},
			json: true,
		};
		//console.log(authOptions);
		await Axios(authOptions)
			.then(function (response) {
				console.log(response.data.nitRest);
				if (response.data.nitRest == nitRest) {
					setValidarExistenciaRest('Existe');
					toast.error('El nit ya se encuentra registrado');
				}
			})
			.catch(function (error) {
				setValidarExistenciaRest('No existe');
			});
		//console.log(validarExistenciaRest);
	}

	async function sendData() {
		console.log(validarExistenciaRest);
		if (validarExistenciaRest == 'Existe') {
			//toast.error('Este valor esta registradp');
		} else {
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
					localStorage.setItem('nitRestAdmin', nitRest);
					//console.log("1")
				})
				.catch(function (error) {
					//setLoading(false);
					console.log(error);
				});
		}
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
										onBlur={validarExistencia}
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
									<button type="button" onClick={handleOpen()}>
										Open Modal
									</button>
									<Modal
										open={openModalStreet()}
										onClose={handleClose()}
										//aria-labelledby="simple-modal-title"
										//aria-describedby="simple-modal-description"
									>
										{body}
									</Modal>
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
