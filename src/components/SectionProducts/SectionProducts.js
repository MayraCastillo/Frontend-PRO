import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer";

const baseUrl =`http://localhost:8091/platos`;

export default function SectionProducts(props) {
    
    const [data, setData] = useState([]);

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
    
    useEffect(()=>{
        PostProducts();
    },[])

    return(
        
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div className="album py-5 bg-light">
                <div className="row">
                {data.map(console=>(
                    <div className="col-md-6"  key={console.id}>
                        <div className="card mb-6 shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="https://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Plato 1"><title>{console.nombrePlato}</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">{console.nombrePlato}</text></svg>
                            <div className="card-body">
                                <p className="card-text">{console.descPlato}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Mas Informacion</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))} 
                </div>
                </div>
            </GridItem>
        </GridContainer>
    )
}