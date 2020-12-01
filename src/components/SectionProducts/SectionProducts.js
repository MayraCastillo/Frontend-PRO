import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { modifyTodoAction } from "../../redux/Actions";

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    button: {
        color: 'white',
        borderRadius: '50%',
		background: '-webkit-linear-gradient( 95deg, rgb(3,92,107) 0%, rgb(23,162,184) 50%, rgb(56,204,227) 100%)',
	},
});

const baseUrl =`http://localhost:8091/platos`;

export default function SectionProducts(props) {
    
    const classes = useStyles();
    const [data, setData] = useState([]);
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(()=>{
        PostProducts();
    },[])

    const PostProducts= async()=>{

      var urlPostProducts = baseUrl+`/buscar-por-categoria/`+props.idRestSelect;
      
      var authOptions = {
        method: "POST",
        url: urlPostProducts,
        data: {
          categoriaPlato: props.categoria,
        },      
        json: true,
      };

      await Axios(authOptions)
        .then(function(response) {
          setData(response.data)  
        })
        .catch(function(error) {
          console.log("ERROR");
      });
    }

    const addProduct=(idProduct, nameProduct, costProduct)=>{
        let newTodo = { 
            id: todos.length, 
            idProduct: idProduct,
            nameProduct: nameProduct, 
            costProduct:costProduct,
        };
        dispatch(modifyTodoAction(newTodo));
    };

    return(
        
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div className="row">
                {data.map(rest=>(
                    <div className="col-md-6"  key={rest.id}>
                        <div className="card mb-6 shadow-sm">
                            <AddIcon className={classes.button} style={{ fontSize: 30}}
                             onClick={() =>addProduct(rest.idPlato, rest.nombrePlato, rest.precioPlato)}/>
                            <img className={classes.root} src={rest.imgPlato} title={rest.nombrePlato}/>
                            <div className="card-body">
                                <h4><b>{rest.nombrePlato}</b></h4>
                                <p className="card-text">{rest.descPlato}</p>
                                <p className="card-text" align="right">$ {rest.precioPlato}</p>
                            </div>
                        </div>
                    </div>
                ))} 
                </div>
            </GridItem>
        </GridContainer>
    )
}