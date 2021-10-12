import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Todo from './components/Todo';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Todo}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route path="*" component={Login}/>
      </Switch>
    </>
  )
}

export default App
