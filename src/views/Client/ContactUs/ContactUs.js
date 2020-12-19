import React from 'react';
 
import Menu from '../../../components/Menu/Menu';
import Form from '../../../components/FormContact/FormContact';
import Map from '../../../components/Map/Map';

export default function ContactUs() {
  
    return(<>
        <Menu />
        <main role="main" className="flex-shrink-0 mt-5">
            <div className="container">
                <h1 className="mb-5"><br/>Contacto</h1>
                <div className="row">
                    <div className="col-md-6">
                    <Form /> <span></span>
                    </div>

                    <div className="col-md-6">
                        <Map /> <span></span>
                    </div>
                </div>
            </div>
        </main>
    </>)
}