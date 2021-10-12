const mongoose=require('mongoose');

//Connecting database
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB Connected!")).catch((err)=>console.log(err));