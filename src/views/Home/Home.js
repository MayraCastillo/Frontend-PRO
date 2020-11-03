import React from 'react';
 
import Menu from '../../components/Menu/Menu';
import Slider from '../../components/Slider/Slider';
import SectionRestaurants from '../../components/SectionRestaurants/SectionRestaurants';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  
    return(<>
        <Menu />
        <main role="main" className="flex-shrink-0 mt-5">
            <div className="wrapper"></div>
            <div className="container">
                <Slider />
            </div>
        </main>
        <Footer />
    </>)
}