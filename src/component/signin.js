import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import {splitCookies,hasLowCaseChar,hasUpCaseChar,hasSpecialChar,hasNumbers,isValidEmail} from './constFunctions';

export default function SignIn(){
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    const [buttonDisabled,setButtonDisabled]=useState(true);
    const [loading,setLoading]=useState(false);
    
    const submit=async (e)=>{
        e.preventDefault();
        setLoading(true)
        const resp=await axios.post(`http://localhost:9000/api/signin`,JSON.stringify({user}),{
            headers:{
                'Content-Type':'application/json',
            },
        });
        const data=resp.data;
        setUser({...user,password:""});
        
        if(data.user && !splitCookies('data')){
            let date=new Date();
            date.setDate(date.getDate()+30)
            document.cookie=`xtoken=${encodeURIComponent(data.user)};expires=${date};Path='/signin'`;
            alert('Login successful');
            let cook=splitCookies("xtoken");
            if(cook===null){
                alert('Cookie Error. PLEASE SIGNIN AGAIN');
           }
            else{
                let d=JSON.stringify(await jwt.decode(cook))
                document.cookie=`data=${d};expires=${date};2='/signin'`;
                navigate('/dashboard');
            }
        }else{
            alert('Please check your username and password')
        }
        setLoading(false);
    }
    return(
    <>
        <h1>{!loading?'SignIn Page':'Loading'}</h1>
        <form onSubmit={submit}>
            <div className="email-div">
                <span>email</span>
                <input type="text" value={user.email}  
                onChange={e=>{
                    setUser({...user,email:e.target.value})
                    setButtonDisabled(!isValidEmail(e.target.value));
                }} required/>
            </div>

            <div className="password-div">
                <span>password</span>
                <input type="password" value={user.password} 
                onChange={e=>{
                    let password=e.target.value;
                    setUser({...user,password:password})
                    setButtonDisabled((
                        password.length<8 || 
                        !hasUpCaseChar(password) ||
                        !hasLowCaseChar(password) ||
                        !hasSpecialChar(password)||
                        !hasNumbers(password)
                    ))
                }} 
                required/>
            </div>
            <div>
                <input type="submit" disabled={buttonDisabled} value={'SignIn'}/>    
            </div>    
        </form>
    </>
    )
}
