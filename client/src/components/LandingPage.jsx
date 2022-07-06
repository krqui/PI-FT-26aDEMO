import React from "react";
import '../Styles/LandingPage.css'
const { Link } = require("react-router-dom");

function LandingPage(){
    return (
        <div className="contenedor-supremo">
            <div className="contenedor-foto1">
                <div>
                    <div className="contenedor-boton">
                    <Link to='/home'>
                        <div className="div-boton">
                            <button className="boton">
                            Access key
                            </button>
                        </div>
                    </Link>
                    </div>
                </div>
            </div>

            <div className="contenedor-foto2"></div>
            <div className="contenedor-foto3"></div>
        </div>)
}

export default LandingPage;