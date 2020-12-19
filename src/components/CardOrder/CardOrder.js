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
import TodaysMenu from "../TodaysMenu/TodaysMenu"

const useStyles = makeStyles((theme) => ({
	modal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		borderRadius: '10px',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	modalTodaysMenu: {
		position: 'absolute',
		width: 500,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		borderRadius: '10px',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	imgTodaysMenuRoot: {
		width: '50%',
		float: 'left',
		marginBottom: '20px',
		marginRight: '20px',
	},
	imgRoot: {
		width: '100%',
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

function createData(idProduct, categoryProduct, nameProduct, imageProduct, descProduct, costProduct, quantityProduct, subTotalProduct) {
	return {idProduct, categoryProduct, nameProduct, imageProduct, descProduct, costProduct, quantityProduct, subTotalProduct};
}


/**
 * En esta funcion se establece el pedido que el cliente va realizando segun su interaccion con la
 * aplicacion, permitiendole visualizar los productos seleccionados, el precio y la información
 * correspondiente, su cantidad y el total a pagar de la factura. Ademas, cuenta con una seccion
 * donde el cliente puede realizar observaciones o aclaraciones con respecto a su pedido para que
 * el restaurant elo tenga en cuenta al momento de realizar la orden.
 */
export default function CardOrder() {

	const styles = useStyles();
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [cart, setCart] = useState([]);
	const [modalConfirmOrder, setModalConfirmOrder] = useState(false);
	const [modalInfoTodaysMenu, setModalInfoTodaysMenu] = useState(false);
	const [modalInfoProductEspecial, setModalInfoProductEspecial] = useState(false);
	const [productSelect, setProductSelect] = useState([]);
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();

	/**
	 * Realiza una solicitud GET a la base de datos, recuperando toda la nformacion correspondiente
	 * al pedido (Carrito) que el cliente esta realizando. Sin embargo, de aquella peticion, solo se
	 * guarda la informacion de interes correspondiente al pedido (informacion de los platos y el subtotal)
	 */
	const getCurrentCart = async () => {
		let urlGetCurrentCart = baseURL + '/carrito';
		await Axios.get(urlGetCurrentCart)
		.then((response) => {
			console.log(response.data);
			let cartAux = [];
			for (const index in response.data.atrListaItems) {
				let productAux = createData(
								response.data.atrListaItems[index].atrIdPlato,
								response.data.atrListaItems[index].objplato.categoriaPlato,
								response.data.atrListaItems[index].objplato.nombrePlato,
								response.data.atrListaItems[index].objplato.imgPlato,
								response.data.atrListaItems[index].objplato.descPlato,
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

	/**
	 * Se realiza una solicitud POST a la base de datos mediante la cual se aumenta en uno
	 * la cantidad de un producto especifico, el cual hace parte del pedido del cliente.
	 * @param {*ID del producto que se desea aumentar en cantidad al pedido} idProduct 
	 * @param {*PRECIO del producto que se desea aumentar en cantidad al pedido} costProduct 
	 */
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

	/**
	 * Se realiza una solicitud POST a la base de datos mediante la cual se reduce en uno
	 * la cantidad de un producto especifico, el cual hace parte del pedido del cliente.
	 * @param {*ID del producto que se desea reducir en cantidad al pedido} idProduct 
	 */
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

	/**
	 * Se realiza una solicitud DELETE a la base de datos mediante la cual se eliminan todas
	 * las unidades de un producto especifico, el cual hace parte del pedido del cliente.
	 * @param {*ID del producto que se desea eliminar por completo del pedido} idProduct 
	 */
	const deleteProductCart = async (idProduct) => {
		const urlDeleteProductsCart = baseURL + `/carrito/` + idProduct;
		console.log(urlDeleteProductsCart);
		await Axios.delete(urlDeleteProductsCart).then((res) => {
			//console.log(res);
			console.log(res.data);
		});
		getCurrentCart();
	};

	/**
	 * Se realiza una solicitud DELETE a la base de datos mediante la cual se eliminan todo
	 * el pedido del cliente, limpiando por completo el carrito de compras.
	 */
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

	/**
	 * Mediante una solicitud POST a la base de datos se confirma la orden o pedido realizado
	 * por el cliente, enviando como parametros el identificador (ID) del cliente y el identificador
	 * (NIT)) del restaurante al que se realizo el pedido.
	 */
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
		openOrCloseConfirmOrderModal();
	};

	/**
	 * Permite la visualizacion de un "Modal" en el cual se muestra la informacion (nombre, precio
	 * categoria, imagen, descripcion y cantidad) del producto seleccionado
	 * @param {*Producto seleccionado} product 
	 */
	const viewProductSelect = (product) =>{
		setProductSelect(product);
		product.categoryProduct === 'menu-del-dia' ? openOrCloseInfoTodaysMenu() : openOrCloseInfoProductEspecial();
	}

	/**
	 * Permite la visualizacion de la informacion de un plato especial.
	 * Si la informacion ya se encuentra visualizada, la oculta.
	 */
	const openOrCloseInfoProductEspecial = () => {
		setModalInfoProductEspecial(!modalInfoProductEspecial);
	};

	/**
	 * Permite la visualizacion de la informacion de los menu del dia que se han realizado hasta el momento.
	 * Si la informacion ya se encuentra visualizada, la oculta.
	*/
	const openOrCloseInfoTodaysMenu = () => {
		setModalInfoTodaysMenu(!modalInfoTodaysMenu);
	};

	/**
	 * Mnensaje de confirmacion de la orden realizada por el cliente.
	 * Nota: Una vez aceptada la cofnirmacion, el pedido no puede ser modificado. 
	 */
	const openOrCloseConfirmOrderModal = () => {
		setModalConfirmOrder(!modalConfirmOrder);
	};

	/**
	 * Modal en el que se visualiza la informacion (nombre, precio, descripcion, cantidad) de los
	 * menus del dia solicidados o agregados a la orden del cliente.
	 */
	const bodyInfoTodaysMenu = (
		<div className={styles.modalTodaysMenu}>
			<p> {productSelect.categoryProduct} </p>
			<h4> {productSelect.nameProduct} </h4>
			<img className={classes.imgTodaysMenuRoot} src={productSelect.imageProduct} />
			<p><b>Precio: </b>$ {productSelect.costProduct} c/u</p>
			<p><b>Cantidad: </b>{productSelect.quantityProduct}</p>
			<p><b>SubTotal: </b>$ {productSelect.subTotalProduct}</p>
			<TodaysMenu />
			<br />
			<div align="right">
				<Button onClick={() => openOrCloseInfoTodaysMenu()}>Aceptar</Button>
			</div>
		</div>
	);

	/**
	 * Modal en el que se visualiza la informacion (nombre, precio, descripcion, cantidad) de los
	 * productos especiales solicidados o agregados a la orden del cliente.
	 */
	const bodyInfoProductEspecial = (
		<div className={styles.modal}>
			<p> {productSelect.categoryProduct} </p>
			<h4> {productSelect.nameProduct} </h4>
			<img className={classes.imgRoot} src={productSelect.imageProduct} />
			<p> {productSelect.descProduct} </p>
			<p><b>Precio: </b>$ {productSelect.costProduct} c/u</p>
			<p><b>Cantidad: </b>{productSelect.quantityProduct}</p>
			<p><b>SubTotal: </b>$ {productSelect.subTotalProduct}</p>
			<br />
			<div align="right">
				<Button onClick={() => openOrCloseInfoProductEspecial()}>Aceptar</Button>
			</div>
		</div>
	);

	/**
	 * Mensaje de confirmacion de la orden realizada por el cliente
	 */
	const bodyConfirmOrder = (
		<div className={styles.modal}>
			<h5>Confirmar Pedido</h5>
			<br />
			<br />
			<h5>¿Esta seguro que desea confirmar su pedido?</h5>
			<br />
			<br />
			<div align="right">
				<Button 
					color="primary"
					onClick={() => postConfirmOrder()}
					href="/restaurantes/productos/factura"
				>
					Confirmar
				</Button>
				<Button onClick={() => openOrCloseConfirmOrderModal()}>Cancelar</Button>
			</div>
		</div>
	);


	useEffect(() => {
		deleteEmptyCart();
	},[]);

	useEffect(() => {
		getCurrentCart()
	},[]);

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
										<TableCell align="left" button onClick={() => viewProductSelect(product)}> {product.nameProduct} </TableCell>
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

			<Modal open={modalInfoTodaysMenu} onClose={openOrCloseInfoTodaysMenu}>
				{bodyInfoTodaysMenu}
			</Modal>

			<Modal open={modalInfoProductEspecial} onClose={openOrCloseInfoProductEspecial}>
				{bodyInfoProductEspecial}
			</Modal>

			<Modal open={modalConfirmOrder} onClose={openOrCloseConfirmOrderModal}>
				{bodyConfirmOrder}
			</Modal>
		</Card>
	);
}
