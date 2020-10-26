import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Map from '../Map/Map'

function createData(day, hours) {
    return { day, hours };
}

const rows = [
    createData('Lunes', '10:00 - 03:45'),
    createData('Martes', '10:00 - 03:45'),
    createData('Miércoles', '10:00 - 03:45'),
    createData('Jueves', '10:00 - 03:45'),
    createData('Viernes', '10:00 - 03:45'),
    createData('Sábado', '11:00 - 02:30'),
];

export default function Details() {
  
    return (
        <div className="container">
            <p><b>Horarios</b><br/>
            <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <TableContainer component={Paper} variant="Standard">
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell align="left">{row.day}</TableCell>
                            <TableCell align="left">{row.hours}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </GridItem>
            </GridContainer></p>

            <p><br/><b>Teléfonos</b>
            <br/>313 843 9832
            <br/>311 679 2847</p>

            <p><br/><b>Ubicación</b>
            <br/>Calle 2N #10A- 61 Brr: Modelo -
            <br/><Map /></p>
            
        </div>
    )
}
