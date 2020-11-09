import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();

	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [estadoUser, setEstadoUser] = useState(false);
	const [estadopass, setEstadopass] = useState(false);
	const [errorDatos, setErrorDatos] = useState(false);
	const URL = 'http://localhost:8095/roles';

	const handleSubmit = (event) => {
		//return localStorage.getItem("token")? <Redirect to='/admin/dashboard' push={true}/>:false
		event.preventDefault();
		if (user.trim() == '') {
			setEstadoUser(true);
			setErrorDatos(false);
			setEstadopass(false);
			return;
		}
		if (password.trim() == '') {
			setEstadopass(true);
			setEstadoUser(false);
			setErrorDatos(false);
			return;
		}

		Axios.post(URL, { password: password, correo: user })
			.then((DataLogin) => {
				if (DataLogin.data.token === 'error') {
					setEstadoUser(false);
					setEstadopass(false);
					setErrorDatos(true);
				} else {
					//console.log(localStorage)
					localStorage.setItem('token', DataLogin.data.idRol);
					localStorage.setItem('idUsuario', DataLogin.data.idUsuario);
					localStorage.setItem('nombreRol', DataLogin.data.nombreRol);
					localStorage.setItem('correo', user);
					console.log(localStorage.getItem('token'));
					setUser('');
					setPassword('');

					if (localStorage.getItem('token') == '1') {
						window.location.href = '/cliente/restaurantes';
					} else {
						window.location.href = '/';
					}
				}
			})
			.catch((error) => {
				toast.error('Correo o Contraseña inválido');
				console.log(error);
			});

		// return localStorage.getItem("token")? <Redirect to='/admin/dashboard' push={true}/>:false
	};

	/*
  if(localStorage.getItem("token")){
    return <Redirect to='/admin/user' push={true}/>
  }      

useEffect(()=>{
    if(localStorage.getItem("token")){
      return <Redirect to='/admin/user' push={true}/>
    }      
},[handleSubmit])


  if(localStorage.getItem("token")){
    return <Redirect to='/admin/user' push={true}/>
  }      
 
  if(localStorage.getItem("token")){
    return <Redirect to='/admin/user' push={true}/>
  }

 localStorage.setItem('token',"qwdqw123");
  localStorage.setItem('user', "1234");
  localStorage.setItem('rol', "2");
   
  if(localStorage.getItem("token")?true:false){
    return <Redirect to='/admin/user' push={true}/>
  }*/

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Inicio Sesión
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Correo Electrónico"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={(e) => setUser(e.target.value)}
					/>
					{estadoUser ? (
						<span style={{ color: 'red' }}>
							Usuario no puede ser vacio {estadoUser}
						</span>
					) : null}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Contraseña"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{estadopass ? (
						<span style={{ color: 'red' }}>Contraseña no puede ser vacia</span>
					) : null}
					{errorDatos ? (
						<Box color="Red" mt={5}>
							<div>Usuario o Contraseña incorrecta</div>
						</Box>
					) : null}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						//onclick={(event)=> handleSubmit()}
					>
						Ingresar
					</Button>
					<Grid container>
						<Grid item>
							<Link href="https://www.google.com/" variant="body2">
								{'¿No estás Registrado? Click Aquí'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
