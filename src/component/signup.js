import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {hasLowCaseChar,hasUpCaseChar,hasSpecialChar,hasNumbers,isValidEmail} from "./constFunctions";

export default function SignUp(){
    const navigate=useNavigate();
    const [buttonDisabled,setButtonDisabled]=useState(true);
    const [loading,setLoading]=useState(false);

    const [user,setUser]=useState({
        email:"",
        password:"",
        name:"",
        photo:""
    });
    const submit=async (e)=>{
        e.preventDefault();
        setLoading(true)
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
        setLoading(false)
        const data=resp;
        console.log(resp)
        console.log(data.data.status)
        if(data.data.status==='ok'){
            navigate('/signin');
        }
    
    }
    return(
    <div className='parent-container'>
    <div class="container signup">
        <h1 className="container-title">{!loading?'SignUp Page':"Loading"}</h1>
        <form onSubmit={submit}>
            <div className="uname-div common-div-class">
                <span className="common-span">Name</span>
                <input type="text" className="common-input-text" value={user.name}
                onChange={e=>{
                    let uname=e.target.value;
                    if(uname.length<4){
                        setButtonDisabled(true);
                    }
                    setUser({...user,name:e.target.value})
                }}
                required/>
            </div>
            
            <div className="email-div common-div-class">
                <span className="common-span">Email</span>
                <input type="text" className="common-input-text" value={user.email}
                onChange={e=>{
                    setUser({...user,email:e.target.value})
                    setButtonDisabled(!isValidEmail(e.target.value));
                }}
                 required/>
            </div>

            <div className="password-div common-div-class">
                <span className="common-span">Password</span>
                <input type="password" className="common-input-text" value={user.password} 
                onChange={e=>{
                        let password=e.target.value
                        setUser({...user,password:e.target.value})
                        setButtonDisabled((
                            password.length<8 || 
                            !hasUpCaseChar(password) ||
                            !hasLowCaseChar(password)||
                            !hasSpecialChar(password)||
                            !hasNumbers(password)
                        ))
                    }} 
                required/>
            </div>
            <div className="password-div common-div-class">
                <span className="common-span">Confirm Password</span>
                <input type="password" className="common-input-text"
                onChange={e=>{
                    let confrimPassword=e.target.value;
                    setButtonDisabled((
                        confrimPassword.length<8 || 
                        !hasUpCaseChar(confrimPassword) ||
                        !hasLowCaseChar(confrimPassword)||
                        !hasSpecialChar(confrimPassword)||
                        !hasNumbers(confrimPassword)
                    ))
                    if(confrimPassword!==user.password){
                        setButtonDisabled(true)
                    }
                }} 
                required/>
            </div>
            <div className="input-file common-div-class">
                <span className="common-span">Profile Photo </span>
                <input type="file" className="common-input-text" name='profile' 
                onChange={(e)=>{
                    console.log(e.target.files);
                    setUser({...user,photo:e.target.files[0]})
                }} 
                required />
            </div>

            <div>
                <input type="submit" value={'SignUp'} disabled={buttonDisabled} className="common-submit-btn"/>    
            </div>    
        </form>
 </div>
 </div>
    )
}
