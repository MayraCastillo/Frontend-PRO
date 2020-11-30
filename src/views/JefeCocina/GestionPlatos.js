import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table2 from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

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

const baseUrl = `http://localhost:8091/platos/buscar-por-status/1/ACTIVATED`;

export default function GestionPlatos() {
	const styles = useStyles();
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [busqueda, setBusqueda] = useState("");
	const [platosFiltrados, setPlatosFiltrados] = useState([]);
	const [modalEditar, setModalEditar] = useState(false);
	const [modalEliminar, setModalEliminar] = useState(false);

	const [consolaSeleccionada, setConsolaSeleccionada] = useState({
		nombrePlato: '',
		descPlato: '',
		precioPlato: '',
		categoriaPlato: '',
		ingredientesPlato: '',
		cantidadPlato: '',
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setConsolaSeleccionada((prevState) => ({
			...prevState,
			[name]: value,
		}));
		console.log(consolaSeleccionada);
	};

	const peticionPut = async () => {
		const baseUrlPut =
			`http://localhost:8091/platos/actualizar-plato` +
			`/` +
			consolaSeleccionada.idPlato;

		let response;
		var dataNueva = data;
		dataNueva.map((consola) => {
			if (consolaSeleccionada.idPlato === consola.idPlato) {
				consola.nombrePlato = consolaSeleccionada.nombrePlato;
				consola.descPlato = consolaSeleccionada.descPlato;
				consola.precioPlato = consolaSeleccionada.precioPlato;
				consola.categoriaPlato = consolaSeleccionada.categoriaPlato;
				consola.ingredientesPlato = consolaSeleccionada.ingredientesPlato;
				consola.cantidadPlato = consolaSeleccionada.cantidadPlato;
			}
		});
		var authOptions = {
			method: 'PUT',
			url: baseUrlPut,
			data: consolaSeleccionada,
			json: true,
		};
		//console.log(consolaSeleccionada);
		//console.log(dataNueva);
		console.log(authOptions);
		await Axios(authOptions)
			.then(function (response) {
				//setLoading(false);

				toast.success('Se actualizó el plato');
				//console.log("1")
			})
			.catch(function (error) {
				//setLoading(false);
				//console.log("2")
			});
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

	const realizarBusqueda = async (event) => {
		event.persist();
		await console.log(busqueda);
		filtrarPlatos();
	}

	const filtrarPlatos=()=>{
		var search=null;
		search=data.filter(item=>{
			if(item.nombrePlato.includes(busqueda)){
				return item;
			}
		})
		if(busqueda == ""){
			console.log("Entra");
			peticionGet();
		}
		setData(search);
	}


	useEffect(() => {
		peticionGet();
	}, []);

	const bodyEditar = (
		<div className={styles.modal}>
			<h3>Editar Plato</h3>
			<TextField
				name="nombrePlato"
				className={styles.inputMaterial}
				variant="outlined"
				label="Nombre del Plato"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.nombrePlato}
			/>
			<br />
			<br />
			<TextField
				name="descPlato"
				className={styles.inputMaterial}
				variant="outlined"
				label="Descripcion"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.descPlato}
			/>
			<br />
			<br />
			<TextField
				name="precioPlato"
				className={styles.inputMaterial}
				variant="outlined"
				label="Precio"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.precioPlato}
			/>
			<br />
			<br />
			<TextField
				name="ingredientesPlato"
				className={styles.inputMaterial}
				variant="outlined"
				label="Ingredientes"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.ingredientesPlato}
			/>
			<br />
			<br />
			<TextField
				name="categoriaPlato"
				className={styles.inputMaterial}
				variant="outlined"
				label="Categoria"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.categoriaPlato}
			/>
			<br />
			<br />
			<TextField
				name="cantidadPlato"
				className={styles.inputMaterial}
				variant="outlined"
				label="Cantidad"
				onChange={handleChange}
				value={consolaSeleccionada && consolaSeleccionada.cantidadPlato}
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
	const peticionDelete = async (nombre) => {
		const baseUrlDelete =
			`http://localhost:8091/platos/eliminar-plato` +
			`/` +
			consolaSeleccionada.idPlato;
		console.log(baseUrlDelete);
		await Axios.delete(baseUrlDelete).then((response) => {
			setData(
				data.filter(
					(consola) => consola.idPlato !== consolaSeleccionada.idPlato
				)
			);
			abrirCerrarModalEliminar();
			toast.success('Se eliminó ' + nombre + ' del Menú');
		});
	};
	const bodyEliminar = (
		<div className={styles.modal}>
			<p>
				¿Está seguro que desea Eliminar
				<b> {consolaSeleccionada && consolaSeleccionada.nombrePlato}</b> del
				Menú?
			</p>
			<div align="right">
				<Button
					color="secondary"
					onClick={() => peticionDelete(consolaSeleccionada.nombrePlato)}
				>
					Sí
				</Button>
				<Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
			</div>
		</div>
	);

	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>TABLA DE PLATOS</h4>
						<p className={classes.cardCategoryWhite}>
							Aqui encontraras todos los platos que oferta el restaurante
						</p>
					</CardHeader>
					<CardBody>

					<div className="barraBusqueda">
						<input
						type="text"
						placeholder="Buscar"
						className="textField"
						name="busqueda"
						onChange={(e) => setBusqueda(e.target.value)}
						/>
						<button type="button" className="btnBuscar" onClick={realizarBusqueda} >
						{" "}
						<FontAwesomeIcon icon={faSearch} />
						</button>
					</div>

						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nombre del Plato</TableCell>
										<TableCell>Descripción</TableCell>
										<TableCell>Precio</TableCell>
										<TableCell>Acciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.map((console) => (
										<TableRow hover key={console.idPlato}>
											<TableCell>{console.nombrePlato}</TableCell>
											<TableCell>{console.descPlato}</TableCell>
											<TableCell>{console.precioPlato}</TableCell>
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
						<Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
							{bodyEditar}
						</Modal>
						<Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
							{bodyEliminar}
						</Modal>
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
	);
}
