import React from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';

import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import { Bar } from 'react-chartjs-2';
//Date Picker
//Instalar previamente npm i @date-io/date-fns@1.x date-fns npm i @material-ui/pickers

import 'date-fns';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

import { dailySalesChart } from 'variables/charts.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export default function Dashboard() {
	//Contiene la informacion que se mostrara en la  grafica
	const data = {
		labels: [
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado',
			'Domingo',
		],
		datasets: [
			{
				label: 'Unidades Monetarias',
				backgroundColor: '#3F7FBF',
				borderColor: 'black',
				borderWidht: '1',
				hoverBackgroundColor: 'rgba(0,255,0,0.2)',
				hoverBorderColor: '#FF0000',
				data: [100, 200, 500, 300, 0, 250, 340],
			},
		],
	};
	const opcionesBarra = {
		maintainAspectRatio: false,
		responsive: true,
	};
	const [selectedDate, setSelectedDate] = React.useState(
		new Date('2020-01-01T21:11:54')
	);
	const [selectedDateFinal, setSelectedDateFinal] = React.useState(
		new Date('2020-01-01T21:11:54')
	);
	//Metodo para cambiar la fecha inicial
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	//Metodo para cambiar la fecha final
	const handleDateChangeFinal = (date) => {
		setSelectedDateFinal(date);
	};
	const classes = useStyles();
	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="success" stats icon>
							<CardIcon color="success">
								<Store />
							</CardIcon>
							<p className={classes.cardCategory}>Ingresos</p>
							<h3 className={classes.cardTitle}>$34,245</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={classes.stats}>
								<DateRange />
								Últimas 24h
							</div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="danger" stats icon>
							<CardIcon color="danger">
								<Icon>info_outline</Icon>
							</CardIcon>
							<p className={classes.cardCategory}>Impuestos</p>
							<h3 className={classes.cardTitle}>75</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={classes.stats}>
								<LocalOffer />
								Tax
							</div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={6} md={3}>
					Filtrar por Fecha:
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container justify="space-around">
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="date-picker-inline"
								label="Fecha Inicial"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
							<KeyboardDatePicker
								margin="normal"
								id="date-picker-dialog"
								label="Fecha Final"
								format="MM/dd/yyyy"
								value={selectedDateFinal}
								onChange={handleDateChangeFinal}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</Grid>
					</MuiPickersUtilsProvider>
				</GridItem>
			</GridContainer>

			<Grid style={{ widht: '100%', height: '450px' }}>
				<Bar data={data} options={opcionesBarra} />
			</Grid>
		</div>
	);
}
