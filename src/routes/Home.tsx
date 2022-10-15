import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import homeCSS from './CSS/home.module.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'




function Home() {
    const navigate = useNavigate();

    function navTo(text: string) {
        navigate(`/${text}`)
    }
    


    return (
        <div className={homeCSS.container}>
            
            <div className={homeCSS.buttonContainer} >
                <Button className={homeCSS.generateButton} variant="contained" onClick={() => navTo("excuses")}>Generate Excuses</Button>
            </div>



        </div>

    );
}

export default Home;