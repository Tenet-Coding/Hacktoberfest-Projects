const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const validator=require('validator');

//Creating schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requied:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email !");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    todos:[{
        content: String
    }]
})

//Hashing password
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,10);
    }
    next();
})

//Comparing passwords
userSchema.methods.comparePasswords=async function(password){
    try {
        return await bcryptjs.compare(password,this.password);
    } catch (error) {
        return false;
    }
}

//Generating token
userSchema.methods.generateToken=async function(){
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES});
        return token;
    } catch (error) {
        throw new Error("Token is not generated!");
    }
}

//Creating model
const User=new mongoose.model("users",userSchema);

//Exporting model
module.exports=User;