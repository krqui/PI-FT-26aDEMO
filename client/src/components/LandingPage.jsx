import React from "react";
const { Link } = require("react-router-dom");

function LandingPage(){
    return (
        <div>
            <Link to='/home'>
                <div>
                    <button>
                        Click para visualizar los videojuegos.
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default LandingPage;