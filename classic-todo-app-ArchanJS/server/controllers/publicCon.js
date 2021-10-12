const User=require('../models/User');

//Registration

exports.register=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        if (!name.trim() || !email.trim() || !password.trim()) {
            res.status(400).json({ error: "Please enter all the details!" });
        }
        else {
            const user = new User({ name, email, password });
            await user.save();
            res.status(201).json({ message: "User created!" });
        }
    } catch (error) {
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Login

exports.login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email.trim() || !password.trim()){
            res.status(400).json({ error: "Please enter all the details!" });
        }
        else{
            const user=await User.findOne({email});
            if(!user){
                res.status(400).json({ error: "User not found!" });
            }
            else{
                const checkPass=await user.comparePasswords(password);
                if(!checkPass){
                    res.status(400).json({error:"Invalid credentials!"});
                }
                else{
                    const token = await user.generateToken();
                    res.status(200).send(token);
                }
            }
        }

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}