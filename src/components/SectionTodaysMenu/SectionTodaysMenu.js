import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListProductsToday from "../ListTodaysMenu/ListTodaysMenu";
import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer";
import { Provider } from "react-redux";
import { store } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { modifyTodoAction, deleteTodaysMenuAction, addTodosTodaysMenuAction } from "../../redux/Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: '25px',
    color: 'white',
    background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
  },
}));

/**
 * En esta funcion se establece el menu del dia del restaurante especifico que fue seleccionado
 * anteriomente por el cliente, determinando 4 secciones, cada una correspondiente a una categoria
 * a la que pertenece cada opcion, siendo estas: Sopas, Principios, Proteinas y Ensaladas.
 */
export default function VerticalTabs() {
  const classes = useStyles();
  const todos = useSelector((state) => state.todos);
  const todaysMenu = useSelector((state) => state.todaysmenu)
  const dispatch = useDispatch();

  /**
   * Agrega en una constante/estado global la informacion del menu del dia seleccionado por el cliente.
   */
  const addProduct=()=>{
    let newTodo = { 
        id: todos.length, 
        idProduct: 221,
        nameProduct: 'Menú del Día', 
        costProduct: 6000,
    };
    dispatch(modifyTodoAction(newTodo));
    dispatch(addTodosTodaysMenuAction(todaysMenu));
    dispatch(deleteTodaysMenuAction(0));
    dispatch(deleteTodaysMenuAction(1));
    dispatch(deleteTodaysMenuAction(2));
    dispatch(deleteTodaysMenuAction(3));
};

  return (
    <div className={classes.root}>
      <Provider store={store}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <p><b>Sopa</b></p>
            <ListProductsToday
							categoria="sopa"
						/>

            <br/><p><b>Principio</b></p>
            <ListProductsToday
							categoria="principio"
						/>

            <br/><p><b>Proteina</b></p>
            <ListProductsToday
							categoria="proteina"
						/>

            <br/><p><b>Ensalada</b></p>
            <ListProductsToday
							categoria="ensalada"
						/>

          </GridItem>

          <div className="col-md-12">
          <Button
            variant="contained"
            className={classes.button}
            onClick={() =>addProduct()}
            fullWidth
          >
            Confirmar
          </Button>
          </div>
        </GridContainer>
      </Provider>
    </div>
  );
}