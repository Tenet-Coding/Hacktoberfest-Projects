import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Nav from './Nav';

const Register = () => {

    const history=useHistory();

    useEffect(()=>{
        if(localStorage.getItem("todoToken")) history.push("/");
    })

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    })

    const updateValue=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value});
    }

    const postData=async(e)=>{
        e.preventDefault();
        try {
            const {name,email,password,cpassword}=user;
            if(!name.trim() || !email.trim() || !password.trim() || !cpassword.trim()) alert("Dont' leave any field empty!");
            else if(password!==cpassword) alert("Passwords didn't match!");
            else{
                const config={
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
                await axios.post('/api/public/register',{name,email,password},config);
                alert("Registration successful!");
                history.push('/login');
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
        }
    }

    return (
        <div>
            <Nav />
            <div className="container text-info">
                <form className="row d-flex flex-column align-items-center justify-content-center pt-5" method="POST" onSubmit={postData}>
                    <div className="display-4 text-center">Register</div>
                    <input className="form-control w-50 mt-4" type="text" name="name" placeholder="Enter name" aria-label="default input example" value={user.name} onChange={updateValue} />
                    <input className="form-control w-50 mt-4" type="email" name="email" placeholder="Enter email" aria-label="default input example" value={user.email} onChange={updateValue} />
                    <input className="form-control w-50 mt-4" type="password" name="password" placeholder="Enter password" aria-label="default input example" value={user.password} onChange={updateValue} />
                    <input className="form-control w-50 mt-4" type="password" name="cpassword" placeholder="Confirm password" aria-label="default input example" value={user.cpassword} onChange={updateValue} />
                    <button className="btn btn-info w-25 mt-5" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register
