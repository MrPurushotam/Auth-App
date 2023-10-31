import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import {splitCookies} from './constFunctions';

export default function SignIn(){
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    // const [buttonDisabled,setButtonDisabled]=useState(true);
    // const [loading,setLoading]=useState(false);
    
    const submit=async (e)=>{
        e.preventDefault();
        // setLoading(true)
        const resp=await axios.post(`http://localhost:9000/api/signin`,JSON.stringify({user}),{
            headers:{
                'Content-Type':'application/json',
            },
        });
        const data=resp.data;
        setUser({...user,password:""});
        
        if(data.user && !splitCookies('data').data){
            let date=new Date();
            date.setDate(date.getDate()+30)
            document.cookie=`xtoken=${encodeURIComponent(data.user)};expires=${date};path='/signin'`;
            alert('Login successful');
            let cook=splitCookies("xtoken");
            if(cook===null){
                alert('Cookie Error. PLEASE SIGNIN AGAIN');
           }
            else{
                let d=JSON.stringify(await jwt.decode(cook))
                document.cookie=`data=${d};expires=${date};path='/signin'`;
                navigate('/dashboard');
            }
        }else{
            alert('Please check your username and password')
        }
    }
    return(
    <div class="container">
        <h1>SignIn Page</h1>
        <form onSubmit={submit}>
            <div className="input-txt">
                <span>email</span>
                <input type="text" value={user.email} onChange={e=>setUser({...user,email:e.target.value})} required/>
            </div>

            <div className="input-txt">
                <span>password</span>
                <input type="password" value={user.password} onChange={e=>setUser({...user,password:e.target.value})} required/>
            </div>
            {/* <div className="file-div">
                <span>profile picture</span>
                <input type="file" onChange={e=>setUser({...user,profile_image:e.target.value})}/>
            </div> */}
            <div>
                <input type="submit" value={'SignIn'}/>    
            </div>    
        </form>
    </div>
    
    )
}
