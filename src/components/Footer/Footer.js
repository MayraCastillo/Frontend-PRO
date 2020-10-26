import React from 'react';

export default function Footer() {

    return (
            <footer className="container">
                    <hr className="featurette-divider" />
                    <p>&copy; {(new Date().getFullYear())} PRO, Inc. &middot; <a href="#">Política de Privacidad</a> &middot; <a href="#">Términos</a></p>
            </footer>
    )
}