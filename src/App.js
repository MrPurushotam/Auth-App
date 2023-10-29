import React from "react"
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import Home from './component/home';
import SignUp from './component/signup';
import SignIn from './component/signin';
import Dashboard from './component/dashboard';
import Test from './component/test';
import "./App.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/'Component={Home}></Route>
          <Route exact path='/signup'Component={SignUp}/>
          <Route exact path='/signin'Component={SignIn}/>
          <Route exact path='/dashboard'Component={Dashboard}/>
          <Route exact path='/test'Component={Test}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
