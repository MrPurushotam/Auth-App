import React from 'react'
import {Link} from 'react-router-dom'


export default function Home(){

    return(
        <div className="home-about">
        <h2>Welcome, Developers!</h2>
        <p>
          Unlock Your Potential with Innovative Solutions.
          <br /><br />Hey there, tech enthusiasts, welcome to our digital haven
          for developers!
        </p>
        <br />
        
        <Link className='signin-link' to="/signin">SignIn</Link><br />
        <Link className='signup-link' to="/signup">SignUp</Link>
  
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