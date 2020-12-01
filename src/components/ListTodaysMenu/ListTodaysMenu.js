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

export default function ListDividers(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const todaysMenu = useSelector((state) => state.todaysmenu);
  const dispatch = useDispatch();

  useEffect(()=>{
    getSemRestCat();
  },[])

  //Recupera el semanario del dia segun el restaurante y la categoria del producto
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

  const addTodaysMenu = (nameTodaysMenu) => {
    let newTodaysMenu = { id: todaysMenu.length, name: nameTodaysMenu };
    dispatch(addTodaysMenuAction(newTodaysMenu));
    document.getElementById('btnPrueba').innerHTML = "false";
    //document.getElementById('btnPrueba').disabled = false;
  };

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <div className="row">
        {data.map(rest=>(
          <div className="col-md-6"  key={rest.id}>
            <ListItem id="btnPrueba" button onClick={() => addTodaysMenu(rest.nombrePlato)}>
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