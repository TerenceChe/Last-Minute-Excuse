import { useState } from 'react'
import reactLogo from './assets/react.svg'
import rootCSS from './CSS/root.module.css';
import { Link } from 'react-router-dom';
import bgVideo from '../clock.mp4';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import ButtonAppBar from '../Components/ButtonAppBar';
export default function Root() {

    const navigate = useNavigate();

    function navTo(text: string) {
        navigate(`/${text}`)
    }
    return (
        <div className={rootCSS.container}>
            <ButtonAppBar></ButtonAppBar>
            <video autoPlay muted loop className={rootCSS.myVideo}>
                <source src={bgVideo} type="video/mp4" />
            </video>

            <form className={rootCSS.loginarea}>

                <input className={rootCSS.credentials} type="username" placeholder="Username...">
                </input>
                <br></br>

                <input id={rootCSS.password} type="password" placeholder="Password..."
                >
                </input>
                <br></br>

                <div className={rootCSS.login}>
                    <Button className={rootCSS.loginlink} variant="contained" onClick={() => navTo("home")}>Login</Button>
                </div>


            </form >



        </div>
    );
}