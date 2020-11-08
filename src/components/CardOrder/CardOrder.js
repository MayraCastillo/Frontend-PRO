
import React, {useState, useEffect} from 'react';
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
import{Delete} from '@material-ui/icons';
import {Modal} from '@material-ui/core';

import Axios from 'axios';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { useSelector, useDispatch } from "react-redux";



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
    transform: 'translate(-50%, -50%)'
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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const baseURL = `http://localhost:8094/compras`;

export default function CardOrder2() {

  const styles = useStyles();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([('', '', ''),]);
  const [modalConfirmOrder, setModalConfirmOrder]=useState(false);
  const todos = useSelector((state) => state.todos);

  //Recupera el Carrito Actual
  const getCurrentCart = async () => {
    let urlGetCurrentCart = baseURL+"/carrito";
    await Axios.get(urlGetCurrentCart)
      .then((response) => {
        setData(response.data);
        if(response.data != null){
          setCart(response.data.atrListaItems);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Agrega en una Unidad los Productos del Carrito
  const postAddProducts=(idProduct, costProduct)=>{
    var urlPostAddProducts = baseURL+`/carrito/`+costProduct+`/`+idProduct;
    console.log(urlPostAddProducts);
    var authOptions = {
      method: "POST",
      url: urlPostAddProducts,
      data: { precio: costProduct, idPlato: idProduct, },      
      json: true,
    };
    Axios(authOptions)
      .then(function(response) {
        setData(response.data)  
      })
      .catch(function(error) {
        console.log(error);
    });
    getCurrentCart();
  }

  //Reduce en una Unidad los Productos del Carrito
  const postReduceProducts=(idProduct)=>{
    var urlPostReduceProducts = baseURL+`/carrito/`+idProduct;
    var authOptions = {
      method: "POST",
      url: urlPostReduceProducts,
      data: { idPlato: idProduct, },      
      json: true,
    };
    Axios(authOptions)
      .then(function(response) {
        setData(response.data)  
      })
      .catch(function(error) {
        console.log(error);
    });
    getCurrentCart();
  }

  //Elimina Todas las Unidades de un Producto del Carrito
  const deleteProductCart=async(idProduct)=>{   
    const urlDeleteProductsCart = baseURL+`/carrito/`+idProduct;
    await Axios.delete(urlDeleteProductsCart)
    .then(res => {
      //console.log(res);
      console.log(res.data);
    })
    getCurrentCart();
  }

  //Limpia el Carrito
  const deleteEmptyCart=async()=>{   
    const urlDeleteEmptyCart = baseURL+`/limpiar-carrito`;
    await Axios.delete(urlDeleteEmptyCart)
    .then(res => {
      console.log(res);
    })
  }

  //Confirmar el Pedido
  const postConfirmOrder=()=>{
    const idClient = localStorage.getItem('idUsuario');
    var urlPostConfirmOrder = baseURL+`/factura/`+idClient;
    var authOptions = {
      method: "POST",
      url: urlPostConfirmOrder,
      data: { name: idClient, },      
      json: true,
    };
    Axios(authOptions)
      .then(function(response) {
        setData(response.data)  
      })
      .catch(function(error) {
        console.log(error);
    });
    //deleteEmptyCart();
  }

  const openOrCloseConfirmOrderModal=()=>{
    setModalConfirmOrder(!modalConfirmOrder);
  }

  const bodyConfirmOrder=(
    <div className={styles.modal}>
      <h2>Confirmar Pedido</h2>
      <br />
      <br />   
      <h4>¿Esta seguro que desea confirmar su pedido?</h4>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>postConfirmOrder()}>Confirmar</Button>
        <Button onClick={()=>openOrCloseConfirmOrderModal()}>Cancelar</Button>
      </div>
    </div>
  )

  useEffect(()=>{
    deleteEmptyCart();
  },[])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Nombre del Restaurante.
        </Typography>

        <div>
        <h5 className="float-left">Mi Pedido</h5>
        <Delete className="float-right"/>
        </div>
        <Typography variant="body2" component="p">
            <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                {todos.map((todo) => (
                    <TableRow key={todo.id} >
                    <TableCell align="left"> {todo.nameProduct} </TableCell>
                    <TableCell align="right"> {todo.costProduct} </TableCell>
                    <TableCell align="right">
                        <CheckCircleIcon color="primary" onClick={() =>postAddProducts(todo.idProduct, todo.costProduct)} />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Typography><p/>

        <Typography variant="body2" component="p">
            <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                {cart.map(rows=>(
                    <TableRow>
                    <TableCell component="th" scope="row">
                        {rows.atrCantidad}
                    </TableCell>
                    <TableCell align="left">
                        <ArrowDropUpIcon color="primary" onClick={() =>postAddProducts(rows.atrIdPlato, rows.atrPrecio)} />
                        <ArrowDropDownIcon color="primary" onClick={() =>postReduceProducts(rows.atrIdPlato)} />
                    </TableCell>
                    <TableCell align="left"> {rows.atrIdPlato} </TableCell>
                    <TableCell align="right"> {rows.atrSubtotal} </TableCell>
                    <TableCell align="right">
                        <CancelIcon color="primary" onClick={() =>deleteProductCart(rows.atrIdPlato)} />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Typography><p/>

        <Typography className={classes.pos} color="textSecondary">
          <TextField
          label="Agregar Notas Adicionales..."
          id="additional-notes"
          variant="outlined"
          size="small"
          fullWidth
        />
        </Typography>

        <Typography variant="body2" component="p">
          Envio
        </Typography>

        <Typography variant="body2" component="p">
          Subtotal
        </Typography><p/>

        <Divider variant="middle" />

        <p/><h5>Total: {data.atrTotalApagar}</h5><p/>

        <Button variant="contained" color="primary" fullWidth
         onClick={() =>openOrCloseConfirmOrderModal()}>
            Realizar Pedido
        </Button>

      </CardContent>

      <Modal
        open={modalConfirmOrder}
        onClose={openOrCloseConfirmOrderModal}>
        {bodyConfirmOrder}
      </Modal>  
    </Card>  
  );
}
