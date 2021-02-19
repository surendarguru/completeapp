const exp=require("express")
const app=exp();
const path=require("path")
const mc=require("mongodb").MongoClient


require("dotenv").config()
app.use(exp.static(path.join(__dirname,"./dist/completeApp")))

//import the apis
const userApiObj=require("./APIS/userApi")
//const productApiObj=require("./APIs/productapi")
const adminApiObj=require("./APIS/adminApi")

app.use("/user",userApiObj)
//app.use("/product",productApiObj)
//app.use("/admin",adminApiObj)

const dburl=process.env.dburl;
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    //get database
    const databaseObj=client.db("cdb37db")
    const userCollectionObj=databaseObj.collection("usercollection")
    const productCollectionObj=databaseObj.collection("productcollection")
    const adminCollectionObj=databaseObj.collection("admincollection")

    //sharing collection object

    app.set("userCollectionObj",userCollectionObj)
    app.set("productCollectionObj",productCollectionObj)
    app.set("adminCollectionObj",adminCollectionObj)
    console.log("db server is on")
})
.catch(err=>console.log("err in db",err))

app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid`});
})

app.use((err,req,res,next)=>{
    res.send({message:"error occurred",reason:err.message})
})


app.listen(process.env.port,()=>console.log("server is on ",process.env.port));