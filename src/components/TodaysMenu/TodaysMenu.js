import React from "react";
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableHead } from "@material-ui/core";

/**
 * La funcion permite visualizar una tabla en la cual se muestra el registro de los menu del dia
 * seleccionados y formados por el cliente, permitiendo su facil comprension al seperar las categorias
 * por columnas (Sopa, Principio, Proteina y Ensalada).
 */
function TodaysMenu() {
  const todosTodaysMenu = useSelector((state) => state.todostodaysmenu);

  return (
    <div>
        <Typography variant="body2" component="p">
			<TableContainer component={Paper} variant="outlined">
				<Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sopa</TableCell>
                            <TableCell>Principio</TableCell>
                            <TableCell>Proteina</TableCell>
                            <TableCell>Ensalada</TableCell>
                        </TableRow>
                    </TableHead>

					<TableBody>
                    {todosTodaysMenu.map((item) => (
						<TableRow>
							<TableCell component="th" scope="row">
                                {item[0].name}
							</TableCell>

                            <TableCell component="th" scope="row">
                                {item[1].name}
							</TableCell>

                            <TableCell component="th" scope="row">
                                {item[2].name}
							</TableCell>

                            <TableCell component="th" scope="row">
                                {item[3].name}
							</TableCell>
										
						</TableRow>
					))}
				    </TableBody>
				</Table>
			</TableContainer>
		</Typography>
    </div>
  );
}

export default TodaysMenu;