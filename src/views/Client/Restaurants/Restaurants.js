import React from 'react';
import Menu from '../../../components/Menu/Menu';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Stepper from '../../../components/Stepper/Stepper1';
import SectionRestaurants from '../../../components/SectionRestaurants/SectionRestaurants';

export default function Orders() {
	return (<>
		<Menu />
		<Header />
		<main role="main" className="container-base">
			<Stepper /><br/>
			<section className="text-center">
				<h1 className="jumbotron-heading">Restaurantes</h1>
				<br />
			</section>
			<SectionRestaurants />
		</main>
	</>);
}
