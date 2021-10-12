import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {BiLogOut} from 'react-icons/bi';

const Nav = () => {

    const history=useHistory();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="http://localhost:3000">Todo App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                localStorage.getItem("todoToken")
                                    ?
                                    <li className="nav-item">
                                        <p className="nav-link"><BiLogOut style={{fontSize:"24px", marginBottom:"-6px",cursor:"pointer"}} 
                                        onClick={()=>{
                                            localStorage.removeItem("todoToken");
                                            history.push('/login');
                                        }}
                                        /></p>
                                    </li>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" exact to='/login'>Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" exact to='/register'>Register</NavLink>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav