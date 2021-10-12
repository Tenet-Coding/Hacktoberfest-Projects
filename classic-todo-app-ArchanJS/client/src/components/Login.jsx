import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Nav from './Nav';

const Login = () => {

    const history=useHistory();

    useEffect(()=>{
        if(localStorage.getItem("todoToken")) history.push("/");
    })

    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const updateValue=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value});
    }

    const postData=async(e)=>{
        e.preventDefault();
        try {
            const {email,password}=user;
            if(!email.trim() || !password.trim()) alert("Dont' leave any field empty!");
            else{
                const config={
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
                const {data}=await axios.post('/api/public/login',{email,password},config);
                localStorage.setItem("todoToken",data);
                alert("Login successful!");
                history.push('/');
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
        }
    }

    return (
        <div>
            <Nav/>
            <div className="container text-info">
                <form className="row d-flex flex-column align-items-center justify-content-center pt-5" method="POST" onSubmit={postData}>
                    <div className="display-4 text-center">Login</div>
                    <input className="form-control w-50 mt-4" type="email" name="email" placeholder="Enter email" aria-label="default input example" value={user.email} onChange={updateValue} />
                    <input className="form-control w-50 mt-4" type="password" name="password" placeholder="Enter password" aria-label="default input example" value={user.password} onChange={updateValue} />
                    <button className="btn btn-info w-25 mt-5" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
