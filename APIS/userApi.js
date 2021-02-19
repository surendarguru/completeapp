const exp=require("express")
const userApiObj=exp.Router();
userApiObj.use(exp.json())
const bcryptjs=require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage}= require("multer-storage-cloudinary")
const multer = require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name:'dstrj6izi',
    api_key: '454434878758489',
    api_secret: '0WYItlV8gzmwxjCnLuQX7Tz3YTk'
});




//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cdb37',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });







const { isJSDocUnknownTag } = require("typescript");

/*userApiObj.get("/getusers",async (req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
   let userObj= await userCollectionObj.find().toArray()
   res.send({message:userObj});
})

userApiObj.get("/getuser/:username",async (req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    let userObj= await userCollectionObj.findOne({username:req.params.username})
    res.send({message:userObj});
})
*/

userApiObj.post("/register",upload.single('photo'),async(req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    
    let userObj =  JSON.parse(req.body.userObj);
   
  
    let user= await userCollectionObj.findOne({username:userObj.username})
    if(user!==null)
    {
        res.send({message:"user already exists"})
    }
    else{

        let hpw= await bcryptjs.hash(userObj.password,6)
        userObj.password=hpw;
         //add userImagelink
         userObj.userImgLink = req.file.path;
        let success=await userCollectionObj.insertOne(userObj)
        res.send({message:"user created"})
    }
})



//get user
userApiObj.get("/getuser/:username",async (req,res,next)=>{
    //get user collectionobject
    let userCollectionObject = req.app.get("userCollectionObj");

   let userObj=await userCollectionObject.findOne({username:req.params.username});
   res.send({message:userObj});
})


/*userApiObj.put("/updateuser/:username",async(req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    let userObj=req.body;

    await userCollectionObj.update({username:req.params.username},{$set:{
        address:userObj.address,
        salary:userObj.salary
    }})
    res.send({message:"update is successfull"});
})
*/

userApiObj.post("/login",async(req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    let userCredObj= req.body;

    let user = await userCollectionObj.findOne({username:userCredObj.username})

    if(user==null){
        res.send({message:"Invalid username"})
    }
    else{

        let status=await bcryptjs.compare(userCredObj.password,user.password)

        if(status==true)
        {
            let token = await jwt.sign({username:user.username},process.env.secret,{expiresIn:100})
            res.send({message:"success",signedToken:token,username:user.username})
        }
        else{
            res.send({message:"invalid password"})
        }
    }
})


module.exports=userApiObj;