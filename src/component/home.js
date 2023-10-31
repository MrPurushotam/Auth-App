import React from 'react'
import {Link} from 'react-router-dom'


export default function Home(){

    return(
        <div className="home-about">
        <h2>Hiii There !</h2>
        <p>
          Yeah you are Here As expected!
          <br /><br />
            Register Yourself & Log Yourself Weirdo!
        </p>
        <br />
        
        <Link className='signup-link' to="/signup">SignUp</Link><br />
        <Link className='signin-link' to="/signin">SignIn</Link>
  
        <button className='home-flush-btn'
        onClick={(e)=>{
          e.preventDefault();
          document.cookie='data=;expire=;path="/signin"'
          document.cookie='xtoken=;expire=;path="/signin"'
          document.cookie='status=;expire=;path="/signin"'
      }}>Flush</button>
      </div>
    )
}
