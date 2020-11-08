import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import { useEffect, useState } from 'react';
import Axios from 'axios';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Modal,
	Button,
	TextField,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Select from 'react-select';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
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
	iconos: {
		cursor: 'pointer',
	},
	inputMaterial: {
		width: '100%',
	},
}));

const baseUrl = `http://localhost:8092/restaurantes/listar-empleados/1`;

export default function GestionPersonal() {
	const styles = useStyles();
	const classes = useStyles();
	const options = [
		{ value: '1', label: 'Jefe De Cocina' },
		{ value: '2', label: 'Mensajero' },
	];

	//Hook para capturar la data
	const [data, setData] = useState([]);
	//Hooks para los modales
	const [modalInsertar, setModalInsertar] = useState(false);
	const [modalEditar, setModalEditar] = useState(false);
	const [modalEliminar, setModalEliminar] = useState(false);
	//Formulario
	const [consolaSeleccionada, setConsolaSeleccionada] = useState({
		nombreEmpleado: '',
		correoEmpleado: '',
		passwordEmpleado: '',
		telefonoEmpleado: '',
		direccionEmpleado: '',
		imgEmpleado: 'vacio',
		//status_empleado:'ACTIVATED',
		idRolEmpleado: '',
		restaurante: {
			nitRest: '1',
		},
	});
	const [categoria, setCategoria] = React.useState({
		value: '-1',
		label: 'Categoría',
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setConsolaSeleccionada((prevState) => ({
			...prevState,
			[name]: value,
		}));
		//console.log(consolaSeleccionada);
	};
	function handleChangeCategoria(selectedOption) {
		setCategoria(selectedOption);
		setConsolaSeleccionada({
			...consolaSeleccionada,
			idRolEmpleado: selectedOption.value,
		});
		// setConsolaSeleccionada({idRol_empleado:categoria.value})
	}

	const peticionPost = async () => {
		console.log(consolaSeleccionada);
		var authOptions = {
			method: 'POST',
			url: `http://localhost:8092/restaurantes/crear-empleado`,
			data: consolaSeleccionada,
			json: true,
		};
		console.log(authOptions);
		await Axios(authOptions).then((response) => {
			setData(data.concat(response.data));
			toast.success('Se agregó el Empleado correctamente');
			abrirCerrarModalInsertar();
		});
	};
	const peticionPut = async () => {
		const baseUrlPut =
			`http://localhost:8092/restaurantes/actualizar-empleado` +
			`/` +
			consolaSeleccionada.idEmpleado;

		let response;
		var dataNueva = data;
		dataNueva.map((consola) => {
			if (consolaSeleccionada.idEmpleado === consola.idEmpleado) {
				consola.nombrePlato = consolaSeleccionada.nombrePlato;
				consola.nombreEmpleado = consolaSeleccionada.nombreEmpleado;
				consola.correoEmpleado = consolaSeleccionada.correoEmpleado;
				consola.passwordEmpleado = consolaSeleccionada.passwordEmpleado;
				consola.telefonoEmpleado = consolaSeleccionada.telefonoEmpleado;
				consola.direccionEmpleado = consolaSeleccionada.direccionEmpleado;
				consola.cantidadPlato = consolaSeleccionada.cantidadPlato;
				consola.imgEmpleado = 'vacio';
				consola.idRolEmpleado = consolaSeleccionada.idRolEmpleado;
				//consolaSeleccionada.restaurante.nitRest = '1';
			}
		});
		var authOptions = {
			method: 'PUT',
			url: baseUrlPut,
			data: consolaSeleccionada,
			json: true,
		};
		console.log(consolaSeleccionada);
		//console.log(dataNueva);
		//console.log(authOptions);
		await Axios(authOptions)
			.then(function (response) {
				toast.success('Se actualizó el Empleado');
				abrirCerrarModalEditar();
				//console.log("1")
			})
			.catch(function (error) {});
	};
	const peticionDelete = async (nombre) => {
		const baseUrlDelete =
			`http://localhost:8092/restaurantes/eliminar-empleado` +
			`/` +
			consolaSeleccionada.idEmpleado;
		console.log(baseUrlDelete);
		await Axios.delete(baseUrlDelete).then((response) => {
			setData(
				data.filter(
					(consola) => consola.idEmpleado !== consolaSeleccionada.idEmpleado
				)
			);
			abrirCerrarModalEliminar();
			toast.success('Se eliminó ' + nombre + ' del Restaurante');
		});
	};
	/*Lo usamos para abrir y cerrar los modales*/
	const abrirCerrarModalInsertar = () => {
		setModalInsertar(!modalInsertar);
	};
	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};
	const abrirCerrarModalEliminar = () => {
		setModalEliminar(!modalEliminar);
	};

	const seleccionarConsola = (consola, caso) => {
		setConsolaSeleccionada(consola);
		caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
	};
	//console.log(localStorage.getItem('rol'));
	const peticionGet = async () => {
		await Axios.get(baseUrl)
			.then((response) => {
				setData(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		peticionGet();
	}, []);

	const bodyInsertar = (
		<div className={styles.modal}>
			<h3>Registro de Empleado</h3>
			<TextField
				variant="outlined"
				name="nombreEmpleado"
				className={styles.inputMaterial}
				label="Nombre"
				onChange={handleChange}
			/>
			<br />
			<br />
			<TextField
				variant="outlined"
				name="correoEmpleado"
				className={styles.inputMaterial}
				label="Correo"
				onChange={handleChange}
			/>
			<br />
			<br />
			<TextField
				variant="outlined"
				name="passwordEmpleado"
				className={styles.inputMaterial}
				label="Contraseña"
				onChange={handleChange}
			/>
			<br />
			<br />
			<TextField
				variant="outlined"
				name="telefonoEmpleado"
				className={styles.inputMaterial}
				label="Teléfono"
				onChange={handleChange}
			/>
			<br />
			<br />
			<TextField
				variant="outlined"
				name="direccionEmpleado"
				className={styles.inputMaterial}
				label="Dirección"
				onChange={handleChange}
			/>
			<br />
			<br />
			<div className={classes.row}>
				Seleccione el Rol del Usuario:
				<Select
					name="categoria"
					value={categoria}
					onChange={handleChangeCategoria}
					options={options}
				/>
			</div>
			<br />
			<br />
			<div align="right">
				<Button color="primary" onClick={(e) => peticionPost()}>
					Insertar
				</Button>
				<Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
			</div>
		</div>
	);

	const bodyEditar = (
		<div className={styles.modal}>
			<h3>Editar Plato</h3>
			<TextField
				name="nombreEmpleado"
				className={styles.inputMaterial}
				variant="outlined"
				label="Nombre del Empleado"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.nombreEmpleado}
			/>
			<br />
			<br />

			<TextField
				name="correoEmpleado"
				className={styles.inputMaterial}
				variant="outlined"
				label="Correo"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.correoEmpleado}
			/>
			<br />
			<br />
			<TextField
				name="passwordEmpleado"
				className={styles.inputMaterial}
				variant="outlined"
				label="Contraseña"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.passwordEmpleado}
			/>
			<br />
			<br />
			<TextField
				name="telefonoEmpleado"
				className={styles.inputMaterial}
				variant="outlined"
				label="Teléfono"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.telefonoEmpleado}
			/>
			<br />
			<br />
			<TextField
				name="direccionEmpleado"
				className={styles.inputMaterial}
				variant="outlined"
				label="Dirección"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.direccionEmpleado}
			/>

			<br />
			<br />
			<div align="right">
				<Button color="primary" onClick={() => peticionPut()}>
					Editar
				</Button>
				<Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
			</div>
		</div>
	);
	const bodyEliminar = (
		<div className={styles.modal}>
			<p>
				¿Está seguro que desea eliminar a
				<b> {consolaSeleccionada && consolaSeleccionada.nombreEmpleado}</b> del
				Menú?
			</p>
			<div align="right">
				<Button
					color="secondary"
					onClick={() => peticionDelete(consolaSeleccionada.nombreEmpleado)}
				>
					Sí
				</Button>
				<Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
			</div>
		</div>
	);
	return (
		<GridContainer>
			<GridItem xs={3} sm={3} md={3}>
				<div align="right">
					<Button
						onClick={() => abrirCerrarModalInsertar()}
						variant="contained"
						color="primary"
						size="large"
						disableElevation
						fullWidth
					>
						Insertar
					</Button>
				</div>
			</GridItem>
			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>LISTADO DEL PERSONAL</h4>
						<p className={classes.cardCategoryWhite}>
							Aqui encontraras todos los empleados del restaurante
						</p>
					</CardHeader>
					<CardBody>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>Nombre del Empleado</TableCell>
										<TableCell>Correo</TableCell>
										<TableCell>Dirección</TableCell>
										<TableCell>Teléfono</TableCell>
										<TableCell>Rol</TableCell>
										<TableCell>Acciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.map((console) => (
										<TableRow hover key={console.idEmpleado}>
											<TableCell>{console.idEmpleado}</TableCell>
											<TableCell>{console.nombreEmpleado}</TableCell>
											<TableCell>{console.correoEmpleado}</TableCell>
											<TableCell>{console.direccionEmpleado}</TableCell>
											<TableCell>{console.telefonoEmpleado}</TableCell>
											<TableCell>{console.nombreRol}</TableCell>
											<TableCell>
												<Edit
													onClick={() => seleccionarConsola(console, 'Editar')}
												/>
												&nbsp;&nbsp;&nbsp;
												<VisibilityOffIcon
													onClick={() =>
														seleccionarConsola(console, 'Eliminar')
													}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<GridItem xs={12} sm={12} md={12}>
							<Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
								{bodyInsertar}
							</Modal>
						</GridItem>
						<GridItem xs={12} sm={12} md={12}>
							<Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
								{bodyEditar}
							</Modal>
						</GridItem>
						<GridItem xs={12} sm={12} md={12}>
							<Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
								{bodyEliminar}
							</Modal>
						</GridItem>
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
	);
}
