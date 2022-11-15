import React from 'react';
import './App.css';
import Home from './pages/home';
import Doctor from './pages/doctor';
import Blood from './pages/blood';
import Pharmacy from './pages/pharmacy';
import Navbar from './pages/navbar';
import About from './pages/about';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

import { Routes, Route } from 'react-router-dom'
const App=()=>{
  return(
    <>
    <Navbar/>
    <Routes>
    <Route exact path = "/" element ={<Home/>}/>
    <Route exact path = "/about" element ={<About/>}/>
    <Route exact path = "/doctor" element ={<Doctor/>}/>
    <Route exact path = "/blood" element ={<Blood/>}/>
    <Route exact path = "/pharmacy" element ={<Pharmacy/>}/>
   
    </Routes>
    </>
  );
}


export default App;