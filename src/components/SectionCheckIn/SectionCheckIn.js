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

export default function AgregarPlato() {
    
	const classes = useStyles();
	const [data, setData] = useState([]);
    const [age, setAge] = React.useState('');
    const [mes, setMes] = React.useState('');
    const [state, setState] = React.useState({checkedSMS: false,checkedTermsConds: false,});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
	};
	
	//Recupera todas las facturas
	const getFacturas = async () => {
		let urlGetCurrentCart = baseURL + '/facturas';
		await Axios.get(urlGetCurrentCart)
			.then((response) => {
				console.log(response.data)
				setData(response.data)
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
						<CardHeader color="primary">
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
										//onChange={(e) => setNombrePlato(e.target.value)}
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
                                            <em>None</em>
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
                                            <em>None</em>
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
                                    <Button color="primary">
                                        Enviar Pedido
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