import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout(){
    const navigate=useNavigate();
    const logout=(e)=>{
        e.preventDefault();
        document.cookie=`data=;expire=;Path='/signin'`;
        document.cookie=`xtoken=;expire=;Path='/signin'`;
        document.cookie=`status=;expire=;Path='/signin'`;
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