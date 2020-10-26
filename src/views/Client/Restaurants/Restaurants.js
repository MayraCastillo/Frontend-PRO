import React from 'react';

import Menu from '../../../components/Menu/Menu';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import SectionRestaurants from "../../../components/SectionRestaurants/SectionRestaurants";

const baseUrl =`http://localhost:8092/restaurantes`;

export default function Orders() {

    return(<>
        <Menu />
        <Header />
        <main role="main" className="containerBase">
            <section className="text-center">
                <h1 className="jumbotron-heading">Restaurantes</h1>
                <br/>
            </section>
            <SectionRestaurants />
        </main>
        <Footer />
    </>)
}