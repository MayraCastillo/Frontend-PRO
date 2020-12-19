import React, { useState, useEffect } from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({

	cardHeader: {
		width: '95%',
		margin: 'auto',
		marginTop: '-20px',
        color: 'white',
		background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
	},

    button: {
		color: 'white',
		marginLeft: '-20px',
		background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
	},

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
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

const baseURL = `http://localhost:8094/compras`;

function createData(nameUser, lastNameUser, idUser, telephoneUser, addressUser) {
	return {nameUser, lastNameUser, idUser, telephoneUser, addressUser};
}

/**
 * Formulario final para que el usuario complete de manera exitosa su pedido
 */
export default function SectionCheckIn() {
    
	const classes = useStyles();
	const [data, setData] = useState([]);
    const [age, setAge] = React.useState('');
    const [mes, setMes] = React.useState('');
    const [state, setState] = React.useState({checkedSMS: false,checkedTermsConds: false,});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
	};
	
	/**
	 * Recupera todas las facturas pertenecientes a ese restaurante, seleccionando unicamente la 
	 * ultima, que coresponderia al pedido u orden, realizado por el cliente actual.
	 */
	const getFacturas = () => {
		let urlGetFacturas = baseURL + '/facturas/'+localStorage.getItem('idRestSelect');
		 Axios.get(urlGetFacturas)
			.then((response) => {
				let indice = response.data.length-1;
				let usuarioAux = createData(
					response.data[indice].objCliente.nombresCliente,
					response.data[indice].objCliente.apellidosCliente,
					response.data[indice].objCliente.idCliente,
					response.data[indice].objCliente.telefonoCliente,
					response.data[indice].objCliente.direccionCliente
				)
				setData(usuarioAux)
			})
			.catch((error) => {
				console.log(error);
		});
	};

	useEffect(() => {
		getFacturas();
	},[]);


	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader  className={classes.cardHeader}>
							<h4 className={classes.cardTitleWhite}>Finaliza tu Pedido</h4>
						</CardHeader>
						<CardBody>
							<GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <br/><h5>Completa tus datos de entrega</h5>
                                </GridItem>
								<GridItem xs={12} sm={12} md={12}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Nombre Completo"
                                        variant="outlined"
										size="small"
										onChange={handleChange}
										value={data.nameUser + " " + data.lastNameUser}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Documento/Cédula"
                                        variant="outlined"
                                        type="number"
										size="small"
										value={""+data.idUser}
										//onChange={(e) => setCategoriaPlato(e.target.value)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
                                        label="Telefono"
                                        type="number"
                                        variant="outlined"
										size="small"
										value={""+data.telephoneUser}
										//onChange={(e) => setCategoriaPlato(e.target.value)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required="true"
										fullWidth
										label="Dirección"
                                        variant="outlined"
										size="small"
										value={""+data.addressUser}
										//onChange={(e) => setDescPlato(e.target.value)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Barrio"
                                        variant="outlined"
                                        size="small"
										//onChange={(e) => setPrecioPlato(e.target.value)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Indicaciones"
                                        variant="outlined"
                                        size="small"
										//onChange={(e) => setIngredientesPlato(e.target.value)}
									/>
								</GridItem>


                                <GridItem xs={12} sm={12} md={12}>
                                    <br/><br/><h5>Selecciona un Medio de Pago</h5>
                                </GridItem>

								<GridItem xs={12} sm={12} md={12}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Número de Tarjeta"
                                        variant="outlined"
                                        size="small"
                                        type="password"
										//onChange={(e) => setNombrePlato(e.target.value)}
									/>
								</GridItem>

                                <GridItem xs={12} sm={12} md={2}>
                                    <p>Expiración*</p>
                                </GridItem>

								<GridItem xs={12} sm={12} md={3}>
                                    <FormControl variant="outlined" size="small" className={classes.formControl}>
                                        <InputLabel>Mes</InputLabel>
                                        <Select
                                            value={mes}
                                            onChange={(e) => setMes(e.target.value)}
                                            label="Mes"
                                        >
                                        <MenuItem value="">
                                            <em></em>
                                        </MenuItem>
                                            <MenuItem value={10}>Enero</MenuItem>
                                            <MenuItem value={20}>Febrero</MenuItem>
                                            <MenuItem value={30}>Marzo</MenuItem>
                                            <MenuItem value={40}>Abril</MenuItem>
                                            <MenuItem value={50}>Mayo</MenuItem>
                                            <MenuItem value={60}>Junio</MenuItem>
                                        </Select>
                                    </FormControl>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
                                    <FormControl variant="outlined" size="small" className={classes.formControl}>
                                        <InputLabel>Año</InputLabel>
                                        <Select
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            label="Año"
                                        >
                                        <MenuItem value="">
                                            <em></em>
                                        </MenuItem>
                                            <MenuItem value={10}>2020</MenuItem>
                                            <MenuItem value={20}>2021</MenuItem>
                                            <MenuItem value={30}>2022</MenuItem>
                                            <MenuItem value={40}>2023</MenuItem>
                                            <MenuItem value={50}>2024</MenuItem>
                                            <MenuItem value={60}>2025</MenuItem>
                                        </Select>
                                    </FormControl>
								</GridItem>

								<GridItem xs={12} sm={12} md={6}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Código de Seguridad"
                                        variant="outlined"
                                        size="small"
										//onChange={(e) => setCategoriaPlato(e.target.value)}
									/>
								</GridItem>
                                
                                <GridItem xs={12} sm={12} md={12}>
                                    <br/><br/><h5>Notificación por SMS</h5>
                                </GridItem>
								<GridItem xs={12} sm={12} md={12}>
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            name="checkedSMS"
                                            color="primary"
                                            checked={state.checkedSMS}
                                            onChange={handleChange}
                                        />
                                        }
                                        label="Recibe la confirmación de tu pedido por SMS"
                                    />
								</GridItem>

								<GridItem xs={12} sm={12} md={12}>
                                    <br/><br/><h5>Notas Adicionales</h5>
                                </GridItem>
								<GridItem xs={12} sm={12} md={12}>
									<TextField
										className={classes.item}
										margin="normal"
										required
										fullWidth
										label="Notas"
                                        variant="outlined"
                                        size="small"
										//onChange={(e) => setNombrePlato(e.target.value)}
									/>
								</GridItem>

                                <GridItem xs={12} sm={12} md={9}>
                                    <br/>
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            name="checkedTermsConds"
                                            color="primary"
                                            checked={state.checkedTermsConds}
                                            onChange={handleChange}
                                        />
										}
                                        label="He leído y estoy de acuerdo con los Términos y Condiciones y con las Políticas y tratamiento de datos personales."
                                    />
								</GridItem>

                                <GridItem xs={12} sm={12} md={2}>
                                    <br/>
									<Button 
										className={classes.button}
										href="/restaurantes/productos/factura/turno-de-espera"
									>
                                        Realizar Pedido
                                    </Button>
                                </GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	);
}