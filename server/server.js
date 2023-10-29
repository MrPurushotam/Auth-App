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
app.use('/profile',express.static(path.join(__dirname,'server/profile/')))
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/auth-with-react');
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
const splitCookies=(name)=>{
    let cookies=document.cookie.split(';');
    for(const cookie of cookies){
        const [cookieName,cookieValue]=cookie.trim().split('=');
        if(cookieName===name){
            return decodeURI(cookieValue);
        }
    }
    return null;
}
const restictPath=(req,res,next)=>{
    console.log(splitCookies('data').data)
    if(splitCookies('data').data){
        res.redirect('/dashboard');
    }
    next();
}

app.post('/api/signin',async(req,res)=>{
    const user=await User.findOne({
        email:req.body.user.email,
    })
    if(user){
        let quoteCheck
        if(user.hasOwnProperty('quote')){
            quoteCheck = user.quote
        }else{
            quoteCheck="Enter Quote"
        }
        console.log(quoteCheck)
        if(compareHash(user.password,req.body.user.password)){
            const token=jwt.sign({
                name:user.name,
                email:user.email,
                profile:user.profile,
                status:quoteCheck,
                id:user._id,
            },'qwadsrgr')
            console.log(user)
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
        console.log(user)
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
        const decoded=jwt.verify(token,'qwadsrgr');
        const email=decoded.email;
        const user=await User.findOne({email:email});
        return{status:'ok',user:user};
    }
    catch(e){
        console.log(e);
        res.json({status:"error",error:'Invalid Token'})
    }
})
app.post('/api/update/quote',async(req,res)=>{
    try{
        console.log(req.body.temp);
        const user=await User.updateOne({email:req.body.temp.email},{$set:{quote:req.body.temp.quote}});
        res.json({status:'ok'})
    }catch(e){
        res.json({status:'error',error:e.message})
    }
})
app.post("/api/populate",async (req,res)=>{
    const token=req.headers['x-access-token'];
    try{
        // const decoded=jwt.verify(token,'qwadsrgr');
        // const email=decoded.email;
        // const user=await User.updateOne({email:email}); //include quote {$set:{quote:req.body.quote}}
        // return{status:'ok'};
    }
    catch(e){
        console.log(e);
        res.json({status:"error",error:'Invalid Token'})
    }
})

app.get('/',(req,res)=>{
    res.send("Why are you here?!");
})
app.listen(port,()=>{
    console.log("Listening on 9000...")
})