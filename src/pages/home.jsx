import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './home.css'




const Home = () => {


  let navigate = useNavigate();
  const doctor = () => {
    let path = './doctor';
    navigate(path);
  }
  const bloodbank = () => {
    let path1 = './blood';
    navigate(path1);
  }
  const pharmacy = () => {
    let path2 = './pharmacy';
    navigate(path2);
  }
  const [popup,setPop]=useState(false)
    const handleClickOpen=()=>{
        setPop(!popup)
    }
    const closePopup=()=>{
        setPop(false)
    }
 
  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-26 mx-auto">

            <div className='col-md-10 pt-10 pl-20 pt-lg-0 order-2 order-lg-1 mt-20'>
              <h1>Dakter Saab ~
              </h1>
              <h3> Search, Find, and Book at one tap!</h3>
            </div>

            <div className='mt-8'>
              <button type="button" class="btn btn-outline-secondary " onClick={handleClickOpen}>Register Yourself</button>
            </div>
           
       
            <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header ">
                                <h2>Select The Organization</h2>
                               <button type="button" class="btn-close pr-10" aria-label="Close" onClick={closePopup}></button>
                            </div>
                            <div className='opt'>
                           <button className='btn1' onClick={doctor}>Hospital</button>
                           <button className='btn2' onClick={bloodbank}>Blood Bank</button>
                           <button className='btn3' onClick={pharmacy}>Pharmacy</button>
                            </div>
                        </div>
                    </div>:""
                }
        
        </div>
           

          </div>
        </div>
      </div>



    </>
  );

}

export default Home