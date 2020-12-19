import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from "react-redux";
import { addTodaysMenuAction } from "../../redux/Actions";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    marginLeft: '15px',
  }
}));

const baseURL =`http://localhost:8091/platos/semanario/buscar-por-dia/`;

/**
 * Se muestra la informacion de la posible opcion, dependiendo de la categoria (Sopa, Principio,
 * Proteina o Ensadala), que el cliente puede seleccionar para completar su menu del dia.
 * @param {*Categoria del producto del que se mostrara la informacion} props 
 */
export default function ListDividers(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const todaysMenu = useSelector((state) => state.todaysmenu);
  const dispatch = useDispatch();

  useEffect(()=>{
    getSemRestCat();
  },[])

  /**
   * Realiza una peticion GET a la base de datos, mediante la cual recupera el semanario del dia
   * segun el restaurant y la categoria a la que corresponde el producto.
   */
	const getSemRestCat = () => {

    var urlGetSemRestCat = baseURL+localStorage.getItem('idRestSelect')+`?categoria=`+props.categoria;
    
		Axios.get(urlGetSemRestCat)
		.then((response) => {
			console.log(response.data);
			setData(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
	};

  /**
   * Agrega el nombre de la opcion, segun la categoria, seleccionada o elegida por el cliente,
   * la cual conformara parte del menude dia, a una variable/estado global de la aplicacion
   * @param {*Nombre del producto segun la categoria seleccionado} nameTodaysMenu 
   */
  const addTodaysMenu = (nameTodaysMenu) => {
    let newTodaysMenu = { id: todaysMenu.length, name: nameTodaysMenu };
    dispatch(addTodaysMenuAction(newTodaysMenu));
  };

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <div className="row">
        {data.map(rest=>(
          <div className="col-md-6"  key={rest.id}>
            <ListItem button onClick={() => addTodaysMenu(rest.nombrePlato)}>
              <img 
                className="bd-placeholder-img rounded-circle"
                width="45"
                height="45"
                src={rest.imgPlato}
              />
              <ListItemText className={classes.margin} primary={rest.nombrePlato} />
            </ListItem>
            <Divider />
          </div>
        ))} 
      </div>
    </List>
  );
}