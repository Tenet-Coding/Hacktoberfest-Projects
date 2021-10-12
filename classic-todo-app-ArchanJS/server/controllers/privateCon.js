const User=require('../models/User');

//Get user
exports.getUser=async(req,res)=>{
    try {
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Add todo
exports.addTodo=async(req,res)=>{
    try {
        const {content}=req.body;
        await User.updateOne({_id:req.user._id},{
            $push:{
                todos:{content}
            }
        })
        res.status(200).json({message:"Todo added!"});
    } catch (error) {
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Delete todo
exports.deleteTodo=async(req,res)=>{
    try {
        const {id}=req.body;
        await User.updateOne({_id:req.user._id},{
            $pull:{
                todos:{_id:id}
            }
        })
        res.status(200).json({message:"Todo deleted!"});
    } catch (error) {
        res.status(500).json({error:"Something went wrong!"});
    }
}