import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignUp(){
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:"",
        name:"",
        photo:""
    });
    const submit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('email',user.email);
        formData.append('password',user.password);
        formData.append('name',user.name);
        formData.append('profile',user.photo);
        const resp=await axios.post(`http://localhost:9000/api/signup`,formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        });
        const data=resp;
        console.log(resp)
        console.log(data.data.status)
        if(data.data.status==='ok'){
            navigate('/signin');
        }
    }
    return(
    <>
        <h1>SignUp Page</h1>
        <form onSubmit={submit}>
            <div className="email-div">
                <span>email</span>
                <input type="text" value={user.email} onChange={e=>setUser({...user,email:e.target.value})} required/>
            </div>
            <div className="email-div">
                <span>Name</span>
                <input type="text" value={user.name} onChange={e=>setUser({...user,name:e.target.value})} required/>
            </div>

            <div className="password-div">
                <span>password</span>
                <input type="password" value={user.password} onChange={e=>setUser({...user,password:e.target.value})} required/>
            </div>
            <div className="profile-div">
                <span>Profile Photo </span>
                <input type="file" name='profile' 
                onChange={(e)=>{
                    console.log(e.target.files);
                    setUser({...user,photo:e.target.files[0]})
                }} 
                required />
            </div>

            <div>
                <input type="submit" value={'SignUp'} />    
            </div>    
        </form>
    </>
    )
}
