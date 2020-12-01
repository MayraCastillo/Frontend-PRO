import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Delete } from '@material-ui/icons';
import { Modal } from '@material-ui/core';

import Axios from 'axios';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { useDispatch, useSelector } from "react-redux";
import { modifyTodoAction } from "../../redux/Actions";

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
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 15,
	},
	pos: {
		marginBottom: 12,
	},
	bad: {
		marginTop: '50px',
	},
	buttonDelete: {
        color: 'white',
		borderRadius: '50%',
		background: '-webkit-linear-gradient( 95deg, rgb(109,1,1) 0%, rgb(228,23,23) 50%,  rgb(255,117,117) 100%)',
	},
	button: {
        color: 'white',
		background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
	},
}));

const baseURL = `http://localhost:8094/compras`;

function createData(idProduct, nameProduct, costProduct, quantityProduct, subTotalProduct) {
	return {idProduct, nameProduct, costProduct, quantityProduct, subTotalProduct};
}

export default function CardOrder() {

	const styles = useStyles();
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [cart, setCart] = useState([]);
	const [modalConfirmOrder, setModalConfirmOrder] = useState(false);
	const [modalInfoProduct, setModalInfoProduct] = useState(false);
	const [productSelect, setProductSelect] = useState([]);
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();


	//Recupera el Carrito Actual
	const getCurrentCart = async () => {
		let urlGetCurrentCart = baseURL + '/carrito';
		await Axios.get(urlGetCurrentCart)
		.then((response) => {
			console.log(response.data);
			let cartAux = [];
			for (const index in response.data.atrListaItems) {
				let productAux = createData(
								response.data.atrListaItems[index].atrIdPlato,
								response.data.atrListaItems[index].objplato.nombrePlato,
								response.data.atrListaItems[index].atrPrecio,
								response.data.atrListaItems[index].atrCantidad,
								response.data.atrListaItems[index].atrSubtotal
								)
				cartAux.push(productAux)
			}
			
			setData(response.data);
			setCart(cartAux);
		})
		.catch((error) => {
			console.log(error);
		});
	};

	//Agrega en una Unidad los Productos del Carrito
	const postAddProducts = (idProduct, costProduct) => {
		var urlPostAddProducts = baseURL + `/carrito/` + costProduct + `/` + idProduct;
		var authOptions = {
			method: 'POST',
			url: urlPostAddProducts,
			data: { precio: costProduct, idPlato: Number.parseInt(idProduct) },
			json: true,
		};
		Axios(authOptions)
			.then(function (response) {
				setData(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		getCurrentCart();
	};

	//Reduce en una Unidad los Productos del Carrito
	const postReduceProducts = (idProduct) => {
		var urlPostReduceProducts = baseURL + `/carrito/` + idProduct;
		console.log(urlPostReduceProducts);
		var authOptions = {
			method: 'POST',
			url: urlPostReduceProducts,
			data: { idPlato: idProduct },
			json: true,
		};
		Axios(authOptions)
			.then(function (response) {
				setData(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		getCurrentCart();
	};

	//Elimina Todas las Unidades de un Producto del Carrito
	const deleteProductCart = async (idProduct) => {
		const urlDeleteProductsCart = baseURL + `/carrito/` + idProduct;
		console.log(urlDeleteProductsCart);
		await Axios.delete(urlDeleteProductsCart).then((res) => {
			//console.log(res);
			console.log(res.data);
		});
		getCurrentCart();
	};

	//Limpia el Carrito
	const deleteEmptyCart = async () => {
		const urlDeleteEmptyCart = baseURL + `/limpiar-carrito`;
		await Axios.delete(urlDeleteEmptyCart).then((res) => {
			console.log(res);
		});
		setCart([('', '', '')]);
		let newTodo = { };
        dispatch(modifyTodoAction(newTodo));
		getCurrentCart();
	};

	//Confirmar el Pedido
	const postConfirmOrder = () => {
		const idClient = parseInt(localStorage.getItem('idUsuario'),10);
		var urlPostConfirmOrder = baseURL + `/factura/` + idClient+`/`+localStorage.getItem('idRestSelect');
		var authOptions = {
			method: 'POST',
			url: urlPostConfirmOrder,
			data: { idCliente: idClient, idRestaurante: localStorage.getItem('idRestSelect')},
			json: true,
		};
		Axios(authOptions)
			.then(function (response) {
				setData(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		console.log(authOptions)
		openOrCloseConfirmOrderModal()
	};

	const viewProductSelect = (product, tipo) =>{
		setProductSelect(product);
		console.log(product);
		console.log(productSelect)
		tipo === 'plato-especial' ? openOrCloseInfoProduct() : openOrCloseConfirmOrderModal();
	}

	const openOrCloseConfirmOrderModal = () => {
		setModalConfirmOrder(!modalConfirmOrder);
	};

	const openOrCloseInfoProduct = () => {
		setModalInfoProduct(!modalInfoProduct);
	};

	const bodyConfirmOrder = (
		<div className={styles.modal}>
			<h5>Confirmar Pedido</h5>
			<br />
			<br />
			<h5>¿Esta seguro que desea confirmar su pedido?</h5>
			<br />
			<br />
			<div align="right">
				<Button color="primary" onClick={() => postConfirmOrder()}
				href="/cliente/restaurantes/productos/factura"
				>
					Confirmar
				</Button>
				<Button onClick={() => openOrCloseConfirmOrderModal()}>Cancelar</Button>
			</div>
		</div>
	);

	const bodyInfoProduct = (
		<div className={styles.modal}>
			<h5>Información del Porducto</h5>
			<br />
			<br />
			<h5 value={productSelect.nombrePlato}> </h5>
			<br />
			<br />
			<div align="right">
				<Button onClick={() => openOrCloseInfoProduct()}>Aceptar</Button>
			</div>
		</div>
	);

	useEffect(() => {
		deleteEmptyCart();
	},[]);

	useEffect(() => {
		getCurrentCart()
	},[data]);

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{localStorage.getItem('nameRestSelect')}
				</Typography>

				<div>
					<h5 className="float-left">Mi Pedido</h5>
					<Delete className="float-right" onClick={() => deleteEmptyCart()}/>
				</div>

				<Typography className={classes.bad} variant="body2" component="p">
					¿Esta seguro de querer agregar este producto a su pedido?
				</Typography>
				
				<Typography variant="body2" component="p">
					<TableContainer component={Paper} variant="outlined">
						<Table size="small" aria-label="a dense table">
							<TableBody>
								{todos.map((todo) => (
									<TableRow key={todo.id}>
										<TableCell align="left"> {todo.nameProduct} </TableCell>
										<TableCell align="right"> {todo.costProduct} </TableCell>
										<TableCell align="right">
											<CheckCircleIcon
												color="secundary"
												onClick={() =>
													postAddProducts(Number.parseInt(todo.idProduct), todo.costProduct)
												}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Typography>
				<p />

				<Typography variant="body2" component="p">
					Productos:
				</Typography>
				
				<Typography variant="body2" component="p">
					<TableContainer component={Paper} variant="outlined">
						<Table size="small" aria-label="a dense table">
							<TableBody>
								{cart.map((product) => (
									<TableRow>
										<TableCell component="th" scope="row">
											{product.quantityProduct}
										</TableCell>
										<TableCell align="left" >
											<ArrowDropUpIcon 
												color="primary"
												onClick={() => postAddProducts(product.idProduct, product.costProduct)}
											/>
											<ArrowDropDownIcon
												color="primary"
												onClick={() => postReduceProducts(product.idProduct)}
											/>
										</TableCell>
										<TableCell align="left" button onClick={() => viewProductSelect(product, "plato-especial")}> {product.nameProduct} </TableCell>
										<TableCell align="left"> {product.subTotalProduct} </TableCell>
										<TableCell align="right" >
											<ClearIcon
												className={classes.buttonDelete}
												onClick={() => deleteProductCart(product.idProduct)}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Typography>
				<p />

				<Typography className={classes.pos} color="textSecondary">
					<TextField
						label="Agregar Notas Adicionales..."
						id="additional-notes"
						variant="outlined"
						size="small"
						fullWidth
					/>
				</Typography><p />

				<Divider variant="middle" />

				<p />
				<h5>Total: {data.atrTotalApagar}</h5>
				<p />

				<Button
					id="btnConfirmOrder"
					variant="contained"
					className={classes.button}
					fullWidth
					onClick={() => openOrCloseConfirmOrderModal()}
				>
					Continuar
				</Button>
			</CardContent>

			<Modal open={modalConfirmOrder} onClose={openOrCloseConfirmOrderModal}>
				{bodyConfirmOrder}
			</Modal>

			<Modal open={modalInfoProduct} onClose={openOrCloseInfoProduct}>
				{bodyInfoProduct}
			</Modal>
		</Card>
	);
}
