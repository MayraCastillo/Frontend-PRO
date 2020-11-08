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

import { useEffect } from 'react';
import Axios from 'axios';

const baseUrl = `http://localhost:8092/restaurantes/crear-empleado`;
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
export default function CrearAdministrador() {
	const classes = useStyles();

	const [nombreEmpleado, setNombreEmpleado] = React.useState('');
	const [correoEmpleado, setCorreoEmpleado] = React.useState('');
	const [passwordEmpleado, setPasswordEmpleado] = React.useState('');
	const [telefonoEmpleado, setTelefonoEmpleado] = React.useState('');
	const [direccionEmpleado, setDireccionEmpleado] = React.useState('');
	const [restaurante, setRestaurante] = React.useState('');

	const [validarExistenciaPlato, setValidarExistenciaPlato] = React.useState();
	const capturar = () => {
		setRestaurante(localStorage.getItem('nitRestAdmin'));
		console.log(restaurante);
	};
	useEffect(() => {
		capturar();
	}, []);
	async function sendData() {
		let response;
		var authOptions = {
			method: 'POST',
			url: baseUrl,
			data: {
				nombreEmpleado: nombreEmpleado,
				correoEmpleado: correoEmpleado,
				passwordEmpleado: passwordEmpleado,
				telefonoEmpleado: telefonoEmpleado,
				direccionEmpleado: direccionEmpleado,
				idRolEmpleado: '3',
				restaurante: {
					nitRest: restaurante,
				},
			},
			json: true,
		};
		console.log(authOptions);
		await Axios(authOptions)
			.then(function (response) {
				//setLoading(false);

				toast.success('Se creo el Administrador');
				//console.log("1")
			})
			.catch(function (error) {
				//setLoading(false);
				console.log(error);
			});

		//  }
	}

	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Crear un Administrador</h4>
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
										label="Nombre del Administrador"
										variant="outlined"
										onChange={(e) => setNombreEmpleado(e.target.value)}
										//	onBlur={validarExistencia}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required="true"
										fullWidth
										label="Correo del Administrador"
										variant="outlined"
										onChange={(e) => setCorreoEmpleado(e.target.value)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Contraseña"
										variant="outlined"
										onChange={(e) => setPasswordEmpleado(e.target.value)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Dirección"
										variant="outlined"
										onChange={(e) => setDireccionEmpleado(e.target.value)}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Teléfono"
										variant="outlined"
										onChange={(e) => setTelefonoEmpleado(e.target.value)}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Nit del Restaurante"
										variant="outlined"
										value={restaurante}
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
