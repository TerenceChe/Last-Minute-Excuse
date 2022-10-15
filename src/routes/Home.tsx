import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import homeCSS from './CSS/home.module.css';


function Home() {
    


    return (
        <div className={homeCSS.container}>
            <Link className={homeCSS.loginlink} to="/">back to login</Link>
            <button className={homeCSS.generateButton}> Generate Excuses</button>

            
          
        </div>

    );
}

export default Home;