import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Axios from 'axios';

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
}));

const baseURL = `http://localhost:8094/compras`;

function createData(idProduct, nameProduct, costProduct, quantityProduct, subTotalProduct) {
	return {idProduct, nameProduct, costProduct, quantityProduct, subTotalProduct};
}

/**
 * En esta funcion se visualiza el pedido que el cliente ha realizado anteriomente,
 * permitiendole observar los productos seleccionados, el precio y su cantidad, junto 
 * al total a pagar de la factura y las observaciones o aclaraciones realizadas por el 
 * cliente con respecto a su pedido.
 */
export default function CardOrderConfirm() {

	const styles = useStyles();
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [cart, setCart] = useState([]);

	/**
	 * Realiza una solicitud GET a la base de datos, recuperando toda la nformacion correspondiente
	 * al pedido (Carrito) que el cliente ha realizado anteriormente.
	*/
	const getCurrentCart = async () => {
		let urlGetCurrentCart = baseURL + '/carrito';
		await Axios.get(urlGetCurrentCart)
		.then((response) => {
				
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
					<h5>Mi Pedido</h5>
				</div>

				<Typography variant="body2" component="p">
					<TableContainer component={Paper} variant="outlined">
						<Table size="small" aria-label="a dense table">
							<TableBody>
								{cart.map((product) => (
									<TableRow>
										<TableCell component="th" scope="row">
											{product.quantityProduct}
										</TableCell>
										<TableCell align="left"> {product.nameProduct} </TableCell>
										<TableCell align="right"> {product.subTotalProduct} </TableCell>
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
			</CardContent>
		</Card>
	);
}
