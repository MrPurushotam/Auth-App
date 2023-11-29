const express=require('express');
const app=express();
const cors=require('cors'); 
const User=require('./models/dbSchema');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const multer=require('multer');
const path=require('path');

const port=9000;
require('dotenv').config()
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DATABASE_STRING);

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        let storeLocation= (__dirname.split('server')[0]+'public/profile')
        cb(null,storeLocation);
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage});

async function hashStuff(x){
    return await bcrypt.hash(x,11)
}
async function compareHash(x,y){
    return await bcrypt.compare(x,y)
}
app.post('/api/signin',async(req,res)=>{
    const user=await User.findOne({
        email:req.body.user.email,
    })
    if(user){
        if(compareHash(user.password,req.body.user.password)){
            const token=jwt.sign({
                name:user.name,
                email:user.email,
                profile:user.profile,
                id:user._id,
            },process.env.TOKEN_SECRET)
            res.json({status:'ok',user:token})
        }else{
            res.json({status:'error',user:'Wrong Password'})
        }
    }else{
        res.json({status:"error",error:false})
    }
})

app.post('/api/signup',upload.single('profile'),async(req,res)=>{
    try{
        const user=await User.create({
            email:req.body.email,
            password:await hashStuff(req.body.password),
            name:req.body.name,
            profile:req.file?req.file.filename:null,
        })
        res.json({status:'ok'})
    }catch(e){
        res.json({status:"error",error:e.message})
    }
})

app.post('/test',upload.single('test'),(req,res)=>{
    try{
        console.log(req.file)
        res.json({status:'ok'})
    }catch(e){
        res.json({status:e.message})
    }
})

app.get("/api/populate",async (req,res)=>{
    const token=req.headers['x-access-token'];
    try{
        const decoded=jwt.verify(token,process.env.TOKEN_SECRET);
        const email=decoded.email;
        const user=await User.findOne({email:email});
        return{status:'ok',user:user};
    }
    catch(e){
        res.json({status:"error",error:'Invalid Token'})
    }
})
app.post('/api/update/quote',async(req,res)=>{
    try{
        console.log(req.body.temp);
        await User.updateOne({email:req.body.temp.email},{$set:{quote:req.body.temp.quote}});
        res.json({status:'ok'})
    }catch(e){
        res.json({status:'error',error:e.message})
    }
})
app.post('/api/current/quote',async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        res.json({status:'ok',status:user.quote?user.quote:"Enter Status"})
    }catch(e){
        res.json({status:'error',error:e.message})
    }
})
app.get('/',(req,res)=>{
    res.send("Why are you here?!");
})
app.listen(port,()=>{
    console.log("Listening on 9000...")
})