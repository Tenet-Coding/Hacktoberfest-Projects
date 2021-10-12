import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Nav from './Nav';
import ListEle from './ListEle';
import {IoMdAddCircleOutline} from 'react-icons/io';

const Todo = () => {

    const history=useHistory();

    const [content,setContent]=useState("");
    const [user,setUser]=useState("");
    const [todos,setTodos]=useState();

    const getData=async()=>{
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("todoToken")}`,
                }
            }
            const {data}=await axios.get('/api/private/getuser',config);
            setUser(data);
            setTodos(data.todos);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!localStorage.getItem("todoToken")) history.push('/login');
    })

    useEffect(()=>{
        getData();
    },[history])

    const deleteItem=async(id)=>{
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("todoToken")}`,
                }
            }
            await axios.patch(`/api/private/deletetodo`,{id},config);
            alert("Todo deleted!");
            getData();
        } catch (error) {
            console.log(error);
        }
    }


    const addTodo=async(e)=>{
        e.preventDefault();
        try {
            if(!content.trim()) alert("Please enter anything to the input field!");
            else{
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${localStorage.getItem("todoToken")}`,
                    }
                }
                await axios.patch('/api/private/addtodo',{content},config);
                getData();
                alert("Todo added!");
                setContent("");
            }
        } catch (error) {
            console.log(error);
            alert("Soething went wrong!");
        }
    }

    return (
        <div>
            <Nav/>
            <div className="container text-info">
                <div className="row d-flex flex-column align-items-center justify-content-center">
                    <div className="display-5 text-center mt-2">Welcome {user?user.name:null}</div>
                    <form className="d-flex flex-row w-75 mt-5 ms-5 text-center" method="POST" onSubmit={addTodo}>
                        <input className="form-control w-75" type="text" placeholder="Add a todo" aria-label="default input example" value={content} onChange={(e)=>setContent(e.target.value)} />
                        <button className="btn btn-dark" type="submit"><IoMdAddCircleOutline/></button>
                    </form>
                    <ul className="text-center mt-2">
                        {
                            todos
                            ?
                            todos.map((val)=>{
                                return <ListEle content={val.content} key={val._id} id={val._id} deleteEle={deleteItem}/>
                            })
                            :
                            null
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Todo
