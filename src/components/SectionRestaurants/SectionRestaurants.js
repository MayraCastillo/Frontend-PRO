import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

const baseUrl =`http://localhost:8092/restaurantes`;

export default function SectionRestaurants() {

    const [data, setData] = useState([]);

    const GetRestaurants= async()=>{
      await Axios.get(baseUrl) 
      .then(response=>{
        setData(response.data)
      })
      .catch((error)=>{console.log(error)})
    }

    useEffect(()=>{
        GetRestaurants();
    },[])

    const selectRestaurant=(idRestaurant)=>{
        localStorage.setItem('idRestSelect', idRestaurant);
    }
  
    return (
        <div className="container servicios">
            <div className="row">
                {data.map(console=>(
                <div className="col-lg-4"  key={console.id}>
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="https://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">
                        <title>{console.nitRest}</title>
                        <rect width="100%" height="100%" fill="#777" />
                        <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                    </svg>
                    <h2>{console.nombreRest}</h2>
                    <p>{console.descRest}</p>
                    <p><a className="btn btn-secondary" href="#/pedido" role="button"
                    onClick={() =>selectRestaurant(console.nitRest)}>Ver Productos &raquo;</a></p>
                </div>     
                ))}
            </div>
        </div>
    )
}