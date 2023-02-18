import React from 'react';
import Home from './pages/home';
import Data from './pages/data';
import Blood from './pages/blood';
import Hospital from './pages/hospital';
import Pharmacy from './pages/pharmacy';
import Navbar from './pages/components/navbar';
import Login from './pages/login';
import About from './pages/about';
import Department from './pages/department';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/data" element={<Data />} />
        <Route exact path="/blood" element={<Blood />} />
        <Route exact path="/pharmacy" element={<Pharmacy />} />
        <Route exact path='/hospital' element={<Hospital />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/department' element={<Department />} />
      </Routes>

    </>
  );
}


export default App;