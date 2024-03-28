const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const path=require("path")
const multer=require("multer")
const jwt=require("jsonwebtoken")
const { log } = require("console")
const app=express()
app.use(express.json())
app.use(cors())
const port=4000
mongoose.connect("mongodb+srv://mohilg3703:IV0ZSQAJVDucA8yJ@cluster0.46psfrj.mongodb.net/ecommerce")
const Product =mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date :{
        type: Date,
        default: Date.now()
    },
    available:{
        type: Boolean,
        default: true
    },

})  
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({})
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1)
        letlast_product=last_product_array[0]
        id=letlast_product.id+1
    }
    else{
        id=1
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name
    })
})
app.listen(port,(e)=>{
    if(!e){
        console.log(`Server connected to ${port}`);
    }
    else{
        console.log(e);
    }
})

app.get("/",(req,res)=>{
    res.send("App is Running.")
})

const storage=multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

app.post("/removeproduct",async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

app.get('/allproduct',async(req,res)=>{
    let products=await Product.find({})
    console.log("All Products Fetched");
    res.send(products)
})

const User=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cart:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now()
    }

})
app.post('/signup',async(req,res)=>{
    let check=await User.findOne({email:req.body.email})
    if(check){
        res.status(400).json({success:false,errors:'Existing User Found'})
    }
    let cart={  }
    for(let i=0;i<300;i++){
        cart[i]=0
    }
    const user=new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cart:cart
    })
    await user.save()
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom')
    res.json({success:true,token})
})

app.post('/login',async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if(user){
        const passCompare=req.body.password === user.password
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong Password"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})
app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({})
    let newcollection=products.slice(1).slice(-8)
    res.send(newcollection)
})

app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:'women'})
    let popular=products.slice(0,4)
    res.send(popular)
})
const fetchUser=async(req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"Session Expired"})
    }
    else{
       try{
         const data=jwt.verify(token,'secret_ecom')
        req.user=data.user
        console.log("hello");
        next()
    }
        catch(e){
            res.status(401).send({errors:"Wrong Token"})
        }   
    }
}
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("Cart Data");
    let user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        console.log(user.name);
        res.json(user.cart)
})
app.post('/removefromcart',fetchUser,async(req,res)=>{
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        console.log(user.name);
        
        // Ensure that user.cart is initialized before accessing its properties
        user.cart = user.cart || {};
        
        // Increment the count for req.body.itemid in user.cart
        user.cart[req.body.itemid] = (user.cart[req.body.itemid] || 0) - 1;

        // Update the user document with the modified cart data
        await User.findOneAndUpdate({ _id: req.user.id }, { cart: user.cart });
        
        res.json({message:"removed"});
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Internal Server Error");
    }
})
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        console.log(req.body.itemid);
        
        // Ensure that user.cart is initialized before accessing its properties
        user.cart = user.cart || {};
        
        // Increment the count for req.body.itemid in user.cart
        user.cart[req.body.itemid] = (user.cart[req.body.itemid] || 0) + 1;

        // Update the user document with the modified cart data
        await User.findOneAndUpdate({ _id: req.user.id }, { cart: user.cart });
        
        res.json({message:"Added"});
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});
