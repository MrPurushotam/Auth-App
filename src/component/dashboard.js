import React, { useRef } from 'react';
import axios from 'axios';
import DashboardNavbar from './sub-component/dashboard-navbar';
import { splitCookies } from './constFunctions';
// import {useNavigate} from 'react-router-dom';
// import jwt from 'jsonwebtoken';

export default function Dashboard(){
    const User=useRef({});
    // const navigate=useNavigate();
    // async function populateCode(){
    //     let data=0;
    //     if(!splitCookies('data')){
    //         const req=await axios.post('http://localhost:9000/api/populate',{
    //             headers:{
    //                 'x-access-token':splitCookies('xtoken'),
    //             },
    //         })
    //         data=req;
    //     }
    //     data=data?data:splitCookies('data');
    //     console.log(data)
    // }
    async function getUser(){
        let user=splitCookies('data')
        let req=0;
        if(!user){
            req=await axios.get('http://localhost:9000/api/populate',{
                headers:{
                    'x-access-token':splitCookies('xtoken'),
                },
            })
        }
        return user||req.user;
    }
    if(!splitCookies('data')){
        User.current =getUser();
    }else{
        User.current=JSON.parse(splitCookies('data'));
    }
    return(
        <div className='dashboard'>
            <DashboardNavbar/>
            <div className='dashboard-profile'>
                <img src={`/profile/${User.current.profile}`} alt='profile_picture' className='dashboard-profile-picture'/>
                <br/>
                <label className='dpl-uname dpl'>UserName</label>
                <p className='dashboard-uname'>{User.current.name}</p>
                <label className='dpl-uemail dpl'>UserEmail</label>
                <p className='dashboard-uemail'>{User.current.email}</p>
                <label className='dpl-uid dpl'>UserId</label>
                <p className='dashboard-uid'>{User.current.id}</p>
            </div>
        </div>
    )
} 
