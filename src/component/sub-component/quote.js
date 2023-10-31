import axios from 'axios';
import React, { useState,useRef,useEffect } from 'react'
import { splitCookies } from '../constFunctions';

export default function Quote(){
    const user=useRef({});
    let date=new Date();
    date.setDate(date.getDate()+1)
    user.current=JSON.parse(splitCookies('data'));
    const [customState,setCustomStatus]=useState(splitCookies('status')?splitCookies('status'):"Enter Status");
    const [change,setChange]=useState(false);

    const submit=async (e)=>{
        if(e.keyCode===13){
            e.preventDefault();
            await setCustomStatus(e.target.value);
            let temp={};
            temp['email']=user.current.email;
            temp['quote']=e.target.value;
            const res=await axios.post('http://localhost:9000/api/update/quote',JSON.stringify({temp}),{
                headers:{
                    "Content-Type":"application/json",
                },
            })
            console.log(res)
            if(res.data.status==='ok'){
                console.log("success")
                let x=e.target.value;
                console.log(x);
                document.cookie=`status=${x};expires=${date};Path='/dashboard'`;
                setChange(false);
            }
        }
    }
    useEffect(()=>{
        //first request to get status
        const get=async()=>{
            if(splitCookies('data')&& !splitCookies('status')){
                const res= await axios.post('http://localhost:9000/api/current/quote',JSON.stringify({email:user.current.email}),{
                    headers:{
                        "Content-Type":"application/json",
                    }
                })
                console.log(res)
                document.cookie=`status=${res.data.status};expires=${date};Path='/dashboard'`;
                setCustomStatus(splitCookies('status'))
            }
        }
        get()
    })
    return(
        <div className='quote-container'>
            <label className='visible-label'>Update Status </label>
            
            {/* <select name='visible-status' id='select_status' className='visible-select'>
                <option selected style={{color:"yellow"}}>-Status-</option>
                <option value="online" style={{color:"green"}}> Online</option>
                <option value="idle" style={{color:"yellow"}}> Idle</option>
                <option value="dnd" style={{color:"red"}}> Dnd</option>
                <option value='offline' style={{color:'grey'}}>offline</option>
            </select> */}
            <div className='quote'>
                {(customState&& !change)?<p 
                className='quote-p'
                placeholder='Set Custom Status' onClick={e=>setChange(true)}>{customState}</p>:
                <input type='text' 
                className='quote-status-edit' 
                placeholder='Press Enter To Submit'
                onKeyDown={submit}></input>}
            </div>
        </div>
    )
}