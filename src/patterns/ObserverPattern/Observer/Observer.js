import React, {Component, useState, useEffect} from 'react';
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
import Axios from 'axios';


const URL = `http://localhost:8094/compras`;

const rows = [
  createData(3, 'Menú del Día', 5000),
  createData(2, 'Sancocho de Gallina', 23000),
];

function createData(quantity, name, cost) {
  return { quantity, name, cost };
};

//Recupera el Carrito Actual
const getCarrito = async () => {
  let urlGetCarrito = URL+"/carrito";
  console.log(urlGetCarrito);
  await Axios.get(urlGetCarrito)
    .then((response) => {
      console.log(response.data);
      //setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Agrega un item al 
const postProducts= async(idProduct, costProduct)=>{
  var urlPostProducts = URL+`/carrito/`+costProduct+`/`+idProduct;
  console.log(urlPostProducts);
  var authOptions = {
    method: "POST",
    url: urlPostProducts,
    data: {
      precio: costProduct,
      idPlato: idProduct,
    },      
    json: true,
  };
  console.log(authOptions);
  await Axios(authOptions)
    .then(function(response) {
      console.log(response.data)
      //setData(response.data)  
    })
    .catch(function(error) {
      console.log(error);
  });
}

//Agrega un item al carrito
const postReduceProducts= async(idProduct)=>{
  var urlPostProducts = URL+`/carrito/`+idProduct;
  console.log(urlPostProducts);
  var authOptions = {
    method: "POST",
    url: urlPostProducts,
    data: {
      idPlato: idProduct,
    },      
    json: true,
  };
  console.log(authOptions);
  await Axios(authOptions)
    .then(function(response) {
      console.log(response.data)
      //setData(response.data)  
    })
    .catch(function(error) {
      console.log(error);
  });
}

const deleteCarrito=async()=>{   
  const baseUrlDelete = URL+`/limpiar-carrito`;
  console.log(baseUrlDelete);
  await Axios.delete(baseUrlDelete)
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}

const deleteItemCarrito=async(idProduct)=>{   
  const baseUrlDelete = URL+`/carrito/`+idProduct;
  console.log(baseUrlDelete);
  await Axios.delete(baseUrlDelete)
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}

export default class observer extends Component {

  state = {
    cuenta: 0
  };
    
    constructor() {
      super();
      deleteCarrito();
    }
    
    aumentarCuenta() {
      this.setState((prevState) => ({
        cuenta: prevState.cuenta + 1
      }));
    }

    notify(idProduct, nameProduct, costProduct, peticion) {
      if(peticion == "add"){
        postProducts(idProduct, costProduct);
        getCarrito();
      }else if (peticion == "reduce"){
        postReduceProducts(idProduct);
        getCarrito();
      }else if (peticion == "delete"){
        deleteItemCarrito(idProduct);
        getCarrito();
      }
      
      /*document.getElementById('contenido').innerHTML += `
      <Table size="small" aria-label="a dense table">
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">`+1+`</TableCell>
              <TableCell align="left">`+nameProduct+`</TableCell>
              <TableCell align="right">`+costProduct+`</TableCell>
            </TableRow>
        </TableBody>
      </Table>`;
      
        //document.getElementById('cantidad').innerHTML = 1;
        //document.getElementById('nombre').innerHTML = nameProduct;
        //document.getElementById('precio').innerHTML = costProduct;
        alert(this.state.cuenta+" - Producto de código "+idProduct+", nombre "+nameProduct+" y precio "+costProduct);
        */
      }

    render() {
      return (
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Nombre del Restaurante.
            </Typography>
    
            <div>
            <h5>Mi Pedido</h5>
            <Delete/>
            </div>

            <div id="contenido"></div>

            <Typography variant="body2" component="p">
                <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                          <TableCell id="cantidad" component="th" scope="row">1</TableCell>
                          <TableCell id="nombre" align="left">Nombre</TableCell>
                          <TableCell id="precio" align="right">Precio</TableCell>
                          <TableCell id="eliminar" align="right">Eliminar</TableCell>
                        </TableRow>
                    </TableBody>
                </Table> 
                </TableContainer>
            </Typography><p/>
    
    
            <Typography color="textSecondary">
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
    
            <p/><h5>Total</h5><p/>
    
            <Button variant="contained" color="primary" fullWidth>
                Realizar Pedido
            </Button>
    
          </CardContent>
        </Card>
      );
    }
  }
