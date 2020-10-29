import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import { useEffect, useState } from "react";
import Axios from "axios";
import{TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, Button, TextField}from '@material-ui/core';
import{Edit,Delete} from '@material-ui/icons';
import Select from "react-select";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));


const baseUrl =`http://localhost:8092/restaurantes/listar-empleados/1`


export default function GestionPersonal() {
  const styles= useStyles();
  const classes = useStyles();
  const options = [
    { value: '1', label: 'Jefe De Cocina' },
    { value: '2', label: 'Mensajero' }   
  ]

  //Hook para capturar la data
  const [data, setData] = useState([]);
  //Hooks para los modales
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  //Formulario
  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    nombre_empleado:'',
    correo_empleado:'',
    password_empleado:'',
    telefono_empleado:'',
    direccion_empleado:'',
    img_empleado: 'vacio',
    //status_empleado:'ACTIVATED',
    idRol_empleado:'',
    restaurante: 
    {
        idRest: 1
    }
  })
  const [categoria, setCategoria] = React.useState({
    value: "-1",
    label: "Categoría",
  });
  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value     
    }))
    //console.log(consolaSeleccionada);
  }
  function handleChangeCategoria(selectedOption) {
    setCategoria(selectedOption);
    setConsolaSeleccionada({...consolaSeleccionada, idRol_empleado:selectedOption.value})      
   // setConsolaSeleccionada({idRol_empleado:categoria.value})   
  }

  const peticionPost=async()=>{
    
    console.log(consolaSeleccionada); 
    //console.log(categoria);   
    //setConsolaSeleccionada({idRol_empleado:categoria.value})     
    await Axios.post(`http://localhost:8092/restaurantes/crear-empleado`, consolaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  } 
  const peticionPut=async()=>{    
    const baseUrlPut = `http://localhost:8091/platos/actualizar-plato`+`/`+consolaSeleccionada.idPlato;
    
    let response;
    var dataNueva=data;
    dataNueva.map(consola=>{
      if(consolaSeleccionada.idPlato===consola.idPlato){
        consola.nombrePlato=consolaSeleccionada.nombrePlato;
        consola.descPlato=consolaSeleccionada.descPlato;
        consola.precioPlato=consolaSeleccionada.precioPlato;
        consola.categoriaPlato=consolaSeleccionada.categoriaPlato;
        consola.ingredientesPlato=consolaSeleccionada.ingredientesPlato;
        consola.cantidadPlato=consolaSeleccionada.cantidadPlato;         
      }
    })
    var authOptions = {
      method: "PUT",
      url: baseUrlPut,
      data: consolaSeleccionada,      
      json: true,
    };
    //console.log(consolaSeleccionada);
    //console.log(dataNueva);
    console.log(authOptions)
    await Axios(authOptions)
      .then(function(response) {
        //setLoading(false);
   
        toast.success('Se actualizó el plato');
        //console.log("1")        
      })
      .catch(function(error) {
        //setLoading(false);
        //console.log("2")
         
      });
    /*
    await Axios.put(baseUrlPut+consolaSeleccionada.idPlato, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.idPlato===consola.idPlato){
          consola.nombrePlato=consolaSeleccionada.nombrePlato;
          consola.descPlato=consolaSeleccionada.descPlato;
          consola.precioPlato=consolaSeleccionada.precioPlato;
          consola.categoriaPlato=consolaSeleccionada.categoriaPlato;
          consola.ingredientesPlato=consolaSeleccionada.ingredientesPlato;
          consola.cantidadPlato=consolaSeleccionada.cantidadPlato;         
        }
      })
      setData(dataNueva);
      console.log(dataNueva);
      abrirCerrarModalEditar();
    })*/
  }
  /*Lo usamos para abrir y cerrar los modales*/
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }
  //console.log(localStorage.getItem('rol'));
  const peticionGet= async()=>{
    await Axios.get(baseUrl)
    .then(response=>{
      setData(response.data)
      console.log(response.data)
    })
    .catch((error)=>{console.log(error)})
  }
useEffect(()=>{
   peticionGet();
},[])

const bodyInsertar=(
  <div className={styles.modal}>
    <h3>Agregar Personal</h3>
    <TextField variant="outlined"  name="nombre_empleado" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
    <br /><br />
    <TextField variant="outlined"  name="correo_empleado" className={styles.inputMaterial} label="Correo" onChange={handleChange}/>
    <br /><br />
    <TextField variant="outlined"  name="password_empleado" className={styles.inputMaterial} label="Contraseña" onChange={handleChange}/>
    <br /><br />
    <TextField variant="outlined" name="telefono_empleado" className={styles.inputMaterial} label="Teléfono" onChange={handleChange}/>
    <br /><br />
    <TextField variant="outlined" name="direccion_empleado" className={styles.inputMaterial} label="Dirección" onChange={handleChange}/>
    <br /><br />
    <div className={classes.row}>
    Seleccione el Rol del Usuario:
    <Select name="categoria"
    value={categoria}
    onChange={handleChangeCategoria}
    options={options} />   
    </div>    
    <br /><br />
    <div align="right">
      <Button color="primary" 
      
      onClick={(e)=>peticionPost()}>
        Insertar
      </Button>
      <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
    </div>
  </div>
  
)



const bodyEditar=(
  <div className={styles.modal}>
    <h3>Editar Plato</h3>
    <TextField name="nombrePlato" className={styles.inputMaterial} variant="outlined" label="Nombre del Plato" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombrePlato}/>
    <br />
    <br />   
    <TextField name="descPlato" className={styles.inputMaterial} variant="outlined" label="Descripcion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.descPlato}/>
    <br /><br />
    <TextField name="precioPlato" className={styles.inputMaterial} variant="outlined" label="Precio" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.precioPlato}/>
    <br />
    <br />   
    <TextField name="ingredientesPlato" className={styles.inputMaterial} variant="outlined" label="Ingredientes" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.ingredientesPlato}/>
    <br /><br />
    <TextField name="categoriaPlato" className={styles.inputMaterial} variant="outlined" label="Categoria" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.categoriaPlato}/>
    <br />
    <br />   
    <TextField name="cantidadPlato" className={styles.inputMaterial} variant="outlined" label="Cantidad" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.cantidadPlato}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
      <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
    </div>
  </div>
)

  return (
    <GridContainer>
      <GridItem xs={3} sm={3} md={3}>
        <div align="right">
        <Button  onClick={()=>abrirCerrarModalInsertar()} variant="contained" color="primary" size="large" disableElevation fullWidth>
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
                   <TableCell>Nombre del Empleado</TableCell>
                   <TableCell>Correo</TableCell>
                   <TableCell>Dirección</TableCell>
                   <TableCell>Teléfono</TableCell> 
                   <TableCell>Rol</TableCell>               
                 </TableRow>
               </TableHead>
               <TableBody>
                 {data.map(console=>(
                   <TableRow 
                   hover                   
                   key={console.idEmpleado}>                     
                     <TableCell>{console.nombreEmpleado}</TableCell>
                     <TableCell>{console.correoEmpleado}</TableCell>
                     <TableCell>{console.direccionEmpleado}</TableCell>
                     <TableCell>{console.telefonoEmpleado}</TableCell>
                     <TableCell>{console.idRolEmpleado}</TableCell>
                     <TableCell>
                       <Edit onClick={() =>seleccionarConsola(console,'Editar')}/>
                       &nbsp;&nbsp;&nbsp;
                       <Delete/>
                     </TableCell>
                   </TableRow>
                 ))}
              
                    
               </TableBody>
             </Table>
           </TableContainer>
           <GridItem xs={12} sm={12} md={12}>
              <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
              </Modal>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
              </Modal>
              </GridItem>         
          </CardBody>
        </Card>
      </GridItem>
    
    </GridContainer>
  );
}
