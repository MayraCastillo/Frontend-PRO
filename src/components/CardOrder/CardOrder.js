import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function createData(quantity, name, cost) {
  return { quantity, name, cost };
}
  
const rows = [
  createData(3, 'Menú del Día', 5000),
  createData(2, 'Sancocho de Gallina', 23000),
];

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Nombre del Restaurante.
        </Typography>

        <div>
        <h5 className="float-left">Mi Pedido</h5>
        <Delete className="float-right"/>
        </div>

        <Typography variant="body2" component="p">
            <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.quantity}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.cost}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Typography><p/>

        <Typography className={classes.pos} color="textSecondary">
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
