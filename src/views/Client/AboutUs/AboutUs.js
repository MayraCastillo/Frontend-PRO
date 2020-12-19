import React from 'react';
 
import Menu from '../../../components/Menu/Menu';
import Jumbotron from '../../../components/Jumbotron/Jumbotron'; 
import Details from '../../../components/Details/Details'; 
import Footer from '../../../components/Footer/Footer';

export default function AboutUs() {
  
    return(<>
        <Menu />
        <main role="main" className="flex-shrink-0 mt-5"> 
            <Jumbotron />
            <Details />
        </main>
        <Footer />
    </>)
}