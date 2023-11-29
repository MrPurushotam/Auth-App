import React from 'react'
import {Link} from 'react-router-dom'


export default function Home(){

    return(
    <div className='parent-container'>
    <div className='container home'>
        <div className="home-about">
        <h2>Hello Mf** !</h2>
        <p>
          Yeah you are Here As expected!
          <br /><br />
            Register Yourself & Log Yourself Weirdo!
        </p>
        <br />
        
        <Link className='signup-link' to="/signup">SignUp</Link><br />
        <Link className='signin-link' to="/signin">SignIn</Link>
        <button 
        onClick={(e)=>{
            e.preventDefault();
            document.cookie='data=;expire=;Path="/signin"'
            document.cookie='xtoken=;expire=;Path="/signin"'
            document.cookie='status=;expire=;Path="/signin"'
        }}
        className='home-flush-btn'
        >Flush</button>
        </div>
    </div>
    </div>
    )
}
