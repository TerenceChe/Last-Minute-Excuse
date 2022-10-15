import { useState } from 'react'
import reactLogo from './assets/react.svg'
import rootCSS from './CSS/root.module.css';
import { Link } from 'react-router-dom';
import bgVideo from '../clock.mp4';
export default function Root() {
    return (
        <div className={rootCSS.container}>
            <header className={rootCSS.header}>
                <h1> Excuse Generator</h1>
            </header>
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
                    <Link className={rootCSS.loginlink} to="/home">Login</Link>
                </div>
                

            </form >



        </div>
    );
}