import React from 'react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SectionProducts from '../SectionProducts/SectionProducts';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

export default function SimpleAccordion() {
	const classes = useStyles();
	const idSelectRest = localStorage.getItem('idRestSelect');

	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Menú del Día</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<SectionProducts
							idRestSelect={idSelectRest}
							categoria="plato-del-dia"
						/>
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<Typography className={classes.heading}>Platos Especiales</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<SectionProducts
							idRestSelect={idSelectRest}
							categoria="plato-especial"
						/>
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3a-content"
					id="panel3a-header"
				>
					<Typography className={classes.heading}>Bebidas</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<SectionProducts idRestSelect={idSelectRest} categoria="bebida" />
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel4a-content"
					id="panel4a-header"
				>
					<Typography className={classes.heading}>Postres</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<SectionProducts idRestSelect={idSelectRest} categoria="postre" />
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion disabled>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel5a-content"
					id="panel3a-header"
				>
					<Typography className={classes.heading}>
						Promociones Especiales
					</Typography>
				</AccordionSummary>
			</Accordion>
		</div>
	);
}
