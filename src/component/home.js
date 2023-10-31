import React from 'react'
import {Link} from 'react-router-dom'

export default function Home(){

    return(
        <div className="about">
            <h2 classsName="about-title">Welcome Asshole!</h2>
            <p>Yeah you are Here As expected<br/> <Link to="/signin">SignIn</Link> here...
            <br/><Link to="/signup">SignUp</Link> here...
            </p>
            <button 
            onClick={(e)=>{
                e.preventDefault();
                document.cookie='data=;expire=;Path="/signin"'
                document.cookie='xtoken=;expire=;Path="/signin"'
                document.cookie='status=;expire=;Path="/signin"'
            }}
            >Flush</button>
        </div>
    )
}