import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout(){
    const navigate=useNavigate();
    const logout=(e)=>{
        e.preventDefault();
        document.cookie=`data=;expire=;path='/signin'`;
        document.cookie=`xtoken=;expire=;path='/signin'`;
        document.cookie=`status=;expire=;path='/signin'`;
        console.log("cookie deleted!")
        navigate('/')
    }
    return(
        <div className='logout-container'>
            <button 
            className='logout-button'
            onClick={logout}>Logout</button>
        </div>
    )
}