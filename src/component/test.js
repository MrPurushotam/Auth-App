import axios from 'axios';
import React,{useState} from 'react'

export default function Test(){
    const [file,setFile]=useState({
        photo:""
    })
    const sub=async (e)=>{
        e.preventDefault()
        const fd=new FormData();
        fd.append('test',file.photo);
        console.log(fd)
        const resp= await axios.post('http://localhost:9000/test',fd,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        console.log(resp)
    }
    return(
        <div>
            <label> file </label>
            <input type='file' name='test' 
            onChange={e=>{
                setFile({...file,photo:e.target.files[0]})
                console.log(e.target.files);
            }
            }/>
            <button type='submit' onClick={sub}> Fingers Cross</button>
            <br/>
            <img src='/profile/1698495499478.JPG' alt='something ducked' style={{width:'15%',height:'30%',borderRadius:"100%"}}/>
        </div>

    ) 
}